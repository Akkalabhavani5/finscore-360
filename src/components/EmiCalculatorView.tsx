import React, { useState } from 'react';
import { Calculator, ArrowRight, RotateCcw, AlertCircle, PieChart } from 'lucide-react';
import { calculateEMI, calculateDebtBurden, EMICalculationResult, DebtBurdenResult } from '../services/financialEngine';

interface EmiCalculatorViewProps {
  onProceedToAssessment: (initialValues: {
    loanAmount: number;
    annualInterestRate: number;
    tenureValue: number;
    tenureUnit: 'Years' | 'Months';
    applicantIncome: number;
    existingMonthlyDebt: number;
  }) => void;
}

export const EmiCalculatorView: React.FC<EmiCalculatorViewProps> = ({ onProceedToAssessment }) => {
  // STRICT RULE 2: No pre-filled numbers. User enters all values.
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [annualInterestRate, setAnnualInterestRate] = useState<number | ''>('');
  const [tenureValue, setTenureValue] = useState<number | ''>('');
  const [tenureUnit, setTenureUnit] = useState<'Years' | 'Months'>('Years');
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  const [existingMonthlyDebt, setExistingMonthlyDebt] = useState<number | ''>('');

  const [calculationResult, setCalculationResult] = useState<{
    emi: EMICalculationResult;
    debt: DebtBurdenResult;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (loanAmount === '' || Number(loanAmount) <= 0) {
      setError('Please enter a valid loan amount greater than 0.');
      return;
    }
    if (annualInterestRate === '' || Number(annualInterestRate) < 0) {
      setError('Please enter a valid annual interest rate (0% or higher).');
      return;
    }
    if (tenureValue === '' || Number(tenureValue) <= 0) {
      setError('Please enter a valid loan tenure greater than 0.');
      return;
    }
    if (monthlyIncome === '' || Number(monthlyIncome) <= 0) {
      setError('Please enter your monthly net income to compute affordability.');
      return;
    }
    if (existingMonthlyDebt === '' || Number(existingMonthlyDebt) < 0) {
      setError('Please enter your existing monthly debt (or 0 if none).');
      return;
    }

    setError(null);

    const P = Number(loanAmount);
    const R = Number(annualInterestRate);
    const tenureMonths = tenureUnit === 'Years' ? Number(tenureValue) * 12 : Number(tenureValue);
    const income = Number(monthlyIncome);
    const existingDebt = Number(existingMonthlyDebt);

    const emi = calculateEMI(P, R, tenureMonths, income);
    const debt = calculateDebtBurden(existingDebt, emi.monthlyEMI, income);

    setCalculationResult({ emi, debt });
  };

  const handleReset = () => {
    setLoanAmount('');
    setAnnualInterestRate('');
    setTenureValue('');
    setTenureUnit('Years');
    setMonthlyIncome('');
    setExistingMonthlyDebt('');
    setCalculationResult(null);
    setError(null);
  };

  const handleTransferToAssessment = () => {
    if (
      loanAmount !== '' &&
      annualInterestRate !== '' &&
      tenureValue !== '' &&
      monthlyIncome !== '' &&
      existingMonthlyDebt !== ''
    ) {
      onProceedToAssessment({
        loanAmount: Number(loanAmount),
        annualInterestRate: Number(annualInterestRate),
        tenureValue: Number(tenureValue),
        tenureUnit,
        applicantIncome: Number(monthlyIncome),
        existingMonthlyDebt: Number(existingMonthlyDebt),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
          Mathematical Installment Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Loan EMI &amp; Affordability Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Compute your reducing-balance monthly installments, total cumulative interest, repayment schedule, and income impact. Every input must be entered manually.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <span>Loan Parameters</span>
          </h2>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Loan Amount */}
            <div className="space-y-1.5">
              <label htmlFor="calcLoanAmount" className="block text-xs font-semibold text-slate-200">
                Loan Principal Amount (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="calcLoanAmount"
                placeholder="Example: 1000000"
                min="1"
                step="any"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <label htmlFor="calcInterestRate" className="block text-xs font-semibold text-slate-200">
                Annual Interest Rate (%) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="calcInterestRate"
                placeholder="Example: 9.25"
                min="0"
                max="40"
                step="0.01"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-1.5">
              <label htmlFor="calcTenure" className="block text-xs font-semibold text-slate-200">
                Loan Tenure Duration <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="calcTenure"
                  placeholder="Example: 10"
                  min="1"
                  step="1"
                  value={tenureValue}
                  onChange={(e) => setTenureValue(e.target.value === '' ? '' : Number(e.target.value))}
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value as 'Years' | 'Months')}
                  className="w-28 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>
              </div>
            </div>

            {/* Monthly Net Income */}
            <div className="space-y-1.5">
              <label htmlFor="calcIncome" className="block text-xs font-semibold text-slate-200">
                Monthly Net Income (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="calcIncome"
                placeholder="Example: 65000"
                min="1"
                step="any"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Required to compute EMI-to-income and affordability band</span>
            </div>

            {/* Existing Monthly Debt */}
            <div className="space-y-1.5">
              <label htmlFor="calcDebt" className="block text-xs font-semibold text-slate-200">
                Existing Monthly Debt / EMI (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="calcDebt"
                placeholder="Example: 6000"
                min="0"
                step="any"
                value={existingMonthlyDebt}
                onChange={(e) => setExistingMonthlyDebt(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="block text-[11px] text-slate-400">Ongoing repayments (car, personal, credit card EMIs)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 px-4 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
              >
                Calculate Schedule
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-3 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                title="Reset Calculator"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right: Results / Empty State */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          {calculationResult ? (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Computed Repayment Summary
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Monthly Installment (EMI)</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      ₹{calculationResult.emi.monthlyEMI.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Affordability Status</span>
                    <span
                      className={`text-sm font-bold ${
                        calculationResult.emi.affordabilityStatus === 'Comfortable'
                          ? 'text-emerald-400'
                          : calculationResult.emi.affordabilityStatus === 'Manageable'
                          ? 'text-blue-400'
                          : calculationResult.emi.affordabilityStatus === 'High Burden'
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {calculationResult.emi.affordabilityStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metric Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">Total Interest Payable</span>
                  <span className="text-lg font-bold text-slate-100">
                    ₹{calculationResult.emi.totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">Total Amount Payable</span>
                  <span className="text-lg font-bold text-slate-100">
                    ₹{calculationResult.emi.totalAmountPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">EMI-to-Income Proportion</span>
                  <span className="text-lg font-bold text-slate-100">
                    {calculationResult.emi.emiToIncomeRatio}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">Total Debt Burden (DTI)</span>
                  <span className="text-lg font-bold text-slate-100">
                    {calculationResult.debt.debtBurdenRatio}%
                  </span>
                </div>
              </div>

              {/* Principal vs Interest Breakdown Visual */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Principal (₹{Number(loanAmount).toLocaleString('en-IN')})</span>
                  <span>Interest (₹{calculationResult.emi.totalInterest.toLocaleString('en-IN')})</span>
                </div>
                {(() => {
                  const principal = Number(loanAmount);
                  const total = calculationResult.emi.totalAmountPayable;
                  const principalPercent = total > 0 ? (principal / total) * 100 : 50;
                  const interestPercent = 100 - principalPercent;
                  return (
                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                      <div
                        style={{ width: `${principalPercent}%` }}
                        className="bg-emerald-400 h-full"
                        title={`Principal: ${principalPercent.toFixed(1)}%`}
                      />
                      <div
                        style={{ width: `${interestPercent}%` }}
                        className="bg-blue-400 h-full"
                        title={`Interest: ${interestPercent.toFixed(1)}%`}
                      />
                    </div>
                  );
                })()}
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Principal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" /> Total Interest
                  </span>
                </div>
              </div>

              {/* Combined Monthly Outflow */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="font-semibold text-white">Monthly Cash Flow Impact:</div>
                <p>
                  Existing obligations (₹{calculationResult.debt.existingMonthlyDebt.toLocaleString('en-IN')}) + New loan EMI (₹{calculationResult.debt.newEMI.toLocaleString('en-IN')}) = <strong className="text-emerald-400">₹{calculationResult.debt.totalMonthlyDebtBurden.toLocaleString('en-IN')}</strong> total monthly debt outflow.
                </p>
              </div>

              {/* Direct Handoff CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTransferToAssessment}
                  className="w-full py-3.5 px-4 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Full Loan Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  Carries your loan parameters directly into the comprehensive 360° risk evaluation.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
                <PieChart className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Parameters Entered Yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Enter your requested loan amount, rate, tenure, and monthly income on the left to compute your exact installment schedule.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
