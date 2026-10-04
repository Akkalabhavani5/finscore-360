import React, { useState } from 'react';
import { AlertCircle, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LoanApplicationInput, FullAssessmentResult, runFullAssessment } from '../services/financialEngine';

interface AssessmentViewProps {
  onAssessmentComplete: (result: FullAssessmentResult) => void;
  initialValues?: Partial<LoanApplicationInput>;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  onAssessmentComplete,
  initialValues,
}) => {
  // STRICT RULE 2 & 27: All fields empty by default!
  const [formData, setFormData] = useState<LoanApplicationInput>({
    gender: initialValues?.gender || '',
    married: initialValues?.married || '',
    dependents: initialValues?.dependents || '',
    education: initialValues?.education || '',
    selfEmployed: initialValues?.selfEmployed || '',
    applicantIncome: initialValues?.applicantIncome ?? '',
    coapplicantIncome: initialValues?.coapplicantIncome ?? '',
    loanAmount: initialValues?.loanAmount ?? '',
    loanTermMonths: initialValues?.loanTermMonths ?? '',
    creditHistory: initialValues?.creditHistory || '',
    propertyArea: initialValues?.propertyArea || '',
    annualInterestRate: initialValues?.annualInterestRate ?? '',
    tenureValue: initialValues?.tenureValue ?? '',
    tenureUnit: initialValues?.tenureUnit || 'Years',
    existingMonthlyDebt: initialValues?.existingMonthlyDebt ?? '',
    monthlyIncome: initialValues?.monthlyIncome ?? '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof LoanApplicationInput,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleReset = () => {
    setFormData({
      gender: '',
      married: '',
      dependents: '',
      education: '',
      selfEmployed: '',
      applicantIncome: '',
      coapplicantIncome: '',
      loanAmount: '',
      loanTermMonths: '',
      creditHistory: '',
      propertyArea: '',
      annualInterestRate: '',
      tenureValue: '',
      tenureUnit: 'Years',
      existingMonthlyDebt: '',
      monthlyIncome: '',
    });
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Dropdown Selections
    if (
      !formData.gender ||
      !formData.married ||
      !formData.dependents ||
      !formData.education ||
      !formData.selfEmployed ||
      !formData.propertyArea ||
      !formData.creditHistory
    ) {
      setValidationError(
        'Please provide a selection for all required profile questions (Gender, Marital Status, Dependents, Education, Self Employment, Property Area, Credit History).'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Validate Numerical Financial Inputs
    const appIncome = Number(formData.applicantIncome);
    const coappIncome = Number(formData.coapplicantIncome) || 0;
    const loanAmt = Number(formData.loanAmount);
    const annualRate = Number(formData.annualInterestRate);
    const tenureVal = Number(formData.tenureValue);
    const existingDebt = Number(formData.existingMonthlyDebt);

    if (formData.applicantIncome === '' || isNaN(appIncome) || appIncome <= 0) {
      setValidationError('Applicant Monthly Income is required and must be greater than 0.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.existingMonthlyDebt === '' || isNaN(existingDebt) || existingDebt < 0) {
      setValidationError('Existing Monthly Debt is required (enter 0 if you currently have no debts).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.loanAmount === '' || isNaN(loanAmt) || loanAmt <= 0) {
      setValidationError('Requested Loan Amount is required and must be greater than 0.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.annualInterestRate === '' || isNaN(annualRate) || annualRate < 0) {
      setValidationError('Annual Interest Rate is required and cannot be negative.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.tenureValue === '' || isNaN(tenureVal) || tenureVal <= 0) {
      setValidationError('Loan Tenure is required and must be greater than 0.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = runFullAssessment({
        ...formData,
        applicantIncome: appIncome,
        coapplicantIncome: coappIncome,
        loanAmount: loanAmt,
        annualInterestRate: annualRate,
        tenureValue: tenureVal,
        existingMonthlyDebt: existingDebt,
        monthlyIncome: appIncome + coappIncome,
      });

      onAssessmentComplete(result);
    } catch (err) {
      setValidationError('An unexpected error occurred while calculating results. Please check your inputs.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Page Title & Context */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
          Strict User-Input Evaluation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Loan Assessment &amp; Financial Risk Analysis
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Please enter your parameters below. Every figure—including loan approval likelihood, EMI, debt burden, and financial risk score—is computed exclusively from your manual entries with zero pre-filled assumptions.
        </p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{validationError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        
        {/* PART 1: Demographics & Background */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Part 1 of 3
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Applicant Profile &amp; Background</h2>
            <p className="text-xs text-slate-400 mt-1">
              Required parameters for the machine learning loan classification pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Gender */}
            <div className="space-y-1.5">
              <label htmlFor="gender" className="block text-xs font-semibold text-slate-200">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="space-y-1.5">
              <label htmlFor="married" className="block text-xs font-semibold text-slate-200">
                Marital Status <span className="text-red-400">*</span>
              </label>
              <select
                id="married"
                value={formData.married}
                onChange={(e) => handleInputChange('married', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="Married">Married</option>
                <option value="Not Married">Not Married</option>
              </select>
            </div>

            {/* Dependents */}
            <div className="space-y-1.5">
              <label htmlFor="dependents" className="block text-xs font-semibold text-slate-200">
                Number of Dependents <span className="text-red-400">*</span>
              </label>
              <select
                id="dependents"
                value={formData.dependents}
                onChange={(e) => handleInputChange('dependents', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3 or more</option>
              </select>
            </div>

            {/* Education */}
            <div className="space-y-1.5">
              <label htmlFor="education" className="block text-xs font-semibold text-slate-200">
                Education Level <span className="text-red-400">*</span>
              </label>
              <select
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>

            {/* Self Employed */}
            <div className="space-y-1.5">
              <label htmlFor="selfEmployed" className="block text-xs font-semibold text-slate-200">
                Self Employed Status <span className="text-red-400">*</span>
              </label>
              <select
                id="selfEmployed"
                value={formData.selfEmployed}
                onChange={(e) => handleInputChange('selfEmployed', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="No">No (Salaried Employee)</option>
                <option value="Yes">Yes (Self-Employed / Business)</option>
              </select>
            </div>

            {/* Property Area */}
            <div className="space-y-1.5">
              <label htmlFor="propertyArea" className="block text-xs font-semibold text-slate-200">
                Property Location Area <span className="text-red-400">*</span>
              </label>
              <select
                id="propertyArea"
                value={formData.propertyArea}
                onChange={(e) => handleInputChange('propertyArea', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

          </div>
        </div>

        {/* PART 2: Income & Existing Obligations */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Part 2 of 3
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Income &amp; Current Obligations</h2>
            <p className="text-xs text-slate-400 mt-1">
              Required for calculating debt burden ratios (DTI), EMI capacity, and financial risk score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Applicant Income */}
            <div className="space-y-1.5">
              <label htmlFor="applicantIncome" className="block text-xs font-semibold text-slate-200">
                Applicant Monthly Income (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="applicantIncome"
                placeholder="Example: 55000"
                min="1"
                step="any"
                value={formData.applicantIncome}
                onChange={(e) =>
                  handleInputChange(
                    'applicantIncome',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Gross monthly income of primary earner</span>
            </div>

            {/* Coapplicant Income */}
            <div className="space-y-1.5">
              <label htmlFor="coapplicantIncome" className="block text-xs font-semibold text-slate-200">
                Co-Applicant Monthly Income (₹)
              </label>
              <input
                type="number"
                id="coapplicantIncome"
                placeholder="Example: 20000"
                min="0"
                step="any"
                value={formData.coapplicantIncome}
                onChange={(e) =>
                  handleInputChange(
                    'coapplicantIncome',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Enter 0 if applying without a co-applicant</span>
            </div>

            {/* Existing Monthly Debt / EMI */}
            <div className="space-y-1.5">
              <label htmlFor="existingMonthlyDebt" className="block text-xs font-semibold text-slate-200">
                Existing Monthly Debt / EMI (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="existingMonthlyDebt"
                placeholder="Example: 8000"
                min="0"
                step="any"
                value={formData.existingMonthlyDebt}
                onChange={(e) =>
                  handleInputChange(
                    'existingMonthlyDebt',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Total ongoing monthly installments &amp; debt</span>
            </div>

          </div>
        </div>

        {/* PART 3: Requested Loan Parameters & Credit Standing */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Part 3 of 3
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Requested Loan Parameters &amp; Credit Standing</h2>
            <p className="text-xs text-slate-400 mt-1">
              Specify your proposed loan amount, rate, tenure, and credit track record.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Loan Amount */}
            <div className="space-y-1.5">
              <label htmlFor="loanAmount" className="block text-xs font-semibold text-slate-200">
                Requested Loan Amount (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="loanAmount"
                placeholder="Example: 1500000"
                min="1"
                step="any"
                value={formData.loanAmount}
                onChange={(e) =>
                  handleInputChange(
                    'loanAmount',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Total principal borrowing amount requested</span>
            </div>

            {/* Annual Interest Rate */}
            <div className="space-y-1.5">
              <label htmlFor="annualInterestRate" className="block text-xs font-semibold text-slate-200">
                Annual Interest Rate (%) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="annualInterestRate"
                placeholder="Example: 8.5"
                min="0"
                max="40"
                step="0.01"
                value={formData.annualInterestRate}
                onChange={(e) =>
                  handleInputChange(
                    'annualInterestRate',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Expected annual percentage rate</span>
            </div>

            {/* Loan Tenure with Years/Months toggle */}
            <div className="space-y-1.5">
              <label htmlFor="tenureValue" className="block text-xs font-semibold text-slate-200">
                Loan Tenure <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="tenureValue"
                  placeholder="Example: 15"
                  min="1"
                  step="1"
                  value={formData.tenureValue}
                  onChange={(e) =>
                    handleInputChange(
                      'tenureValue',
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <select
                  value={formData.tenureUnit}
                  onChange={(e) => handleInputChange('tenureUnit', e.target.value as 'Years' | 'Months')}
                  className="w-28 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>
              </div>
              <span className="block text-[11px] text-slate-400">Total duration of the credit facility</span>
            </div>

            {/* Credit History */}
            <div className="space-y-1.5">
              <label htmlFor="creditHistory" className="block text-xs font-semibold text-slate-200">
                Credit History Standing <span className="text-red-400">*</span>
              </label>
              <select
                id="creditHistory"
                value={formData.creditHistory}
                onChange={(e) => handleInputChange('creditHistory', e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>Select an option</option>
                <option value="Good">Good (Guidelines Met / Prompt Repayments)</option>
                <option value="Poor">Poor (Guidelines Not Met / Past Overdues)</option>
              </select>
              <span className="block text-[11px] text-slate-400">Historical repayment track record</span>
            </div>

          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Fields</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 w-full sm:w-auto justify-center disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Evaluating Assessment...' : 'Run Financial Assessment'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};
