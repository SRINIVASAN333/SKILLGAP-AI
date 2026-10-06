import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Sliders,
  DollarSign
} from 'lucide-react';
import { rankJobRolesForCandidate, calculateSkillGapAndReadiness } from '../services/nlpService';
import { JobRole } from '../types';

export const CareerPathsView: React.FC = () => {
  const { activeProfile, jobRoles, targetRole, setTargetRoleId, setActiveTab } = useApp();

  const [compareRoleIds, setCompareRoleIds] = useState<string[]>([
    'role-full-stack',
    'role-software-engineer'
  ]);
  const [showComparison, setShowComparison] = useState(false);

  const rankedRoles = rankJobRolesForCandidate(activeProfile, jobRoles);

  const toggleCompare = (roleId: string) => {
    setCompareRoleIds(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), roleId];
      }
      return [...prev, roleId];
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Career Recommendations</h2>
          <p className="text-xs text-slate-500">
            Ranked by how closely your current resume matches each role across industry benchmarks.
          </p>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className={`py-2 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors border ${
            showComparison
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showComparison ? 'Hide Role Comparison' : 'Compare Selected Roles (2-3)'}</span>
        </button>
      </div>

      {/* Side-by-Side Role Comparator (Chapter 3.3.7) */}
      {showComparison && (
        <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Multi-Role Requirement & Feasibility Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Direct side-by-side analysis to help decide the most strategic career pathway.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600">
              Comparing {compareRoleIds.length} roles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareRoleIds.map(rId => {
              const role = jobRoles.find(r => r.id === rId);
              if (!role) return null;
              const analysis = calculateSkillGapAndReadiness(activeProfile, role);

              return (
                <div key={role.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{role.title}</span>
                    <span className="text-xs font-extrabold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {analysis.jobReadinessScore}%
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Salary: <span className="font-semibold text-slate-700">{role.averageSalaryRange}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Required Skills:</span>
                      <span className="font-bold text-slate-800">{analysis.totalRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Matched Skills:</span>
                      <span className="font-bold text-emerald-600">{analysis.matchedCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Missing Gaps:</span>
                      <span className="font-bold text-rose-600">{analysis.missingCount}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">Key Gaps:</span>
                    <div className="flex flex-wrap gap-1">
                      {analysis.missingSkills.slice(0, 4).map(s => (
                        <span key={s.skillName} className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                          {s.skillName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTargetRoleId(role.id);
                      setActiveTab('skill-gap');
                    }}
                    className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded text-xs font-semibold transition-colors"
                  >
                    Select as Target Role
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Career Recommendations Grid matching Demo screenshot Page 50 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rankedRoles.map(({ role, matchScore, matchedCount, missingCount, isBestFit }) => {
          const isCurrentTarget = role.id === targetRole.id;
          const isComparing = compareRoleIds.includes(role.id);
          const analysis = calculateSkillGapAndReadiness(activeProfile, role);

          return (
            <div
              key={role.id}
              className={`bg-white p-5 rounded-xl border shadow-sm transition-all space-y-4 ${
                isCurrentTarget
                  ? 'border-indigo-600 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {role.title}
                  </h3>
                  {isBestFit && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Best Fit
                    </span>
                  )}
                  {isCurrentTarget && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      Active Target
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-slate-900">
                    {matchScore}%
                  </span>
                </div>
              </div>

              {/* Counts Bar */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">{role.requiredSkills.length}</span>
                  <span className="text-slate-500">Total</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{matchedCount} Matched</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{missingCount} Missing</span>
                </div>
              </div>

              {/* Visual Match Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    matchScore >= 60 ? 'bg-emerald-500' : matchScore >= 50 ? 'bg-indigo-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${matchScore}%` }}
                />
              </div>

              {/* Skills preview tags matching Demo image Page 50 */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-medium text-slate-500">Required Skills Snapshot:</div>
                <div className="flex flex-wrap gap-1.5">
                  {role.requiredSkills.slice(0, 7).map(req => {
                    const isMatched = analysis.matchedSkills.some(
                      s => s.normalizedName.toLowerCase() === req.normalizedName.toLowerCase()
                    );
                    return (
                      <span
                        key={req.name}
                        className={`text-xs px-2 py-0.5 rounded font-medium border ${
                          isMatched
                            ? 'bg-slate-50 text-slate-800 border-slate-200'
                            : 'bg-rose-50/70 text-rose-700 border-rose-200/80'
                        }`}
                      >
                        {req.name}
                      </span>
                    );
                  })}
                  {role.requiredSkills.length > 7 && (
                    <span className="text-xs text-slate-400 py-0.5 px-1">
                      +{role.requiredSkills.length - 7} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleCompare(role.id)}
                  className={`text-xs font-semibold transition-colors ${
                    isComparing ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isComparing ? '✓ Selected for Compare' : '+ Add to Compare'}
                </button>

                <div className="flex items-center gap-2">
                  {!isCurrentTarget && (
                    <button
                      onClick={() => {
                        setTargetRoleId(role.id);
                      }}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Set as Target
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setTargetRoleId(role.id);
                      setActiveTab('skill-gap');
                    }}
                    className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                  >
                    <span>View Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
