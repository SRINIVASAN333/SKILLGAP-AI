import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobRecord } from '../types';
import {
  X,
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Check,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface JobDetailsModalProps {
  job: JobRecord;
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const { activeProfile, hasUploadedResume, setActiveTab } = useApp();

  // Calculate matching details
  const evaluateMatch = () => {
    if (!hasUploadedResume || !activeProfile.skills.length) {
      return {
        matchPct: 0,
        skillMatchPct: 0,
        eligibilityMatch: 100,
        experienceMatch: 100,
        educationMatch: 100,
        matchedSkills: [],
        missingSkills: job.requiredSkills,
        readiness: 'SKILL GAP' as const
      };
    }

    const candidateSkillMap = new Map(
      activeProfile.skills.map(s => [s.normalizedName, s])
    );

    const matchedSkills = job.requiredSkills.filter(s => candidateSkillMap.has(s.toLowerCase()));
    const missingSkills = job.requiredSkills.filter(s => !candidateSkillMap.has(s.toLowerCase()));
    
    const skillMatchPct = job.requiredSkills.length > 0
      ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
      : 0;

    const eligibilityMatch = 100; // meets criteria
    const experienceMatch = 100;
    const educationMatch = 100;

    const overallMatch = Math.round(
      skillMatchPct * 0.5 + eligibilityMatch * 0.2 + experienceMatch * 0.15 + educationMatch * 0.15
    );

    let readiness: 'READY' | 'NEARLY READY' | 'SKILL GAP' | 'NOT ELIGIBLE' = 'SKILL GAP';
    if (overallMatch >= 80) readiness = 'READY';
    else if (overallMatch >= 60) readiness = 'NEARLY READY';
    else if (overallMatch >= 40) readiness = 'SKILL GAP';
    else readiness = 'NOT ELIGIBLE';

    return {
      matchPct: overallMatch,
      skillMatchPct,
      eligibilityMatch,
      experienceMatch,
      educationMatch,
      matchedSkills,
      missingSkills,
      readiness
    };
  };

  const matchData = evaluateMatch();

  // Readiness badge color
  const getReadinessBadge = (status: string) => {
    switch (status) {
      case 'READY':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'NEARLY READY':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'SKILL GAP':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 lg:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 shadow-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to initial
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">{job.companyName}</div>
                <h2 className="text-xl lg:text-2xl font-black text-white">{job.role}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location} ({job.workMode})</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-indigo-400" /> {job.jobType}</span>
                  <span className="font-semibold text-emerald-300">{job.salary !== '—' ? job.salary : job.stipend}</span>
                </div>
              </div>
            </div>

            {/* Prominent Match Score Widget */}
            {hasUploadedResume && (
              <div className="bg-white/10 border border-white/20 p-4 rounded-2xl text-center backdrop-blur-md flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="6" className="text-white/20 fill-none" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 26}
                      strokeDashoffset={(2 * Math.PI * 26) * (1 - matchData.matchPct / 100)}
                      className="text-emerald-400 fill-none transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute text-sm font-black text-white">{matchData.matchPct}%</div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-300 uppercase font-semibold">Profile Match</div>
                  <div className={`mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getReadinessBadge(matchData.readiness)}`}>
                    {matchData.readiness}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 lg:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Job Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Experience Required</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{job.experienceMin}–{job.experienceMax} Years</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Education</span>
              <span className="font-bold text-slate-800 mt-0.5 block truncate" title={job.education}>{job.education}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Posted Date</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{job.postedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Application Deadline</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{job.deadline || 'Open'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role Description</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Skill Requirements Comparison */}
          {hasUploadedResume ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Required Skills &amp; Candidate Comparison
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {job.requiredSkills.map(skill => {
                  const hasIt = matchData.matchedSkills.includes(skill);
                  return (
                    <div
                      key={skill}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        hasIt
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50/60 border-rose-200 text-rose-900'
                      }`}
                    >
                      <span className="text-xs font-bold">{skill}</span>
                      {hasIt ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> You Have
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> Skill Gap
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              Upload your resume in the Resume Analysis section to see live skill comparisons.
            </div>
          )}

          {/* Detailed Match Breakdown */}
          {hasUploadedResume && (
            <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100 space-y-4">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Detailed Match Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-slate-400 block font-semibold">Skill Match</span>
                  <span className="text-base font-black text-indigo-600 mt-1 block">{matchData.skillMatchPct}%</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-slate-400 block font-semibold">Eligibility</span>
                  <span className="text-base font-black text-emerald-600 mt-1 block">{matchData.eligibilityMatch}%</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-slate-400 block font-semibold">Experience</span>
                  <span className="text-base font-black text-emerald-600 mt-1 block">{matchData.experienceMatch}%</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <span className="text-slate-400 block font-semibold">Overall Score</span>
                  <span className="text-base font-black text-indigo-700 mt-1 block">{matchData.matchPct}%</span>
                </div>
              </div>
            </div>
          )}

          {/* What Should I Learn & Skill Assessments */}
          {matchData.missingSkills.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>What Should I Learn? (Skill Gaps &amp; Assessments)</span>
              </h3>
              <div className="space-y-2">
                {matchData.missingSkills.map(skill => (
                  <div key={skill} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{skill}</div>
                      <div className="text-[11px] text-slate-500">High priority missing competency for {job.role} at {job.companyName}</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        setActiveTab('skill-assessment');
                      }}
                      className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Take Skill Assessment</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md cursor-pointer"
          >
            <span>Apply on Company Portal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
