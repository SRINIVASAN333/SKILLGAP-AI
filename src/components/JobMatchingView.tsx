import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GENERATED_JOB_DATABASE, ALL_COMPANIES } from '../data/largeJobDataset';
import { JobRecord } from '../types';
import { JobDetailsModal } from './JobDetailsModal';
import {
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Target,
  Building2,
  MapPin,
  Filter,
  FileText,
  ChevronRight
} from 'lucide-react';

export const JobMatchingView: React.FC = () => {
  const { activeProfile, hasUploadedResume, setActiveTab } = useApp();

  const [activeSection, setActiveSection] = useState<'recommended' | 'targeted'>('recommended');
  const [selectedTargetCompany, setSelectedTargetCompany] = useState<string>('Google');
  const [readinessFilter, setReadinessFilter] = useState<string>('All');
  const [workModeFilter, setWorkModeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'company' | 'role'>('match');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedJobForModal, setSelectedJobForModal] = useState<JobRecord | null>(null);

  // Calculate matching details for a job
  const evaluateJobMatch = (job: JobRecord) => {
    if (!hasUploadedResume || !activeProfile.skills.length) {
      return { matchPct: 0, matched: [], missing: job.requiredSkills, readiness: 'SKILL GAP' as const };
    }
    const candidateSkills = new Set(activeProfile.skills.map(s => s.normalizedName));
    const matched = job.requiredSkills.filter(s => candidateSkills.has(s.toLowerCase()));
    const missing = job.requiredSkills.filter(s => !candidateSkills.has(s.toLowerCase()));
    const matchPct = job.requiredSkills.length > 0 
      ? Math.round((matched.length / job.requiredSkills.length) * 100) 
      : 0;

    let readiness: 'READY' | 'NEARLY READY' | 'SKILL GAP' | 'NOT ELIGIBLE' = 'SKILL GAP';
    if (matchPct >= 80) readiness = 'READY';
    else if (matchPct >= 60) readiness = 'NEARLY READY';
    else if (matchPct >= 40) readiness = 'SKILL GAP';
    else readiness = 'NOT ELIGIBLE';

    return { matchPct, matched, missing, readiness };
  };

  const evaluatedJobs = GENERATED_JOB_DATABASE.map(job => ({
    ...job,
    eval: evaluateJobMatch(job)
  })).sort((a, b) => {
    if (sortBy === 'match') return b.eval.matchPct - a.eval.matchPct;
    if (sortBy === 'company') return a.companyName.localeCompare(b.companyName);
    return a.role.localeCompare(b.role);
  });

  const filteredRecommendedJobs = evaluatedJobs.filter(job => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesReadiness = readinessFilter === 'All' || job.eval.readiness === readinessFilter;
    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    return matchesSearch && matchesReadiness && matchesMode;
  });

  const targetedCompanyJobs = evaluatedJobs.filter(j => j.companyName.toLowerCase() === selectedTargetCompany.toLowerCase());
  const avgTargetMatch = targetedCompanyJobs.length > 0
    ? Math.round(targetedCompanyJobs.reduce((acc, j) => acc + j.eval.matchPct, 0) / targetedCompanyJobs.length)
    : 0;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Resume-to-Job Matching Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Job Matching &amp; Targeted Companies
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Continuous AI analysis comparing your resume competencies against 330+ open roles across 55+ tech employers.
          </p>
        </div>

        {!hasUploadedResume && (
          <div className="bg-amber-500/20 border border-amber-400/30 text-amber-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Upload resume to activate personalized job matching.</span>
          </div>
        )}
      </div>

      {/* Subtab Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSection('recommended')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'recommended'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Section A — Recommended Jobs ({filteredRecommendedJobs.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('targeted')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSection === 'targeted'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Section B — Target Companies Analysis</span>
        </button>
      </div>

      {!hasUploadedResume ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Resume Upload Required</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Personalized job matching, readiness scores, and skill gap detection require an analyzed candidate resume. Please upload your resume in the Resume Analysis section.
          </p>
          <button
            onClick={() => setActiveTab('resume-analysis')}
            className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Go to Resume Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {activeSection === 'recommended' && (
            <div className="space-y-6">
              {/* Filters & Search Controls */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recommended jobs..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-2xs font-medium"
                  />

                  <select
                    value={readinessFilter}
                    onChange={(e) => setReadinessFilter(e.target.value)}
                    className="px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium cursor-pointer shadow-2xs"
                  >
                    <option value="All">All Readiness Status</option>
                    <option value="READY">READY</option>
                    <option value="NEARLY READY">NEARLY READY</option>
                    <option value="SKILL GAP">SKILL GAP</option>
                  </select>

                  <select
                    value={workModeFilter}
                    onChange={(e) => setWorkModeFilter(e.target.value)}
                    className="px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium cursor-pointer shadow-2xs"
                  >
                    <option value="All">All Work Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3.5 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer shadow-2xs"
                  >
                    <option value="match">Sort by: Highest Match %</option>
                    <option value="company">Sort by: Company (A-Z)</option>
                    <option value="role">Sort by: Role Title</option>
                  </select>
                </div>
              </div>

              {/* Modern Job Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommendedJobs.slice(0, 24).map(job => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobForModal(job)}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                          <img
                            src={job.companyLogo}
                            alt={job.companyName}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                          job.eval.matchPct >= 80 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          job.eval.matchPct >= 60 ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          Match: {job.eval.matchPct}%
                        </span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{job.companyName}</div>
                        <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">{job.role}</h3>
                        <div className="text-xs font-bold text-slate-700 mt-1">{job.salary !== '—' ? job.salary : job.stipend}</div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                          <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                        </span>
                        <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {job.eval.readiness}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">Req: {job.experienceMin}–{job.experienceMax} yrs</span>
                      <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'targeted' && (
            <div className="space-y-6">
              {/* Company Selector Grid */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select a Target Company ({ALL_COMPANIES.length} available)
                </h3>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {ALL_COMPANIES.map(comp => (
                    <button
                      key={comp}
                      onClick={() => setSelectedTargetCompany(comp)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTargetCompany === comp
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Company Dashboard View */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white text-xl font-black flex items-center justify-center shadow-lg">
                      {selectedTargetCompany.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">{selectedTargetCompany} — Talent Alignment Dashboard</h2>
                      <p className="text-xs text-slate-500">
                        Detailed resume matching against {targetedCompanyJobs.length} active roles at {selectedTargetCompany}.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 px-5 py-3 rounded-2xl text-center">
                    <div className="text-[10px] font-bold text-indigo-600 uppercase">Profile Match</div>
                    <div className="text-xl font-black text-indigo-700">{avgTargetMatch}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Roles Matching Your Profile at {selectedTargetCompany}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {targetedCompanyJobs.map(job => (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobForModal(job)}
                        className="p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-2xs transition-all cursor-pointer space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{job.role}</h4>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            job.eval.matchPct >= 80 ? 'bg-emerald-100 text-emerald-800' : job.eval.matchPct >= 60 ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {job.eval.matchPct}% Match
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">{job.location} · {job.salary !== '—' ? job.salary : job.stipend}</div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <span className="text-[11px] font-semibold text-slate-700">Readiness: <span className="text-indigo-600">{job.eval.readiness}</span></span>
                          <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">Analyze <ChevronRight className="w-3.5 h-3.5" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations for Target Company */}
                <div className="p-6 bg-indigo-950 text-indigo-100 rounded-2xl space-y-4 shadow-lg">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Recommended Skill Assessments &amp; Learning Roadmap</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Based on skill gaps detected across {selectedTargetCompany} postings, we recommend taking our advanced technical assessments to verify your skills and boost your match percentage.
                  </p>
                  <button
                    onClick={() => setActiveTab('skill-assessment')}
                    className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Take Skill Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Job Details Modal Popup */}
      {selectedJobForModal && (
        <JobDetailsModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}

    </div>
  );
};
