"""
FinScore 360 – Financial Risk Assessment Module
Calculates the application-level FinScore Financial Risk Score (0 - 100)
and produces transparent, dynamic justifications based on entered metrics.
"""

def calculate_risk_score(
    monthly_income: float,
    loan_amount: float,
    new_emi: float,
    existing_debt: float,
    debt_burden_ratio: float,
    emi_ratio: float,
    credit_history: str,
    self_employed: str,
    tenure_months: int
):
    score = 10
    reasons = []

    # 1. Total Debt Burden Ratio
    if debt_burden_ratio > 65:
        score += 35
        reasons.append(f"Total debt obligations consume {debt_burden_ratio:.1f}% of monthly income, creating severe repayment exposure.")
    elif debt_burden_ratio > 50:
        score += 26
        reasons.append(f"Total debt burden ratio of {debt_burden_ratio:.1f}% significantly tightens household financial liquidity.")
    elif debt_burden_ratio > 38:
        score += 16
        reasons.append(f"Combined debt obligations equal {debt_burden_ratio:.1f}% of income, presenting moderate budget strain.")
    elif debt_burden_ratio <= 25:
        score += 2
        reasons.append(f"Total monthly debt burden ({debt_burden_ratio:.1f}%) is within conservative institutional borrowing limits.")
    else:
        score += 8
        reasons.append("Monthly debt commitments remain reasonably proportioned to stated income.")

    # 2. EMI to Income Ratio
    if emi_ratio > 50:
        score += 20
        reasons.append(f"The new EMI alone requires {emi_ratio:.1f}% of your monthly income, exceeding the prudent 35% benchmark.")
    elif emi_ratio > 35:
        score += 12
        reasons.append(f"New monthly installment takes {emi_ratio:.1f}% of income, leaving modest disposable margins.")
    elif emi_ratio <= 20:
        score += 2
        reasons.append("The requested loan installment is comfortably serviceable under your current earnings.")
    else:
        score += 6

    # 3. Existing Monthly Debt
    if existing_debt > monthly_income * 0.3:
        score += 12
        reasons.append("Existing pre-loan commitments already absorb more than 30% of monthly earnings.")
    elif existing_debt == 0:
        score -= 4
        reasons.append("Zero reported existing debt obligations substantially strengthens your risk profile.")

    # 4. Credit History
    if credit_history in ['0', '0.0', 'Poor', 0]:
        score += 24
        reasons.append("Credit history indicates previous repayment delinquencies or non-adherence to standard credit guidelines.")
    else:
        score -= 5
        reasons.append("Demonstrated positive credit history reflects strong historical repayment reliability.")

    # 5. Loan to Annual Income Multiple
    annual_income = max(1.0, monthly_income * 12.0)
    multiple = loan_amount / annual_income
    if multiple > 5.0:
        score += 14
        reasons.append(f"Requested loan amount is {multiple:.1f}x your annual income, which represents elevated credit leverage.")
    elif multiple > 3.5:
        score += 8
        reasons.append(f"Requested loan amount is {multiple:.1f}x your annual income.")

    # 6. Self-employment factor
    if self_employed == 'Yes':
        score += 4
        reasons.append("Self-employed profile indicates potential cashflow seasonality.")

    final_score = max(5, min(98, round(score)))

    if final_score <= 20:
        risk_level = "Very Low Risk"
    elif final_score <= 40:
        risk_level = "Low Risk"
    elif final_score <= 60:
        risk_level = "Moderate Risk"
    elif final_score <= 80:
        risk_level = "High Risk"
    else:
        risk_level = "Very High Risk"

    return {
        'score': final_score,
        'risk_level': risk_level,
        'reasons': reasons[:4],
        'disclaimer': "This is an application-level financial risk indicator and is not an official banking or credit score."
    }
