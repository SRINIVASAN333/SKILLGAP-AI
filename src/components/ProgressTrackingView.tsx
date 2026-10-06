import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  CheckCircle2,
  Calendar,
  Award,
  ArrowUpRight,
  Clock,
  Target,
  FileCheck
} from 'lucide-react';

export const ProgressTrackingView: React.FC = () => {
  const {
    activeProfile,
    targetRole,
    currentAnalysis,
    progressHistory,
    roadmapSteps,
    assessmentSubmissions,
    setActiveTab
  } = useApp();

  const completedRoadmapCount = roadmapSteps.filter(s => s.completed).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Progress Tracking</h2>
        <p className="text-xs text-slate-500">
          Monitor your skill acquisition velocity, readiness score evolution, and learning milestones over time.
        </p>
      </div>

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Current Job Readiness
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{currentAnalysis.jobReadinessScore}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +21% since baseline
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Target: {targetRole.title}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Skills Verified
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{activeProfile.skills.length}</span>
            <span className="text-xs text-slate-500">
              ({currentAnalysis.matchedCount} matching target role)
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {assessmentSubmissions.length} verified via assessments
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Roadmap Milestones Done
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{completedRoadmapCount}</span>
            <span className="text-xs text-slate-500">of {roadmapSteps.length} weeks</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {Math.round((completedRoadmapCount / roadmapSteps.length) * 100)}% completion rate
          </div>
        </div>
      </div>

      {/* Historical Trend Chart (CSS SVG) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Job Readiness Score Progression
            </h3>
            <p className="text-xs text-slate-500">
              Tracked improvements from initial resume upload through verified learning milestones
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            <span className="text-slate-600 font-medium">Readiness Score</span>
          </div>
        </div>

        {/* Visual Line / Step Chart */}
        <div className="h-44 pt-6 px-4 flex items-end justify-between relative border-b border-slate-200">
          {progressHistory.map((item, index) => {
            const heightPercent = item.jobReadinessScore;
            return (
              <div key={item.id} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] font-semibold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                  {item.jobReadinessScore}% on {item.date}
                </div>

                <div className="text-xs font-bold text-indigo-600 mb-1">
                  {item.jobReadinessScore}%
                </div>

                <div className="w-12 bg-indigo-50 border-t-2 border-indigo-600 flex items-end justify-center rounded-t" style={{ height: `${heightPercent}%` }}>
                  <div className="w-4 bg-indigo-600/80 rounded-t h-full"></div>
                </div>

                <div className="text-[11px] text-slate-500 mt-2 font-mono">
                  {item.date.slice(5)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Activity Timeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Career Development Milestone Timeline
        </h3>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
          {progressHistory.map((entry) => (
            <div key={entry.id} className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100" />
              <div className="flex-1 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">
                    Job Readiness reached {entry.jobReadinessScore}%
                  </span>
                  <span className="text-slate-400 font-mono">{entry.date}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {entry.notes}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                  <span>Matched Skills: <b>{entry.skillsMatchedCount} / {entry.skillsTotalCount}</b></span>
                  <span>·</span>
                  <span>Skill Gap: <b>{entry.skillGapPercentage}%</b></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
