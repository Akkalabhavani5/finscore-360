import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, AlertCircle, Lightbulb, Lock, Sparkles } from 'lucide-react';
import { PageView } from './Navbar';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Financial Prudence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                FinScore <span className="text-emerald-400">360</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 mt-2">
                  AI Loan &amp; Financial Risk Assessment System
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Evaluate your personal loan eligibility with institutional rigor. FinScore 360 unifies machine learning approval prediction, exact reducing-balance EMI calculations, debt burden analytics, and customized financial optimization tips.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('assessment')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('emi')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Calculate EMI</span>
                </button>
              </div>

              {/* Zero-Pill Unboxed Metadata Bar */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
                <span>Zero Default Values</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>User Input Driven</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Isolated Backend ML</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>100% Privacy Protected</span>
              </div>
            </div>

            {/* Right Column: Interactive Framework Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-7 shadow-2xl">
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Multi-Vector Scoring Engine
                    </span>
                    <h3 className="text-base font-bold text-white">Application Risk Framework</h3>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Approval Probability</div>
                        <div className="text-xs text-slate-400">Trained Machine Learning Model</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">ML Calibrated</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">EMI &amp; Amortization</div>
                        <div className="text-xs text-slate-400">Reducing-Balance Math</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue-400">Zero Error</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">FinScore Risk Score</div>
                        <div className="text-xs text-slate-400">0–100 Application Index</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-400">5 Risk Tiers</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Dynamic Financial Tips</div>
                        <div className="text-xs text-slate-400">User Value Specific</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-indigo-400">Personalized</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 text-center">
                  <button
                    onClick={() => onNavigate('assessment')}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Enter Your Details To Begin &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Four Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            System Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The Four Core Features of FinScore 360
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every feature operates exclusively on values you personally enter—with no automated assumptions, default values, or silent dataset row substitution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Loan Approval Prediction
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Applies a machine learning classifier in the backend to model your likelihood of securing credit. Factors applicant income, loan amount, co-applicant contributions, credit history, and property location.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <button
                onClick={() => onNavigate('assessment')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
              >
                <span>Evaluate Loan Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                EMI Calculator
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Computes exact monthly installments, aggregate interest liabilities, total repayment burden, and your EMI-to-income affordability percentage with flexible month or year tenures.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <button
                onClick={() => onNavigate('emi')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
              >
                <span>Calculate Installments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Financial Risk Assessment
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Derives an application-level FinScore Financial Risk Score (0–100) factoring existing debt, new EMI obligations, total debt burden ratio, and disposable cash reserves with dynamic justifications.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <button
                onClick={() => onNavigate('assessment')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
              >
                <span>Assess Risk Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                04
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                Personalized Financial Tips
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Provides tailored, rule-based recommendations specific to your debt ratios and cash flow to help you strengthen eligibility, lower financing costs, or prevent over-leverage.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <button
                onClick={() => onNavigate('assessment')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
              >
                <span>View Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Strict Ethical Discipline Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Manual Input Guarantee</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                FinScore 360 never automatically fills inputs with placeholder numbers, previous session artifacts, or hidden dataset values. What you see is what you entered.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Isolated ML Architecture</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Machine learning models are trained purely offline for prediction inference. Technical details like loss metrics or dataset previews are kept in developer backends.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Contextual Explanations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We never output an opaque risk score. Every risk level includes dynamic bulleted explanations derived directly from your personal debt-to-income and cash flow math.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-emerald-950/30 border border-emerald-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Begin Your 360° Financial Assessment</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Complete the interactive form in under 2 minutes to receive your loan approval forecast, repayment schedule, and risk score.
            </p>
          </div>
          <button
            onClick={() => onNavigate('assessment')}
            className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shrink-0"
          >
            Start Assessment Now
          </button>
        </div>
      </section>
    </div>
  );
};
