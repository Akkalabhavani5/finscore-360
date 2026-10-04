import React, { useState } from 'react';
import { ShieldCheck, Terminal, BookOpen, Layers, CheckCircle2, Copy, Check } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const windowsCommands = `# 1. Create a Python Virtual Environment
python -m venv venv

# 2. Activate Virtual Environment (Windows PowerShell / CMD)
venv\\Scripts\\activate

# 3. Install Required Python Dependencies
pip install -r requirements.txt

# 4. Train Models & Preprocessing Artifacts
cd ml
python train_models.py
python evaluate_models.py
cd ..

# 5. Start the Flask Web Application
python app.py

# 6. Open in Browser
http://127.0.0.1:5000`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
          System Overview &amp; Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          About FinScore 360
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          FinScore 360 is an enterprise-grade AI loan qualification and financial risk evaluation platform designed to bridge prospective borrowers with institutional lending prudence.
        </p>
      </div>

      {/* Grid: Philosophy & Ethics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">The FinScore 360 Mission</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Borrowers frequently approach loan applications without insight into debt burden thresholds, true amortized cost, or credit approval probability. FinScore 360 delivers transparent, instantaneous multi-factor analytics without requiring financial data disclosure to credit bureaus.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Zero-Default Data Integrity</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Unlike calculators that pre-populate arbitrary incomes or silently borrow numbers from historical databases, FinScore 360 guarantees that 100% of prediction inputs are entered intentionally by the current user. No silent dataset row substitution ever occurs.
          </p>
        </div>
      </div>

      {/* The 4 Pillars */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            System Methodology
          </span>
          <h2 className="text-xl font-bold text-white">How the Four Core Pillars Operate</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400">1. Loan Approval Prediction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained on benchmark retail loan portfolios, our backend machine learning classification pipeline correlates applicant earnings, co-borrower stability, requested principal, and credit standing to project qualification likelihood.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-400">2. EMI Calculator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Executes industry-standard reducing balance installment equations: $EMI = P \times R \times (1+R)^N / ((1+R)^N - 1)$, producing total interest, cumulative repayment, and affordability classifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-400">3. Financial Risk Assessment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes debt-to-income (DTI) metrics, existing loan commitments, disposable cash reserves, and income stability into the 0–100 FinScore Risk Score across 5 distinct risk tiers with personalized explanations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-indigo-400">4. Personalized Financial Tips</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically generates 3 to 5 targeted recommendations to help users lower monthly repayment pressure, consolidate high-cost debts, improve credit behavior, or leverage co-applicants.
            </p>
          </div>
        </div>
      </div>

      {/* Windows / VS Code Local Execution Guide (Section 29) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Local Engineering Execution
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span>Running FinScore 360 in VS Code on Windows</span>
            </h2>
          </div>
          <button
            onClick={() => copyToClipboard(windowsCommands, 'all')}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors self-start sm:self-center"
          >
            {copiedStep === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStep === 'all' ? 'Copied' : 'Copy Commands'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The full Python + Flask + Scikit-Learn project is pre-packaged inside the <code className="text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">FinScore-360/</code> directory. Follow these terminal steps in VS Code:
        </p>

        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-5 overflow-x-auto">
          <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
            {windowsCommands}
          </pre>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Pipeline Architecture Flow:
          </h3>
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-xs text-slate-400 leading-relaxed">
            User Form &rarr; Flask Validation &rarr; Preprocessing Pipeline &rarr; Trained ML Model &rarr; Loan Prediction + EMI + Risk Score + Dynamic Tips &rarr; Result Page
          </div>
        </div>
      </div>

    </div>
  );
};
