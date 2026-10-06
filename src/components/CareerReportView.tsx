import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Printer,
  Download,
  Award,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Calendar,
  User,
  Share2,
  FileText,
  ShieldCheck
} from 'lucide-react';

export const CareerReportView: React.FC = () => {
  const {
    activeProfile,
    targetRole,
    currentAnalysis,
    roadmapSteps,
    assessmentSubmissions
  } = useApp();

  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      platform: 'SkillGap AI Enterprise Career Intelligence Platform',
      reportTitle: 'Official Career Readiness Audit Report',
      candidate: {
        name: activeProfile.name,
        candidateId: activeProfile.rollNumber,
        department: activeProfile.department,
        targetRole: targetRole.title
      },
      auditDate: new Date().toISOString().split('T')[0],
      analysis: {
        jobReadinessScore: `${currentAnalysis.jobReadinessScore}%`,
        readinessLevel: currentAnalysis.readinessLevel,
        skillGapPercentage: `${currentAnalysis.skillGapPercentage}%`,
        matchedSkillsCount: currentAnalysis.matchedCount,
        missingSkillsCount: currentAnalysis.missingCount,
        matchedSkills: currentAnalysis.matchedSkills.map(s => s.name),
        highPriorityGaps: currentAnalysis.highPriorityGaps.map(s => s.skillName),
        mediumPriorityGaps: currentAnalysis.mediumPriorityGaps.map(s => s.skillName)
      },
      roadmapProgress: {
        completedWeeks: roadmapSteps.filter(s => s.completed).length,
        totalWeeks: roadmapSteps.length,
        completionRate: `${Math.round((roadmapSteps.filter(s => s.completed).length / roadmapSteps.length) * 100)}%`
      },
      verifiedAssessments: assessmentSubmissions
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillGap_AI_Audit_Report_${activeProfile.rollNumber}_${targetRole.title.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Official Career Readiness Audit Report</h2>
          <p className="text-xs text-slate-500">
            Comprehensive verified audit report formatted for professional evaluations and placement interviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="py-2 px-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div
        ref={reportRef}
        className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-slate-900 print:border-none print:shadow-none print:p-0"
      >
        {/* Enterprise Header Banner */}
        <div className="text-center border-b-2 border-slate-900 pb-6 space-y-1">
          <div className="flex items-center justify-center gap-2 text-indigo-700 font-black text-sm uppercase tracking-widest mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span>SkillGap AI Enterprise Career Intelligence Platform</span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Natural Language Processing &amp; Automated Candidate Benchmark Evaluation
          </p>
          <div className="pt-3">
            <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">
              CAREER READINESS &amp; SKILL GAP AUDIT REPORT
            </h1>
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mt-0.5">
              Evaluation &amp; Talent Analytics Board
            </p>
          </div>
        </div>

        {/* Candidate & Target Information Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Candidate Name</span>
            <span className="font-bold text-slate-900 text-sm">{activeProfile.name}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Candidate ID</span>
            <span className="font-bold text-slate-900 font-mono text-sm">{activeProfile.rollNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Target Career Role</span>
            <span className="font-bold text-indigo-600 text-sm">{targetRole.title}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Audit Date</span>
            <span className="font-bold text-slate-900 font-mono text-sm">{new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>

        {/* Executive Summary Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Job Readiness Score</div>
            <div className="text-3xl font-black text-indigo-600 mt-1">{currentAnalysis.jobReadinessScore}%</div>
            <div className="text-xs font-semibold text-slate-700 mt-0.5">{currentAnalysis.readinessLevel}</div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skill Gap Ratio</div>
            <div className="text-3xl font-black text-rose-600 mt-1">{currentAnalysis.skillGapPercentage}%</div>
            <div className="text-xs text-slate-600 mt-0.5">{currentAnalysis.missingCount} Missing / {currentAnalysis.totalRequired} Required</div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Roadmap Velocity</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">
              {Math.round((roadmapSteps.filter(s => s.completed).length / roadmapSteps.length) * 100)}%
            </div>
            <div className="text-xs text-slate-600 mt-0.5">{roadmapSteps.filter(s => s.completed).length} of {roadmapSteps.length} Milestones Done</div>
          </div>
        </div>

        {/* Matched Competencies Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>1. Verified &amp; Matched Competencies ({currentAnalysis.matchedCount})</span>
          </h3>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex flex-wrap gap-2">
              {currentAnalysis.matchedSkills.map(skill => (
                <div key={skill.name} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs">
                  <span className="font-bold text-slate-800">{skill.name}</span>
                  <span className="text-slate-400 text-[10px] ml-1.5">({skill.proficiency} · {skill.source})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Skill Gaps & Actionable Prioritization */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>2. Priority Skill Gaps to Bridge ({currentAnalysis.missingCount})</span>
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Missing Skill</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Target Level</th>
                  <th className="py-2.5 px-3">Est. Duration</th>
                  <th className="py-2.5 px-3">Curriculum Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentAnalysis.missingSkills.map(gap => (
                  <tr key={gap.skillName}>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{gap.skillName}</td>
                    <td className="py-2.5 px-3">
                      <span className={`font-semibold ${gap.priority === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {gap.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{gap.requiredProficiency}</td>
                    <td className="py-2.5 px-3 text-slate-600">{gap.estimatedWeeks} weeks</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">{gap.importanceDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Skill Assessments Results */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>3. Completed Skill Assessments &amp; Proficiency Verifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {assessmentSubmissions.map(sub => (
              <div key={sub.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{sub.skill} Assessment</div>
                  <div className="text-slate-500 text-[11px]">{sub.difficulty} Level · Completed {sub.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-600">{sub.score}%</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">{sub.proficiencyResult}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Management Sign-Off */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs text-center">
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
              Chief Technology Officer
            </div>
            <div className="text-slate-500 text-[11px]">Engineering Leadership Board</div>
            <div className="text-slate-400 text-[10px]">SkillGap AI Enterprise Verification</div>
          </div>
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
              Head of Talent Development
            </div>
            <div className="text-slate-500 text-[11px]">Talent Intelligence &amp; Recruitment</div>
            <div className="text-slate-400 text-[10px]">SkillGap AI Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
};
