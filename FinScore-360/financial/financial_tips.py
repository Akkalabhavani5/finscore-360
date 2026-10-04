"""
FinScore 360 – Personalized Financial Tips Generator
Generates actionable, tailored financial suggestions based strictly on user values.
"""

def generate_tips(
    emi_ratio: float,
    debt_burden_ratio: float,
    credit_history: str,
    prediction_status: str,
    risk_level: str,
    existing_debt: float,
    coapplicant_income: float
):
    tips = []

    # EMI Tip
    if emi_ratio > 40.0:
        tips.append("Your new EMI consumes a significant portion of your monthly income. Consider opting for a longer tenure or reducing the principal amount to lower monthly payment pressure.")
    elif emi_ratio <= 25.0:
        tips.append("Your projected installment is well-sized relative to income, leaving ample capacity for ongoing investments and emergency savings.")

    # Debt Burden Tip
    if debt_burden_ratio > 50.0:
        tips.append("Your existing monthly debt already represents a significant repayment burden. Consider reducing existing obligations before taking additional debt.")
    elif existing_debt > 0 and debt_burden_ratio > 35.0:
        tips.append("Exploring debt consolidation for current monthly obligations could free up discretionary cash flow and lower combined interest costs.")

    # Credit History Tip
    if credit_history in ['0', '0.0', 'Poor', 0]:
        tips.append("Maintaining timely repayments and improving your credit history may strengthen future borrowing opportunities. Prioritize clearing overdue accounts.")
    else:
        tips.append("Maintaining your strong credit discipline ensures continued access to institutional prime interest rates and accelerated processing.")

    # Coapplicant recommendation
    if (coapplicant_income <= 0) and prediction_status == 'Not Approved':
        tips.append("Adding an earning co-applicant (e.g. spouse or parent) increases verifiable household income and may significantly improve loan eligibility.")

    # Loan Approval Guidance
    if prediction_status == 'Not Approved':
        tips.append("Review the factors affecting your application and consider improving your financial profile before applying again.")
    elif risk_level in ['Very Low Risk', 'Low Risk']:
        tips.append("Your estimated repayment burden appears relatively manageable based on the information you provided. You may compare multiple institutional quotes for optimal terms.")

    tips.append("Ensure you retain at least 3 to 6 months of living expenses in an accessible emergency reserve alongside planned loan repayments.")

    # Note: Do not guarantee approval
    return tips[:4]
