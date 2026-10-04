"""
FinScore 360 – EMI Calculator Module
Calculates Equated Monthly Installment (EMI), Total Interest,
Total Amount Payable, and Affordability Status.
"""

def calculate_emi(loan_amount: float, annual_interest_rate: float, tenure_months: int, monthly_income: float):
    """
    Formula:
    P = Loan Amount
    R = Monthly Interest Rate (Annual Rate / 12 / 100)
    N = Number of Monthly Payments
    EMI = P * R * (1 + R)^N / ((1 + R)^N - 1)
    """
    P = float(loan_amount)
    N = int(tenure_months)
    annual_rate = float(annual_interest_rate)

    if annual_rate == 0 or N == 0:
        emi = P / max(1, N)
    else:
        R = annual_rate / 12.0 / 100.0
        factor = (1.0 + R) ** N
        if factor == 1.0:
            emi = P / N
        else:
            emi = (P * R * factor) / (factor - 1.0)

    total_payable = emi * N
    total_interest = max(0.0, total_payable - P)

    income = max(1.0, float(monthly_income))
    emi_to_income_ratio = (emi / income) * 100.0

    if emi_to_income_ratio < 30.0:
        affordability = 'Comfortable'
    elif emi_to_income_ratio <= 40.0:
        affordability = 'Manageable'
    elif emi_to_income_ratio <= 50.0:
        affordability = 'High Burden'
    else:
        affordability = 'Critical'

    return {
        'monthly_emi': round(emi, 2),
        'total_interest': round(total_interest, 2),
        'total_amount_payable': round(total_payable, 2),
        'emi_to_income_ratio': round(emi_to_income_ratio, 1),
        'affordability_status': affordability
    }

def calculate_debt_burden(existing_monthly_debt: float, new_emi: float, monthly_income: float):
    """
    Calculates total monthly debt burden and debt burden ratio (DTI).
    """
    existing_debt = max(0.0, float(existing_monthly_debt))
    total_burden = existing_debt + new_emi
    income = max(1.0, float(monthly_income))
    debt_burden_ratio = (total_burden / income) * 100.0

    return {
        'existing_monthly_debt': round(existing_debt, 2),
        'new_emi': round(new_emi, 2),
        'total_monthly_debt_burden': round(total_burden, 2),
        'debt_burden_ratio': round(debt_burden_ratio, 1)
    }
