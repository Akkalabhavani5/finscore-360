"""
FinScore 360 – AI Loan & Financial Risk Assessment System
Flask Application Entry Point
"""

import os
import sys
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

# Add project root and ml/financial modules to path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.extend([current_dir, os.path.join(current_dir, 'ml'), os.path.join(current_dir, 'financial')])

from ml.predict import predict_loan
from financial.emi_calculator import calculate_emi, calculate_debt_burden
from financial.risk_score import calculate_risk_score
from financial.financial_tips import generate_tips

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'finscore-360-secure-key-2026')

@app.route('/')
def home():
    """Home view explaining the 4 core features with action CTAs"""
    return render_template('index.html')

@app.route('/assessment', methods=['GET', 'POST'])
def assessment():
    """Loan Assessment page: user enters all features manually."""
    if request.method == 'GET':
        return render_template('assessment.html')

    # Server-Side Validation
    try:
        gender = request.form.get('gender', '').strip()
        married = request.form.get('married', '').strip()
        dependents = request.form.get('dependents', '').strip()
        education = request.form.get('education', '').strip()
        self_employed = request.form.get('self_employed', '').strip()
        credit_history = request.form.get('credit_history', '').strip()
        property_area = request.form.get('property_area', '').strip()

        # Numeric validations
        applicant_income_raw = request.form.get('applicant_income', '').strip()
        coapplicant_income_raw = request.form.get('coapplicant_income', '').strip()
        loan_amount_raw = request.form.get('loan_amount', '').strip()
        annual_interest_raw = request.form.get('annual_interest_rate', '').strip()
        tenure_raw = request.form.get('tenure_value', '').strip()
        tenure_unit = request.form.get('tenure_unit', 'Years').strip()
        existing_debt_raw = request.form.get('existing_debt', '').strip()

        # Check required fields
        if not all([gender, married, dependents, education, self_employed, credit_history, property_area]):
            flash("Please answer all required personal and background questions.", "danger")
            return render_template('assessment.html')

        if not applicant_income_raw or not loan_amount_raw or not annual_interest_raw or not tenure_raw or not existing_debt_raw:
            flash("All financial fields are required. Please enter values without leaving any blank.", "danger")
            return render_template('assessment.html')

        applicant_income = float(applicant_income_raw)
        coapplicant_income = float(coapplicant_income_raw or 0)
        loan_amount = float(loan_amount_raw)
        annual_interest = float(annual_interest_raw)
        tenure_val = float(tenure_raw)
        existing_debt = float(existing_debt_raw)

        if applicant_income <= 0:
            flash("Applicant Monthly Income must be greater than 0.", "danger")
            return render_template('assessment.html')
        if loan_amount <= 0:
            flash("Loan Amount must be greater than 0.", "danger")
            return render_template('assessment.html')
        if annual_interest < 0:
            flash("Annual Interest Rate cannot be negative.", "danger")
            return render_template('assessment.html')
        if tenure_val <= 0:
            flash("Loan Tenure must be greater than 0.", "danger")
            return render_template('assessment.html')
        if existing_debt < 0:
            flash("Existing Monthly Debt cannot be negative.", "danger")
            return render_template('assessment.html')

        # Convert tenure to months
        tenure_months = int(tenure_val * 12) if tenure_unit == 'Years' else int(tenure_val)
        monthly_income = applicant_income + coapplicant_income

        # 1. EMI Calculation
        emi_data = calculate_emi(loan_amount, annual_interest, tenure_months, monthly_income)

        # 2. Debt Burden Calculation
        debt_data = calculate_debt_burden(existing_debt, emi_data['monthly_emi'], monthly_income)

        # 3. Financial Risk Assessment
        risk_data = calculate_risk_score(
            monthly_income=monthly_income,
            loan_amount=loan_amount,
            new_emi=emi_data['monthly_emi'],
            existing_debt=existing_debt,
            debt_burden_ratio=debt_data['debt_burden_ratio'],
            emi_ratio=emi_data['emi_to_income_ratio'],
            credit_history=credit_history,
            self_employed=self_employed,
            tenure_months=tenure_months
        )

        # 4. ML Prediction using only user inputs
        ml_input = {
            'Gender': gender,
            'Married': married,
            'Dependents': dependents,
            'Education': education,
            'Self_Employed': self_employed,
            'ApplicantIncome': applicant_income,
            'CoapplicantIncome': coapplicant_income,
            'LoanAmount': loan_amount / 1000.0, # scaled to thousands as in Kaggle dataset
            'Loan_Amount_Term': float(tenure_months),
            'Credit_History': 1.0 if credit_history == 'Good' else 0.0,
            'Property_Area': property_area
        }
        pred_data = predict_loan(ml_input)

        # 5. Personalized Financial Tips
        tips = generate_tips(
            emi_ratio=emi_data['emi_to_income_ratio'],
            debt_burden_ratio=debt_data['debt_burden_ratio'],
            credit_history=credit_history,
            prediction_status=pred_data['status'],
            risk_level=risk_data['risk_level'],
            existing_debt=existing_debt,
            coapplicant_income=coapplicant_income
        )

        user_summary = {
            'loan_amount': loan_amount,
            'annual_interest': annual_interest,
            'tenure_months': tenure_months,
            'monthly_income': monthly_income,
            'existing_debt': existing_debt,
            'applicant_income': applicant_income,
            'coapplicant_income': coapplicant_income,
            'education': education,
            'credit_history': credit_history,
            'property_area': property_area
        }

        return render_template(
            'result.html',
            prediction=pred_data,
            emi=emi_data,
            debt=debt_data,
            risk=risk_data,
            tips=tips,
            summary=user_summary
        )

    except (ValueError, TypeError):
        flash("Invalid numerical input. Please enter valid digits for financial amounts.", "danger")
        return render_template('assessment.html')
    except Exception:
        # Friendly error handling without revealing internal tracebacks
        flash("An unexpected error occurred while processing your financial data. Please verify your inputs.", "danger")
        return render_template('assessment.html')

