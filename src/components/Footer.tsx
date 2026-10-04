import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PageView } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                FinScore<span className="text-emerald-400">360</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              AI-driven loan approval forecasting, mathematical EMI computation, and holistic application-level financial risk analytics. Built with zero default values and 100% privacy isolation.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Loan Approval Prediction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emi')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  EMI Calculator &amp; Amortization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Financial Risk Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Personalized Financial Tips
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3">
              Platform &amp; Code
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  System Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  VS Code &amp; Windows Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Data Ethics &amp; Architecture
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; 2026 FinScore 360 System. All rights reserved.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            FinScore is an application-level financial risk indicator and is not an official banking or credit score.
          </p>
        </div>
      </div>
    </footer>
  );
};
