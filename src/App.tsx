/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, PageView } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AssessmentView } from './components/AssessmentView';
import { EmiCalculatorView } from './components/EmiCalculatorView';
import { ResultView } from './components/ResultView';
import { AboutView } from './components/AboutView';
import { FullAssessmentResult, LoanApplicationInput } from './services/financialEngine';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [assessmentResult, setAssessmentResult] = useState<FullAssessmentResult | null>(null);
  const [assessmentInitialValues, setAssessmentInitialValues] = useState<Partial<LoanApplicationInput>>({});

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (result: FullAssessmentResult) => {
    setAssessmentResult(result);
    setCurrentPage('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedFromEmi = (values: {
    loanAmount: number;
    annualInterestRate: number;
    tenureValue: number;
    tenureUnit: 'Years' | 'Months';
    applicantIncome: number;
    existingMonthlyDebt: number;
  }) => {
    setAssessmentInitialValues({
      loanAmount: values.loanAmount,
      annualInterestRate: values.annualInterestRate,
      tenureValue: values.tenureValue,
      tenureUnit: values.tenureUnit,
      applicantIncome: values.applicantIncome,
      existingMonthlyDebt: values.existingMonthlyDebt,
    });
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModifyAssessment = () => {
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewAssessment = () => {
    setAssessmentResult(null);
    setAssessmentInitialValues({});
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomeView onNavigate={handleNavigate} />}

        {currentPage === 'assessment' && (
          <AssessmentView
            onAssessmentComplete={handleAssessmentComplete}
            initialValues={assessmentInitialValues}
          />
        )}

        {currentPage === 'emi' && (
          <EmiCalculatorView onProceedToAssessment={handleProceedFromEmi} />
        )}

        {currentPage === 'result' && assessmentResult && (
          <ResultView
            result={assessmentResult}
            onModify={handleModifyAssessment}
            onNewAssessment={handleNewAssessment}
          />
        )}

        {currentPage === 'result' && !assessmentResult && (
          <div className="max-w-md mx-auto text-center py-20 px-4">
            <h2 className="text-xl font-bold text-white mb-2">No Active Assessment Found</h2>
            <p className="text-sm text-slate-400 mb-6">
              Please complete the manual loan assessment form to generate your report.
            </p>
            <button
              onClick={() => handleNavigate('assessment')}
              className="px-6 py-2.5 bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm"
            >
              Start Assessment
            </button>
          </div>
        )}

        {currentPage === 'about' && <AboutView />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
