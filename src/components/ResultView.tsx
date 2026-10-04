import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Printer,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Wallet,
  Calendar,
  Percent,
} from 'lucide-react';
import { FullAssessmentResult } from '../services/financialEngine';

interface ResultViewProps {
  result: FullAssessmentResult;
  onModify: () => void;
  onNewAssessment: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onModify,
  onNewAssessment,
}) => {
  const isApproved = result.prediction.status === 'Approved';
  const riskScore = result.risk.score;

  // Determine color theme for Risk Tier
  let riskColorClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (result.risk.riskLevel === 'Low Risk') {
    riskColorClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (result.risk.riskLevel === 'Moderate Risk') {
    riskColorClass = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else if (result.risk.riskLevel === 'High Risk' || result.risk.riskLevel === 'Very High Risk') {
    riskColorClass = 'text-red-400 border-red-500/30 bg-red-500/10';
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Executive Financial Intelligence Report
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Financial Assessment Summary
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculated strictly from your submitted financial details and borrowing requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={onModify}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Modify Details</span>
          </button>
        </div>
      </div>

      {/* Row 1: The Two Core Verdicts (Loan Prediction & FinScore Risk Score) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Loan Approval Prediction */}
        <div
          className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between ${
            isApproved
              ? 'bg-slate-900/90 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-900/90 border-red-500/30 shadow-lg shadow-red-950/20'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Machine Learning Forecast
              </span>
              <div
                className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isApproved
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {isApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>{isApproved ? 'Approved' : 'Not Approved'}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Loan Approval Prediction</h2>

            <div className="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Predicted Qualification Status:</span>
                <span className={`text-2xl font-extrabold ${isApproved ? 'text-emerald-400' : 'text-red-400'}`}>
                  {result.prediction.status}
                </span>
              </div>
              {result.prediction.probability && (
                <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-slate-900 text-xs">
                  <span className="text-slate-400">Estimated Model Likelihood:</span>
                  <strong className="text-white font-mono text-sm">{result.prediction.probability}%</strong>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isApproved
                ? 'Your requested loan parameters, stated earning power, and credit history meet institutional underwriting criteria calibrated on historical loan datasets.'
                : 'Your current debt-to-income balance, requested loan multiple, or credit history track indicates significant underwriting friction. Consider adjusting your tenure or principal.'}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/70 text-[11px] text-slate-500">
            Internal ML classification pipeline · Evaluated purely on user values
          </div>
        </div>

        {/* 2. Financial Risk Assessment */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Application-Level Index
              </span>
              <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${riskColorClass}`}>
                {result.risk.riskLevel}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">FinScore Financial Risk Score</h2>

            <div className="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Calculated Risk Index</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{riskScore}</span>
                  <span className="text-sm font-semibold text-slate-500">/ 100</span>
                </div>
              </div>

              {/* Visual Meter Bar */}
              <div className="w-36 space-y-1.5 text-right">
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${riskScore}%` }}
                    className={`h-full ${
                      riskScore <= 40 ? 'bg-emerald-400' : riskScore <= 60 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {riskScore <= 20
                    ? '0–20 Very Low'
                    : riskScore <= 40
                    ? '21–40 Low'
                    : riskScore <= 60
                    ? '41–60 Moderate'
                    : riskScore <= 80
                    ? '61–80 High'
                    : '81–100 Very High'}
                </span>
              </div>
            </div>

            {/* Dynamic Reasons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">Primary Risk Factors:</span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {result.risk.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-800/70 text-[11px] text-slate-500 italic">
            This is an application-level financial risk indicator and is not an official banking or credit score.
          </div>
        </div>

      </div>

      {/* Row 2: Comprehensive Financial Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* EMI Summary Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">EMI &amp; Repayment Breakdown</h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Estimated Monthly EMI</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              ₹{result.emi.monthlyEMI.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Requested Principal Amount:</span>
              <strong className="text-white">₹{result.submittedValues.loanAmount.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Annual Interest Rate:</span>
              <strong className="text-white">{result.submittedValues.annualInterestRate}%</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Loan Tenure:</span>
              <strong className="text-white">
                {result.submittedValues.tenureMonths} Months ({(result.submittedValues.tenureMonths / 12).toFixed(1)} Years)
              </strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Total Cumulative Interest:</span>
              <strong className="text-white">₹{result.emi.totalInterest.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Total Amount Payable:</span>
              <strong className="text-white">₹{result.emi.totalAmountPayable.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">EMI-to-Income Proportion:</span>
              <strong className="text-white">
                {result.emi.emiToIncomeRatio}% ({result.emi.affordabilityStatus})
              </strong>
            </div>
          </div>
        </div>

        {/* Existing Debt & Total Burden Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Wallet className="w-4 h-4 text-blue-400" />
            <h3 className="text-base font-bold text-white">Debt Burden &amp; Cash Flow Impact</h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Total Monthly Debt Obligation</span>
            <span className="text-2xl font-extrabold text-blue-400">
              ₹{result.debt.totalMonthlyDebtBurden.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Existing Monthly Debt / EMI:</span>
              <strong className="text-white">₹{result.debt.existingMonthlyDebt.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">New Projected EMI:</span>
              <strong className="text-white">₹{result.debt.newEMI.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Combined Monthly Income:</span>
              <strong className="text-white">₹{result.submittedValues.monthlyIncome.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Debt Burden Ratio (DTI):</span>
              <strong className="text-white">{result.debt.debtBurdenRatio}%</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400">Credit Track Record Stated:</span>
              <strong className="text-white">{result.submittedValues.creditHistory}</strong>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Net Disposable Margin:</span>
              <strong className="text-emerald-400">
                ₹{Math.max(0, result.submittedValues.monthlyIncome - result.debt.totalMonthlyDebtBurden).toLocaleString('en-IN')} / mo
              </strong>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Personalized Financial Tips */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Pragmatic Guidance
          </span>
          <h2 className="text-xl font-bold text-white">Personalized Financial Tips</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Custom recommendations formulated exclusively from your reported debt burden, EMI ratio, and approval standing:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-800/80">
          * Implementation of these tips does not guarantee institutional credit approval. Always review official terms with authorized lenders.
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={onNewAssessment}
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Brand New Assessment</span>
        </button>

        <button
          onClick={onModify}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
        >
          <span>Modify Current Inputs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
