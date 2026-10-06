/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthView } from './components/AuthView';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './components/DashboardView';
import { ResumeAnalysisView } from './components/ResumeAnalysisView';
import { ResumeScreeningView } from './components/ResumeScreeningView';
import { JobMatchingView } from './components/JobMatchingView';
import { SkillGapView } from './components/SkillGapView';
import { CareerPathsView } from './components/CareerPathsView';
import { LearningRoadmapView } from './components/LearningRoadmapView';
import { SkillAssessmentView } from './components/SkillAssessmentView';
import { ProgressTrackingView } from './components/ProgressTrackingView';
import { CareerReportView } from './components/CareerReportView';
import { JobDatabaseView } from './components/JobDatabaseView';
import { SettingsView } from './components/SettingsView';
import { LandingPageView } from './components/LandingPageView';
import { Menu, X } from 'lucide-react';

const MainAppLayout: React.FC = () => {
  const { currentUser, activeTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is not authenticated, show professional AuthView (Login / Register)
  if (!currentUser) {
    return <AuthView />;
  }

  if (activeTab === 'landing') {
    return <LandingPageView />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'resume-analysis':
        return <ResumeAnalysisView />;
      case 'resume-screening':
        return <ResumeScreeningView />;
      case 'job-matching':
        return <JobMatchingView />;
      case 'skill-gap':
        return <SkillGapView />;
      case 'career-paths':
        return <CareerPathsView />;
      case 'learning-roadmap':
        return <LearningRoadmapView />;
      case 'skill-assessment':
        return <SkillAssessmentView />;
      case 'progress':
        return <ProgressTrackingView />;
      case 'career-report':
        return <CareerReportView />;
      case 'job-database':
        return <JobDatabaseView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden"
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header Bar with Hamburger */}
        <div className="md:hidden h-14 bg-slate-900 text-white px-4 flex items-center justify-between border-b border-slate-800">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="font-bold text-sm tracking-tight">
            SkillGap<span className="text-indigo-400">AI</span>
          </div>
          <div className="w-5" />
        </div>

        {/* Top Navbar */}
        <TopNavbar />

        {/* Active Screen View */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {renderActiveScreen()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
