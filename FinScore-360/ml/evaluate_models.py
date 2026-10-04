"""
FinScore 360 – Internal Model Evaluation
For developer/engineer verification only. Not displayed to end-users.
"""

import os
import joblib
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from preprocess import load_and_clean_data

def evaluate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_dir)
    data_path = os.path.join(project_root, 'data', 'processed', 'cleaned_data.csv')
    model_path = os.path.join(current_dir, 'saved_models', 'best_model.pkl')
    preprocessor_path = os.path.join(current_dir, 'saved_models', 'preprocessor.pkl')

    if not os.path.exists(model_path) or not os.path.exists(preprocessor_path):
        print("Models not found. Running training first...")
        from train_models import train_and_select_best_model
        train_and_select_best_model()

    model = joblib.load(model_path)
    preprocessor = joblib.load(preprocessor_path)

    df = pd.read_csv(data_path)
    X = df.drop(columns=['Loan_ID', 'Loan_Status'], errors='ignore')
    y = df['Loan_Status'].dropna().astype(int)
    X = X.loc[y.index]

    X_processed = preprocessor.transform(X)
    y_pred = model.predict(X_processed)

    print("\n--- Internal ML Performance Metrics ---")
    print("Confusion Matrix:")
    print(confusion_matrix(y, y_pred))
    print("\nClassification Report:")
    print(classification_report(y, y_pred))

if __name__ == '__main__':
    evaluate()