@app.route('/emi', methods=['GET', 'POST'])
def emi_page():
    """Dedicated EMI Calculator page"""
    emi_result = None
    debt_result = None
    if request.method == 'POST':
        try:
            loan_amt = float(request.form.get('loan_amount', '0'))
            rate = float(request.form.get('annual_interest_rate', '0'))
            tenure_val = float(request.form.get('tenure_value', '0'))
            tenure_unit = request.form.get('tenure_unit', 'Years')
            income = float(request.form.get('monthly_income', '0'))
            existing_debt = float(request.form.get('existing_debt', '0'))

            if loan_amt <= 0 or tenure_val <= 0 or income <= 0:
                flash("Please enter valid positive values for Loan Amount, Tenure, and Monthly Income.", "danger")
            elif rate < 0 or existing_debt < 0:
                flash("Interest rate and existing debt cannot be negative.", "danger")
            else:
                months = int(tenure_val * 12) if tenure_unit == 'Years' else int(tenure_val)
                emi_result = calculate_emi(loan_amt, rate, months, income)
                debt_result = calculate_debt_burden(existing_debt, emi_result['monthly_emi'], income)
        except ValueError:
            flash("Please enter valid numerical figures.", "danger")

    return render_template('emi.html', emi=emi_result, debt=debt_result)

@app.route('/about')
def about():
    """About view explaining FinScore 360"""
    return render_template('about.html')

@app.route('/api/calculate-emi', methods=['POST'])
def api_calculate_emi():
    """JSON API for EMI calculations"""
    data = request.get_json() or {}
    try:
        p = float(data.get('loan_amount', 0))
        r = float(data.get('interest_rate', 0))
        n = int(data.get('tenure_months', 12))
        inc = float(data.get('monthly_income', 1))
        existing = float(data.get('existing_debt', 0))
        emi = calculate_emi(p, r, n, inc)
        debt = calculate_debt_burden(existing, emi['monthly_emi'], inc)
        return jsonify({'emi': emi, 'debt': debt})
    except Exception as e:
        return jsonify({'error': 'Invalid financial parameters'}), 400

if __name__ == '__main__':
    # Default Flask port 5000 for local VS Code Windows execution
    app.run(host='0.0.0.0', port=5000, debug=True)
