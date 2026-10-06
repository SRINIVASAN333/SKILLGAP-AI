import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Briefcase,
  Zap,
  Target,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Upload
} from 'lucide-react';
import { rankJobRolesForCandidate } from '../services/nlpService';

export const DashboardView: React.FC = () => {
  const {
    activeProfile,
    targetRole,
    currentAnalysis,
    roadmapSteps,
    setActiveTab,
    jobRoles,
    hasUploadedResume
  } = useApp();

  const completedSteps = roadmapSteps.filter(s => s.completed).length;
  const totalSteps = roadmapSteps.length;
  const roadmapPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const roleRankings = rankJobRolesForCandidate(activeProfile, jobRoles);

  // SVG Circular Gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentAnalysis.jobReadinessScore / 100) * circumference;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Career Intelligence Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Intelligence Platform</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Career Readiness &amp; Skill Gap Hub
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time NLP resume extraction and benchmark alignment for <span className="font-bold text-white">{targetRole.title}</span>. Follow your personalized roadmap to bridge skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={() => setActiveTab('resume-analysis')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{hasUploadedResume ? 'Update Resume' : 'Upload Resume Now'}</span>
          </button>
          <button
            onClick={() => setActiveTab('career-report')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <span>View Audit Report</span>
          </button>
        </div>
      </div>

      {!hasUploadedResume && (
        <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-bounce-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-950 uppercase tracking-wide">Action Required: Upload Resume</div>
              <p className="text-xs text-indigo-900 mt-0.5">
                Your dashboard is currently fresh with zero records. Upload your resume to extract skills, compute job readiness, and generate your career roadmap.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('resume-analysis')}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Go to Resume Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Job Readiness */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Job Readiness</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {currentAnalysis.jobReadinessScore}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Target: <span className="font-semibold text-indigo-600">{targetRole.title}</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${currentAnalysis.jobReadinessScore}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Skills Matched */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Skills Matched</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {currentAnalysis.matchedCount}<span className="text-slate-400 text-xl font-normal">/{currentAnalysis.totalRequired}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Verified competencies
          </div>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${currentAnalysis.totalRequired > 0 ? (currentAnalysis.matchedCount / currentAnalysis.totalRequired) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Stat 3: Skills Missing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Skill Gaps</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {currentAnalysis.missingCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span className="font-semibold text-rose-600">{currentAnalysis.highPriorityGaps.length} High Priority</span> items
          </div>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${currentAnalysis.totalRequired > 0 ? (currentAnalysis.missingCount / currentAnalysis.totalRequired) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Stat 4: Learning Progress */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Roadmap Progress</span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {roadmapPct}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {completedSteps} of {totalSteps} weeks completed
          </div>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-violet-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${roadmapPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Overall Job Readiness Gauge Card */}
        <div className="lg:col-span-4 bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between text-center">
          <div className="w-full text-left">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Overall Job Readiness</h2>
            <p className="text-xs text-slate-500">Evaluated from resume NLP &amp; assessments</p>
          </div>

          <div className="my-6 relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="text-slate-100 stroke-current"
                strokeWidth="14"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="text-indigo-600 stroke-current transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {currentAnalysis.jobReadinessScore}%
              </span>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">
                {currentAnalysis.readinessLevel}
              </span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 text-left border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Target: {targetRole.title}</span>
              </div>
              <p className="leading-relaxed">
                {hasUploadedResume
                  ? `Matched ${currentAnalysis.matchedCount} required skills. Focus on high priority gaps to exceed 85% readiness.`
                  : 'Please upload your resume in the Resume Analysis tab to calculate your readiness score and skill gaps.'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab(hasUploadedResume ? 'skill-gap' : 'resume-analysis')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <span>{hasUploadedResume ? 'Explore Skill Gaps' : 'Upload Resume Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Readiness Breakdown Bar Chart Card */}
        <div className="lg:col-span-8 bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Career Role Match Breakdown</h2>
                <p className="text-xs text-slate-500">Comparative alignment across benchmark industry roles</p>
              </div>
              <button
                onClick={() => setActiveTab('career-paths')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View all roles</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Vertical Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-4 border-b border-slate-200 mt-4">
              {roleRankings.slice(0, 6).map((item) => {
                const isSelected = item.role.id === targetRole.id;
                return (
                  <div key={item.role.id} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer" onClick={() => setActiveTab('career-paths')}>
                    <div className="text-xs font-extrabold text-slate-700 mb-1.5 group-hover:text-indigo-600 transition-colors">
                      {item.matchScore}%
                    </div>
                    <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden shadow-inner">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          isSelected
                            ? 'bg-gradient-to-t from-indigo-600 to-violet-600 group-hover:from-indigo-700 group-hover:to-violet-700 shadow-lg'
                            : 'bg-indigo-400 group-hover:bg-indigo-500'
                        }`}
                        style={{ height: `${item.matchScore}%` }}
                      />
                    </div>
                    <div className="w-full text-center mt-2.5">
                      <span className={`block text-[11px] font-semibold truncate ${isSelected ? 'text-indigo-700 font-bold' : 'text-slate-600'}`}>
                        {item.role.title.replace(' Developer', '').replace(' Engineer', '')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block shadow-xs"></span>
                <span className="font-medium text-slate-700">Active Target Role</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-indigo-400 inline-block"></span>
                <span className="font-medium text-slate-700">Alternative Roles</span>
              </div>
            </div>
            <div className="text-slate-700 font-semibold">
              Top Match: <span className="text-indigo-600 font-bold">{roleRankings[0]?.role.title} ({roleRankings[0]?.matchScore}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Missing Skills & Roadmap Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* High Priority Missing Skills Preview */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Priority Skill Gaps for {targetRole.title}</h3>
            </div>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              View All ({currentAnalysis.missingCount})
            </button>
          </div>

          {hasUploadedResume && currentAnalysis.highPriorityGaps.length > 0 ? (
            <div className="space-y-3">
              {currentAnalysis.highPriorityGaps.slice(0, 3).map((gap) => (
                <div
                  key={gap.skillName}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-center justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{gap.skillName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        High Priority
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Required: {gap.requiredProficiency} · Gap: {gap.gapPercentage}% · Est: {gap.estimatedWeeks} wks
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('skill-assessment')}
                      className="text-xs px-3 py-1.5 bg-white border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 rounded-lg text-slate-700 font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Quiz
                    </button>
                    <button
                      onClick={() => setActiveTab('learning-roadmap')}
                      className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      Roadmap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-600">No Resume Analyzed Yet</p>
              <p className="text-[11px] text-slate-400 mt-1 mb-3">Upload your resume to automatically identify skill gaps and priorities.</p>
              <button
                onClick={() => setActiveTab('resume-analysis')}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Resume</span>
              </button>
            </div>
          )}
        </div>

        {/* Current Learning Roadmap Next Action */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Next Learning Roadmap Milestones</h3>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {completedSteps} / {totalSteps} Done
              </span>
            </div>

            <div className="space-y-3">
              {roadmapSteps.slice(0, 2).map((step) => (
                <div
                  key={step.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 transition-all"
                >
                  <div>
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">WEEK {step.week} · {step.skillName}</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{step.title}</div>
                    <div className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {step.practiceTask}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('learning-roadmap')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 flex-shrink-0 pt-1 cursor-pointer"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Enterprise Job Readiness Platform
            </span>
            <button
              onClick={() => setActiveTab('career-report')}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Export Audit Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
