import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  Code2,
  Briefcase,
  Sparkles,
  ArrowRight,
  Clock,
  Plus,
  CheckSquare
} from 'lucide-react';

export const LearningRoadmapView: React.FC = () => {
  const {
    targetRole,
    roadmapSteps,
    toggleRoadmapStep,
    setActiveTab,
    activeProfile
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const completedCount = roadmapSteps.filter(s => s.completed).length;
  const totalCount = roadmapSteps.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredSteps = roadmapSteps.filter(step => {
    if (filter === 'pending') return !step.completed;
    if (filter === 'completed') return step.completed;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header matching Demo screenshot Page 50 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personalized Learning Roadmap</h2>
        <p className="text-xs text-slate-500">
          Generated from your identified skill gaps for <span className="font-semibold text-slate-800">{targetRole.title}</span>.
        </p>
      </div>

      {/* Roadmap Completion Bar Card matching Demo Screenshot */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Roadmap completion</span>
            <span className="text-xs font-semibold text-slate-500">
              ({completedCount} of {totalCount} completed)
            </span>
          </div>
          <span className="text-base font-extrabold text-indigo-600">
            {completionPercentage}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Weeks ({totalCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              In Progress ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
                filter === 'completed'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="text-xs text-slate-500">
            Next Milestone: <span className="font-semibold text-slate-800">Week 3 REST API</span>
          </div>
        </div>
      </div>

      {/* Week-by-Week Milestone Cards matching screenshot Page 50 */}
      <div className="space-y-4">
        {filteredSteps.map(step => {
          return (
            <div
              key={step.id}
              className={`bg-white p-5 rounded-xl border transition-all ${
                step.completed
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Top Row: Week Badge, Title, and Mark Complete Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    Week {step.week}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  {step.completed && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Completed {step.completedAt ? `· ${step.completedAt}` : ''}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRoadmapStep(step.id)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      step.completed
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {step.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Mark complete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Concepts Section */}
              <div className="py-3 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 mb-1">Key Concepts:</div>
                <p className="text-slate-600 leading-relaxed">
                  {step.concepts.join(' · ')}
                </p>
              </div>

              {/* Recommended Learning Resources */}
              <div className="py-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Recommended Learning Resources:
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg text-xs font-medium text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{res.title}</span>
                      <span className="text-[10px] text-slate-400">({res.provider})</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Practice Task & Project Suggestions */}
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                    Practice Task:
                  </span>
                  <p className="text-slate-600">{step.practiceTask}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    Project Suggestion:
                  </span>
                  <p className="text-slate-600">{step.projectSuggestion}</p>
                </div>
              </div>

              {/* Bottom Quick Test CTA */}
              <div className="mt-3 flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500">
                  Estimated dedication: <span className="font-semibold text-slate-700">{step.estimatedHours} hrs</span>
                </span>
                <button
                  onClick={() => setActiveTab('skill-assessment')}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Verify {step.skillName} Knowledge</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
