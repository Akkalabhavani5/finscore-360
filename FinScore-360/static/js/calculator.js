/**
 * FinScore 360 – EMI Calculator Client Validation & Dynamic Computation
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emiCalculatorForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const loanAmt = parseFloat(document.getElementById('calc_loan_amount')?.value);
        const rate = parseFloat(document.getElementById('calc_interest_rate')?.value);
        const tenure = parseFloat(document.getElementById('calc_tenure_val')?.value);
        const income = parseFloat(document.getElementById('calc_monthly_income')?.value);
        const debt = parseFloat(document.getElementById('calc_existing_debt')?.value);

        if (isNaN(loanAmt) || loanAmt <= 0 || isNaN(rate) || rate < 0 || isNaN(tenure) || tenure <= 0 || isNaN(income) || income <= 0 || isNaN(debt) || debt < 0) {
            e.preventDefault();
            alert('Please provide valid numbers for all fields. Monthly income and loan amount must be positive.');
        }
    });
});
