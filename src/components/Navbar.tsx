import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export type PageView = 'home' | 'assessment' | 'emi' | 'result' | 'about';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                FinScore<span className="text-emerald-400">360</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                AI Risk &amp; Loan Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNav('home')}
              className={`text-sm font-medium transition-colors hover:text-white ${
                currentPage === 'home' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('assessment')}
              className={`text-sm font-medium transition-colors hover:text-white ${
                currentPage === 'assessment' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Loan Assessment
            </button>
            <button
              onClick={() => handleNav('emi')}
              className={`text-sm font-medium transition-colors hover:text-white ${
                currentPage === 'emi' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              EMI Calculator
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-sm font-medium transition-colors hover:text-white ${
                currentPage === 'about' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              About &amp; Guide
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('assessment')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-sm hover:shadow-emerald-500/20"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNav('home')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('assessment')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
          >
            Loan Assessment
          </button>
          <button
            onClick={() => handleNav('emi')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
          >
            EMI Calculator
          </button>
          <button
            onClick={() => handleNav('about')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
          >
            About &amp; Guide
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('assessment')}
              className="w-full text-center py-2.5 px-4 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg"
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
