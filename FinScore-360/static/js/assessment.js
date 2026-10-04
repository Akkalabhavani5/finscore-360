/**
 * FinScore 360 – Loan Assessment Form Validation
 * Enforces:
 * - All fields manually selected or entered
 * - No default fills
 * - Positive numerical values
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loanAssessmentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        let hasError = false;
        let errorMessage = '';

        // Check required selects
        const selects = ['gender', 'married', 'dependents', 'education', 'self_employed', 'property_area', 'credit_history'];
        for (const id of selects) {
            const el = document.getElementById(id);
            if (el && (!el.value || el.value === '')) {
                hasError = true;
                errorMessage = 'Please make a selection for all dropdown questions.';
                el.focus();
                break;
            }
        }

        // Check numeric fields
        if (!hasError) {
            const appIncome = parseFloat(document.getElementById('applicant_income')?.value);
            const loanAmt = parseFloat(document.getElementById('loan_amount')?.value);
            const interestRate = parseFloat(document.getElementById('annual_interest_rate')?.value);
            const tenureVal = parseFloat(document.getElementById('tenure_value')?.value);
            const existingDebt = parseFloat(document.getElementById('existing_debt')?.value);

            if (isNaN(appIncome) || appIncome <= 0) {
                hasError = true;
                errorMessage = 'Please enter a valid monthly applicant income greater than 0.';
                document.getElementById('applicant_income')?.focus();
            } else if (isNaN(loanAmt) || loanAmt <= 0) {
                hasError = true;
                errorMessage = 'Please enter a valid requested loan amount greater than 0.';
                document.getElementById('loan_amount')?.focus();
            } else if (isNaN(interestRate) || interestRate < 0) {
                hasError = true;
                errorMessage = 'Please enter a valid annual interest rate (0% or higher).';
                document.getElementById('annual_interest_rate')?.focus();
            } else if (isNaN(tenureVal) || tenureVal <= 0) {
                hasError = true;
                errorMessage = 'Please enter a valid loan tenure duration greater than 0.';
                document.getElementById('tenure_value')?.focus();
            } else if (isNaN(existingDebt) || existingDebt < 0) {
                hasError = true;
                errorMessage = 'Please enter your existing monthly debt (or 0 if none).';
                document.getElementById('existing_debt')?.focus();
            }
        }

        if (hasError) {
            e.preventDefault();
            // Show inline toast/alert
            let alertBox = document.getElementById('formValidationError');
            if (!alertBox) {
                alertBox = document.createElement('div');
                alertBox.id = 'formValidationError';
                alertBox.className = 'alert alert-danger';
                form.insertBefore(alertBox, form.firstChild);
            }
            alertBox.textContent = errorMessage;
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
