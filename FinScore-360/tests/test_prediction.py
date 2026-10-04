"""
Unit Tests for Machine Learning Loan Prediction
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ml.predict import predict_loan

def test_prediction_output_format():
    user_input = {
        'Gender': 'Male',
        'Married': 'Yes',
        'Dependents': '1',
        'Education': 'Graduate',
        'Self_Employed': 'No',
        'ApplicantIncome': 80000,
        'CoapplicantIncome': 25000,
        'LoanAmount': 200,
        'Loan_Amount_Term': 360,
        'Credit_History': 1.0,
        'Property_Area': 'Semiurban'
    }
    result = predict_loan(user_input)
    assert result['status'] in ['Approved', 'Not Approved']
    if result['probability'] is not None:
        assert 0 <= result['probability'] <= 100
