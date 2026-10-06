import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GENERATED_JOB_DATABASE, ALL_COMPANIES, LOCATIONS_LIST } from '../data/largeJobDataset';
import { JobRecord } from '../types';
import { JobDetailsModal } from './JobDetailsModal';
import {
  Database,
  Search,
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const JobDatabaseView: React.FC = () => {
  const { activeProfile, hasUploadedResume } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedReadiness, setSelectedReadiness] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'company' | 'role'>('match');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [selectedJobForModal, setSelectedJobForModal] = useState<JobRecord | null>(null);

  // Calculate match helper
  const evaluateMatch = (job: JobRecord) => {
    if (!hasUploadedResume || !activeProfile.skills.length) {
      return { matchPct: 0, readiness: 'SKILL GAP' as const };
    }
    const candidateSkillMap = new Map(activeProfile.skills.map(s => [s.normalizedName, s]));
    const matched = job.requiredSkills.filter(s => candidateSkillMap.has(s.toLowerCase()));
    const matchPct = job.requiredSkills.length > 0 
      ? Math.round((matched.length / job.requiredSkills.length) * 100) 
      : 0;

    let readiness: 'READY' | 'NEARLY READY' | 'SKILL GAP' | 'NOT ELIGIBLE' = 'SKILL GAP';
    if (matchPct >= 80) readiness = 'READY';
    else if (matchPct >= 60) readiness = 'NEARLY READY';
    else if (matchPct >= 40) readiness = 'SKILL GAP';
    else readiness = 'NOT ELIGIBLE';

    return { matchPct, readiness };
  };

  // Filter & sort jobs
  const processedJobs = GENERATED_JOB_DATABASE.map(job => ({
    ...job,
    eval: evaluateMatch(job)
  })).filter(job => {
    const query = searchQuery.toLowerCase();
    const matchQuery = job.companyName.toLowerCase().includes(query) ||
                       job.role.toLowerCase().includes(query) ||
                       job.requiredSkills.some(s => s.toLowerCase().includes(query));
    const matchLoc = selectedLocation === 'All' || job.location === selectedLocation;
    const matchType = selectedJobType === 'All' || job.jobType === selectedJobType;
    const matchMode = selectedWorkMode === 'All' || job.workMode === selectedWorkMode;
    const matchReadiness = selectedReadiness === 'All' || job.eval.readiness === selectedReadiness;

    return matchQuery && matchLoc && matchType && matchMode && matchReadiness;
  }).sort((a, b) => {
    if (sortBy === 'company') return a.companyName.localeCompare(b.companyName);
    if (sortBy === 'role') return a.role.localeCompare(b.role);
    return b.eval.matchPct - a.eval.matchPct;
  });

  const totalPages = Math.ceil(processedJobs.length / itemsPerPage) || 1;
  const paginatedJobs = processedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>Big Data Enterprise Job Discovery</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Job Discovery Database
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore {GENERATED_JOB_DATABASE.length}+ curated job records across {ALL_COMPANIES.length}+ top-tier technology employers. Click any card for detailed skill gap analysis.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-indigo-500/30 text-center">
          <div>
            <div className="text-2xl font-black text-indigo-400">{GENERATED_JOB_DATABASE.length}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Jobs</div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <div className="text-2xl font-black text-violet-400">{ALL_COMPANIES.length}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Companies</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search jobs, companies, or skills..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-2xs font-medium"
            />
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
            className="px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium cursor-pointer shadow-2xs"
          >
            <option value="All">All Locations</option>
            {LOCATIONS_LIST.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>

          <select
            value={selectedJobType}
            onChange={(e) => { setSelectedJobType(e.target.value); setCurrentPage(1); }}
            className="px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium cursor-pointer shadow-2xs"
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>

          <select
            value={selectedWorkMode}
            onChange={(e) => { setSelectedWorkMode(e.target.value); setCurrentPage(1); }}
            className="px-3 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium cursor-pointer shadow-2xs"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer shadow-2xs"
          >
            <option value="match">Sort by: Match %</option>
            <option value="company">Sort by: Company (A-Z)</option>
            <option value="role">Sort by: Role Title</option>
          </select>
        </div>

        {/* Readiness Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Readiness Status:</span>
          </span>
          {['All', 'READY', 'NEARLY READY', 'SKILL GAP'].map(status => (
            <button
              key={status}
              onClick={() => { setSelectedReadiness(status); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedReadiness === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Card-Based Job Discovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
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
                  {hasUploadedResume ? (
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                      job.eval.matchPct >= 85 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      job.eval.matchPct >= 60 ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      Match: {job.eval.matchPct}%
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-2.5 py-1 rounded-xl">
                      Upload Resume
                    </span>
                  )}
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
                  <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Briefcase className="w-3 h-3 text-slate-400" /> {job.jobType}
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
          ))
        ) : (
          <div className="col-span-full py-16 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 space-y-2">
            <p className="font-bold text-slate-800">No matching jobs found</p>
            <p className="text-xs">Try adjusting your search queries or filter selections.</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span> ({processedJobs.length} matching jobs)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-slate-50 border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-slate-50 border border-slate-300 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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
