# FinScore 360 – AI Loan & Financial Risk Assessment System

A professional, responsive, and privacy-focused web application that evaluates loan eligibility, computes exact reducing-balance EMIs, assesses application-level financial risk scores (0–100), and delivers tailored financial tips.

## Core Features
1. **Loan Approval Prediction**: Predicts approval status using trained machine learning models based solely on live user inputs.
2. **EMI Calculator**: Standard reducing-balance mathematical installment calculator including total interest, total amount payable, and affordability status.
3. **Financial Risk Assessment**: Computes the proprietary FinScore Financial Risk Score (0–100) with dynamic contextual justifications.
4. **Personalized Financial Tips**: Algorithmic, actionable financial recommendations based on debt ratios, income, and approval profile.

---

## Strict Privacy & Input Discipline
- **Zero Default Financial Values**: All inputs (income, loan amount, interest rate, tenure, debt) are empty by default.
- **Backend Isolation**: The dataset and model training files remain strictly in the backend. No internal ML metrics (accuracy, confusion matrix, ROC curves) are displayed to users.
- **Pure User Inputs**: Predictions and risk scores are calculated entirely from the current user's submission.

---

## Windows / VS Code Local Setup Guide

Follow these steps to run the Flask application in VS Code on Windows:

### 1. Open Terminal in VS Code
Open the project directory in VS Code:
```bash
cd FinScore-360
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment
On Windows (Command Prompt or PowerShell):
```powershell
venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Train Machine Learning Models
```bash
cd ml
python train_models.py
python evaluate_models.py
cd ..
```
*This loads the benchmark dataset, cleans features, fits Decision Tree, Random Forest, KNN, and XGBoost/GradientBoosting models, selects the best performer, and saves the pipeline artifacts into `ml/saved_models/`.*

### 6. Run the Flask Web Application
```bash
python app.py
```

### 7. Access FinScore 360
Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

---

## Project Structure
```
FinScore-360/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── data/
│   ├── raw/
│   │   └── loan_data.csv
│   └── processed/
│       └── cleaned_data.csv
├── ml/
│   ├── preprocess.py
│   ├── train_models.py
│   ├── evaluate_models.py
│   ├── predict.py
│   └── saved_models/
│       ├── best_model.pkl
│       └── preprocessor.pkl
├── financial/
│   ├── emi_calculator.py
│   ├── risk_score.py
│   └── financial_tips.py
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── assessment.html
│   ├── result.html
│   ├── emi.html
│   └── about.html
├── static/
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── assessment.js
│   │   ├── calculator.js
│   │   └── charts.js
├── notebooks/
│   └── analysis.ipynb
└── tests/
    ├── test_prediction.py
    ├── test_emi.py
    └── test_risk.py
```
