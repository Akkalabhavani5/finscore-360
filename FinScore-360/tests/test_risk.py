"""
Unit Tests for Financial Risk Score
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from financial.risk_score import calculate_risk_score

def test_low_risk_profile():
    res = calculate_risk_score(
        monthly_income=150000,
        loan_amount=300000,
        new_emi=15000,
        existing_debt=0,
        debt_burden_ratio=10.0,
        emi_ratio=10.0,
        credit_history='Good',
        self_employed='No',
        tenure_months=24
    )
    assert 0 <= res['score'] <= 40
    assert res['risk_level'] in ['Very Low Risk', 'Low Risk']
    assert len(res['reasons']) > 0

def test_high_risk_profile():
    res = calculate_risk_score(
        monthly_income=30000,
        loan_amount=2000000,
        new_emi=22000,
        existing_debt=8000,
        debt_burden_ratio=100.0,
        emi_ratio=73.3,
        credit_history='Poor',
        self_employed='Yes',
        tenure_months=360
    )
    assert res['score'] >= 60
    assert res['risk_level'] in ['High Risk', 'Very High Risk']
