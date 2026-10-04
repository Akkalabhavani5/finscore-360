"""
FinScore 360 – Machine Learning Model Training Engine
Trains Decision Tree, Random Forest, KNN, and XGBoost / GradientBoosting.
Compares internal metrics (Accuracy, F1, Precision, Recall, ROC-AUC),
selects the best performer, and saves the pipeline for inference.
"""

import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

from preprocess import LoanDataPreprocessor, load_and_clean_data

def train_and_select_best_model():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_dir)
    raw_data_path = os.path.join(project_root, 'data', 'raw', 'loan_data.csv')
    processed_dir = os.path.join(project_root, 'data', 'processed')
    saved_models_dir = os.path.join(current_dir, 'saved_models')

    os.makedirs(processed_dir, exist_ok=True)
    os.makedirs(saved_models_dir, exist_ok=True)

    print("[*] Loading raw dataset...")
    df = load_and_clean_data(raw_data_path)
    
    # Save cleaned data copy
    cleaned_path = os.path.join(processed_dir, 'cleaned_data.csv')
    df.to_csv(cleaned_path, index=False)
    print(f"[+] Saved cleaned dataset to {cleaned_path}")

    # Separate features and target
    X = df.drop(columns=['Loan_ID', 'Loan_Status'], errors='ignore')
    y = df['Loan_Status'].dropna().astype(int)
    X = X.loc[y.index]

    # Preprocessing
    preprocessor = LoanDataPreprocessor()
    X_processed = preprocessor.fit_transform(X)

    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42, stratify=y
    )

    # Models to train
    models = {
        'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=42),
        'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
        'Gradient Boosting (XGBoost/GBM)': GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, random_state=42)
    }

    best_model_name = None
    best_model = None
    best_f1 = -1.0
    results = {}

    print("\n[*] Training and evaluating models internally...")
    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        
        acc = accuracy_score(y_test, preds)
        prec = precision_score(y_test, preds, zero_division=0)
        rec = recall_score(y_test, preds, zero_division=0)
        f1 = f1_score(y_test, preds, zero_division=0)

        results[name] = {'Accuracy': acc, 'Precision': prec, 'Recall': rec, 'F1': f1}
        print(f" -> {name} | F1: {f1:.4f} | Accuracy: {acc:.4f}")

        # Choose best model primarily on F1 & Accuracy balance
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = model

    print(f"\n[+] Selected Best Model: {best_model_name} (F1 Score: {best_f1:.4f})")

    # Save Preprocessor and Best Model
    model_path = os.path.join(saved_models_dir, 'best_model.pkl')
    preprocessor_path = os.path.join(saved_models_dir, 'preprocessor.pkl')

    joblib.dump(best_model, model_path)
    joblib.dump(preprocessor, preprocessor_path)

    print(f"[+] Saved model to: {model_path}")
    print(f"[+] Saved preprocessor to: {preprocessor_path}")
    return best_model_name, results

if __name__ == '__main__':
    train_and_select_best_model()
