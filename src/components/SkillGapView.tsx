import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Flame,
  Clock,
  BookOpen,
  CheckSquare,
  ArrowRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { PriorityLevel, SkillGapItem } from '../types';

export const SkillGapView: React.FC = () => {
  const {
    targetRole,
    currentAnalysis,
    setActiveTab,
    addRoadmapStepForSkill,
    roadmapSteps
  } = useApp();

  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<'All' | PriorityLevel>('All');

  const filteredGaps = currentAnalysis.missingSkills.filter(gap => {
    if (selectedPriorityFilter === 'All') return true;
    return gap.priority === selectedPriorityFilter;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in duration-300">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Priority-Ranked Skill Gap Analysis</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Skill Gaps for {targetRole.title}
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Identified missing competencies required for industry readiness, prioritized by learning urgency and duration.
          </p>
        </div>
      </div>

      {/* 3 Priority Cards Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          onClick={() => setSelectedPriorityFilter(selectedPriorityFilter === 'High' ? 'All' : 'High')}
          className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedPriorityFilter === 'High'
              ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/30 shadow-md'
              : 'border-slate-200 bg-white hover:border-rose-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> High Priority Gaps
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {currentAnalysis.highPriorityGaps.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Critical for role eligibility
          </div>
        </button>

        <button
          onClick={() => setSelectedPriorityFilter(selectedPriorityFilter === 'Medium' ? 'All' : 'Medium')}
          className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedPriorityFilter === 'Medium'
              ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-md'
              : 'border-slate-200 bg-white hover:border-amber-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Medium Priority Gaps
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {currentAnalysis.mediumPriorityGaps.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Next in preparation sequence
          </div>
        </button>

        <button
          onClick={() => setSelectedPriorityFilter(selectedPriorityFilter === 'Low' ? 'All' : 'Low')}
          className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedPriorityFilter === 'Low'
              ? 'border-slate-500 bg-slate-100 ring-2 ring-slate-500/30 shadow-md'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" /> Low Priority Gaps
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {currentAnalysis.lowPriorityGaps.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Nice-to-have competencies
          </div>
        </button>
      </div>

      {/* Missing Skills Cards */}
      <div className="space-y-4">
        {filteredGaps.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No skill gaps in this filter category!</h3>
            <p className="text-xs text-slate-500 mt-1">
              You possess verified alignment with all skills in this category.
            </p>
          </div>
        ) : (
          filteredGaps.map((gap: SkillGapItem) => {
            const isAlreadyInRoadmap = roadmapSteps.some(
              s => s.skillName.toLowerCase() === gap.skillName.toLowerCase()
            );

            const currentVal = gap.priority === 'High' ? 10 : 25;
            const requiredVal = gap.priority === 'High' ? 85 : 75;
            const gapVal = requiredVal - currentVal;

            return (
              <div
                key={gap.skillName}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-slate-900">{gap.skillName}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      gap.priority === 'High'
                        ? 'text-rose-700 bg-rose-50 border border-rose-200'
                        : gap.priority === 'Medium'
                        ? 'text-amber-700 bg-amber-50 border border-amber-200'
                        : 'text-slate-700 bg-slate-100 border border-slate-200'
                    }`}>
                      {gap.priority} priority
                    </span>
                    <span className="text-xs text-slate-400 font-medium">· {gap.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Est. learning: {gap.estimatedWeeks} weeks</span>
                  </div>
                </div>

                {/* Visual Gap Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Current: {currentVal}%</span>
                    <span className="text-indigo-600 font-bold">Gap: {gapVal}%</span>
                    <span>Required: {requiredVal}%</span>
                  </div>

                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex relative shadow-inner">
                    <div
                      className="bg-slate-400 h-full rounded-l-full"
                      style={{ width: `${currentVal}%` }}
                    />
                    <div
                      className="bg-rose-500 h-full"
                      style={{ width: `${gapVal}%` }}
                    />
                    <div
                      className="bg-slate-200 h-full flex-1"
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {gap.importanceDescription}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">
                    Target Proficiency: <span className="font-bold text-slate-800">{gap.requiredProficiency}</span>
                  </span>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        addRoadmapStepForSkill(gap.skillName);
                        setActiveTab('learning-roadmap');
                      }}
                      className={`text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isAlreadyInRoadmap
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isAlreadyInRoadmap ? 'View Roadmap' : 'Add to Roadmap'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('skill-assessment')}
                      className="text-xs px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Take Assessment</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
