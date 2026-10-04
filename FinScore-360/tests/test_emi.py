"""
Unit Tests for EMI Calculator
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from financial.emi_calculator import calculate_emi, calculate_debt_burden

def test_emi_basic():
    # 100,000 at 12% annual interest for 12 months
    # Monthly rate = 1% = 0.01
    # EMI = 100000 * 0.01 * (1.01^12) / (1.01^12 - 1) = ~8884.88
    res = calculate_emi(100000, 12.0, 12, 50000)
    assert 8880 < res['monthly_emi'] < 8890
    assert res['total_amount_payable'] > 100000
    assert res['emi_to_income_ratio'] > 0
    assert res['affordability_status'] in ['Comfortable', 'Manageable', 'High Burden', 'Critical']

def test_emi_zero_interest():
    res = calculate_emi(120000, 0, 12, 50000)
    assert res['monthly_emi'] == 10000.0
    assert res['total_interest'] == 0.0

def test_debt_burden():
    res = calculate_debt_burden(5000, 10000, 50000)
    assert res['total_monthly_debt_burden'] == 15000.0
    assert res['debt_burden_ratio'] == 30.0
