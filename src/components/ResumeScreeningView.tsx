import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  ShieldCheck,
  Layers,
  Copy,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  BookOpen
} from 'lucide-react';

interface CandidateProfileData {
  id: string;
  filename: string;
  candidateName: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: { name: string; category: string; proficiency: string }[];
  experience: { title: string; company: string; duration: string; responsibilities: string[]; technologies: string[] }[];
  education: { degree: string; institution: string; field: string; year: string }[];
  projects: { name: string; description: string; technologies: string[] }[];
  certifications: string[];
  matchingSkills: string[];
  missingSkills: string[];
  additionalSkills?: string[];
  atsScore: number;
  atsBreakdown: {
    skillMatch: number;
    experienceMatch: number;
    educationMatch: number;
    preferredMatch: number;
    resumeStructure: number;
  };
  isShortlisted: boolean;
  screeningExplanation: {
    whyShortlisted?: string[];
    whyNotShortlisted?: string[];
    summary: string;
  };
}

export const ResumeScreeningView: React.FC = () => {
  const { targetRole } = useApp();

  // Job requirements form state
  const [jobTitle, setJobTitle] = useState(targetRole.title);
  const [jobDesc, setJobDesc] = useState(targetRole.description);
  const [requiredSkillsStr, setRequiredSkillsStr] = useState(targetRole.requiredSkills.map(s => s.name).join(', '));
  const [preferredSkillsStr, setPreferredSkillsStr] = useState('Docker, Kubernetes, CI/CD, Agile, TypeScript');
  const [experienceReq, setExperienceReq] = useState('2');

  // Resumes state (supports 150+ resumes)
  const [selectedFiles, setSelectedFiles] = useState<{ id: string; name: string; file: File }[]>([]);

  const [isScreening, setIsScreening] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobMeta, setJobMeta] = useState<{ totalUploaded: number; uniqueCount: number; duplicateCount: number } | null>(null);
  const [jobProgress, setJobProgress] = useState<{
    status: string;
    total: number;
    processed: number;
    successful: number;
    failed: number;
    remaining: number;
    results: CandidateProfileData[];
    failedFiles: { filename: string; error: string }[];
  } | null>(null);

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfileData | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'skills' | 'experience' | 'education' | 'projects' | 'ats'>('overview');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Shortlisted' | 'Not Shortlisted'>('All');
  const [scoreFilter, setScoreFilter] = useState<'All' | '80' | '70' | '60'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleMultipleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesToAdd = Array.from(files).map((file, index) => ({
      id: `res-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 5)}`,
      name: file.name,
      file: file
    }));

    setSelectedFiles(prev => [...prev, ...filesToAdd]);
  };

  const handleClearAllFiles = () => {
    setSelectedFiles([]);
    setJobId(null);
    setJobMeta(null);
    setJobProgress(null);
  };

  const handleStartScreening = async () => {
    if (selectedFiles.length === 0) {
      alert('Please upload resumes to screen.');
      return;
    }

    setIsScreening(true);
    setJobProgress(null);
    setJobMeta(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach(sf => {
        formData.append('resumes', sf.file);
      });
      formData.append('jobTitle', jobTitle);
      formData.append('jobDescription', jobDesc);
      formData.append('requiredSkills', JSON.stringify(requiredSkillsStr.split(',').map(s => s.trim()).filter(Boolean)));
      formData.append('preferredSkills', JSON.stringify(preferredSkillsStr.split(',').map(s => s.trim()).filter(Boolean)));
      formData.append('minExperience', experienceReq);

      const res = await fetch('/api/screening/jobs', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.jobId) {
        setJobId(data.jobId);
        setJobMeta({
          totalUploaded: data.totalUploaded,
          uniqueCount: data.uniqueCount,
          duplicateCount: data.duplicateCount
        });
      } else {
        alert(data.error || 'Failed to start screening job.');
        setIsScreening(false);
      }
    } catch (err: any) {
      console.error('Job start error:', err);
      alert('Network error when starting screening job.');
      setIsScreening(false);
    }
  };

  useEffect(() => {
    if (!jobId || !isScreening) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/screening/jobs/${jobId}`);
        const data = await res.json();
        if (data.success) {
          setJobProgress({
            status: data.status,
            total: data.total,
            processed: data.processed,
            successful: data.successful,
            failed: data.failed,
            remaining: data.remaining,
            results: data.results,
            failedFiles: data.failedFiles
          });

          if (data.status === 'completed' || data.status === 'failed') {
            setIsScreening(false);
            clearInterval(interval);
          }
        }
      } catch (e) {
        console.error('Polling error:', e);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [jobId, isScreening]);

  const handleRetryFailed = async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/screening/jobs/${jobId}/retry`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setIsScreening(true);
      }
    } catch (e) {
      console.error('Retry error:', e);
    }
  };

  const allResults = jobProgress?.results || [];

  const filteredResults = allResults.filter(cand => {
    const matchesSearch = cand.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.matchingSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesStatus = true;
    if (statusFilter === 'Shortlisted') matchesStatus = cand.isShortlisted;
    if (statusFilter === 'Not Shortlisted') matchesStatus = !cand.isShortlisted;

    let matchesScore = true;
    if (scoreFilter === '80') matchesScore = cand.atsScore >= 80;
    if (scoreFilter === '70') matchesScore = cand.atsScore >= 70;
    if (scoreFilter === '60') matchesScore = cand.atsScore >= 60;

    return matchesSearch && matchesStatus && matchesScore;
  });

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage) || 1;
  const paginatedResults = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalCount = jobProgress ? jobProgress.total : 0;
  const processedCount = jobProgress ? jobProgress.processed : 0;
  const successfulCount = jobProgress ? jobProgress.successful : 0;
  const failedCount = jobProgress ? jobProgress.failed : 0;
  const shortlistedCount = allResults.filter(r => r.isShortlisted).length;
  const notShortlistedCount = successfulCount - shortlistedCount;
  const avgAtsScore = successfulCount > 0 ? Math.round(allResults.reduce((acc, r) => acc + r.atsScore, 0) / successfulCount) : 0;
  const percentComplete = totalCount > 0 ? Math.round((processedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in duration-300">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/25">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zoho Recruit &amp; Workable Style ATS Platform</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Structured Resume Parsing &amp; Candidate ATS Engine
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Automatic section detection, structured candidate profiling, SHA-256 duplicate filtering, and transparent multi-factor ATS scoring.
          </p>
        </div>
      </div>

      {/* Step 1 & Step 2: Job Requirements & Bulk Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 1: Job Requirements */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">1</div>
            <h2 className="text-sm font-bold text-slate-900">Define Job &amp; Screening Criteria</h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Description Summary</label>
              <textarea
                rows={3}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Required Skills (comma separated)</label>
              <input
                type="text"
                value={requiredSkillsStr}
                onChange={(e) => setRequiredSkillsStr(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Skills</label>
                <input
                  type="text"
                  value={preferredSkillsStr}
                  onChange={(e) => setPreferredSkillsStr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Min Experience (Years)</label>
                <input
                  type="number"
                  value={experienceReq}
                  onChange={(e) => setExperienceReq(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Bulk Upload & Deduplication */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">2</div>
                <h2 className="text-sm font-bold text-slate-900">Bulk Resume Upload (150+ Batch)</h2>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                {selectedFiles.length} files selected
              </span>
            </div>

            {/* Dropzone */}
            <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-800">Select multiple resume files or drop batch</div>
              <p className="text-[11px] text-slate-500 mt-0.5">PDF, DOC, DOCX, TXT (SHA-256 + Candidate Deduplication)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleMultipleFileUpload}
                className="hidden"
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{selectedFiles.length} files staged for parsing and ATS scoring.</span>
                <button
                  onClick={handleClearAllFiles}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Clear Batch
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={handleStartScreening}
              disabled={isScreening || selectedFiles.length === 0}
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScreening ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Candidates ({processedCount} / {totalCount})...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start Structured ATS Screening</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Duplicate Summary Card */}
      {jobMeta && (
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-indigo-950 font-bold uppercase tracking-wider text-[10px]">Files Uploaded</div>
              <div className="text-xl font-black text-indigo-900">{jobMeta.totalUploaded}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-emerald-950 font-bold uppercase tracking-wider text-[10px]">Unique Candidates</div>
              <div className="text-xl font-black text-emerald-900">{jobMeta.uniqueCount}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Copy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-amber-950 font-bold uppercase tracking-wider text-[10px]">Duplicates Filtered</div>
              <div className="text-xl font-black text-amber-900">{jobMeta.duplicateCount}</div>
            </div>
          </div>
        </div>
      )}

      {/* Live Processing Screen */}
      {(isScreening || jobProgress) && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 lg:p-8 rounded-2xl shadow-xl space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-2">
                <RefreshCw className={`w-3.5 h-3.5 ${isScreening ? 'animate-spin' : ''}`} />
                <span>Concurrent Parsing Engine Active ({jobProgress?.status.toUpperCase()})</span>
              </div>
              <h2 className="text-xl font-black">Resume Parsing &amp; ATS Scoring in Progress</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">{percentComplete}%</div>
              <div className="text-xs text-indigo-300">{processedCount} of {totalCount} processed</div>
            </div>
          </div>

          <div className="w-full bg-indigo-950 rounded-full h-3 overflow-hidden border border-indigo-500/30">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Parsed Successfully</div>
              <div className="text-xl font-black text-emerald-400 mt-1">{successfulCount}</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Failed</div>
              <div className="text-xl font-black text-rose-400 mt-1">{failedCount}</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Remaining</div>
              <div className="text-xl font-black text-amber-300 mt-1">{jobProgress ? jobProgress.remaining : 0}</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Results Available</div>
              <div className="text-xl font-black text-indigo-300 mt-1">{allResults.length}</div>
            </div>
          </div>

          {jobProgress && jobProgress.failedFiles.length > 0 && !isScreening && (
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-rose-300 font-semibold">{jobProgress.failedFiles.length} resumes failed parsing.</span>
              <button
                onClick={handleRetryFailed}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Retry Failed Resumes
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Dashboard & Table */}
      {allResults.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 4 Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Unique Candidates</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{totalCount}</div>
              <div className="text-xs text-slate-500 mt-1">Structured profiles created</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Shortlisted</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{shortlistedCount}</div>
              <div className="text-xs text-emerald-600 mt-1">Meets threshold criteria</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Not Shortlisted</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{notShortlistedCount}</div>
              <div className="text-xs text-rose-600 mt-1">Skill gaps / low ATS</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Average ATS Score</div>
              <div className="text-3xl font-black text-slate-900 mt-2">{avgAtsScore}/100</div>
              <div className="text-xs text-indigo-600 mt-1">Across all profiles</div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All ({allResults.length})</option>
                  <option value="Shortlisted">Shortlisted ({shortlistedCount})</option>
                  <option value="Not Shortlisted">Not Shortlisted ({notShortlistedCount})</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">Min ATS Score:</span>
                <select
                  value={scoreFilter}
                  onChange={(e: any) => setScoreFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Scores</option>
                  <option value="80">80+ ATS Score</option>
                  <option value="70">70+ ATS Score</option>
                  <option value="60">60+ ATS Score</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Candidate</th>
                    <th className="py-3.5 px-6">ATS Score</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Matching Skills</th>
                    <th className="py-3.5 px-6">Skill Gaps</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {paginatedResults.map(cand => (
                    <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{cand.candidateName}</div>
                        <div className="text-[11px] text-slate-500">{cand.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-black text-sm ${cand.atsScore >= 70 ? 'text-emerald-600' : cand.atsScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {cand.atsScore}/100
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {cand.isShortlisted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Shortlisted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full font-bold text-[11px]">
                            <XCircle className="w-3.5 h-3.5" />
                            Not Shortlisted
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cand.matchingSkills.slice(0, 3).map((ms, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-bold">
                              {ms}
                            </span>
                          ))}
                          {cand.matchingSkills.length > 3 && (
                            <span className="text-[10px] text-slate-400 self-center">+{cand.matchingSkills.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cand.missingSkills.slice(0, 2).map((ms, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md text-[10px] font-bold">
                              {ms}
                            </span>
                          ))}
                          {cand.missingSkills.length === 0 && (
                            <span className="text-[11px] text-emerald-600 font-bold">None</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedCandidate(cand);
                            setActiveProfileTab('overview');
                          }}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Candidate Profile</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedResults.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No candidates matching the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Showing page {currentPage} of {totalPages} ({filteredResults.length} candidates)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold disabled:opacity-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Structured Candidate Profile Modal (Zoho / Workable / Manatal Style) */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">{selectedCandidate.candidateName}</h2>
                <p className="text-xs text-indigo-200">{selectedCandidate.email} {selectedCandidate.phone ? `· ${selectedCandidate.phone}` : ''} {selectedCandidate.location ? `· ${selectedCandidate.location}` : ''}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Tabs for Structured Profile */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-6 text-xs font-bold">
              <button
                onClick={() => setActiveProfileTab('overview')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeProfileTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Overview &amp; Summary
              </button>
              <button
                onClick={() => setActiveProfileTab('skills')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeProfileTab === 'skills' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Extracted Skills ({selectedCandidate.skills.length})
              </button>
              <button
                onClick={() => setActiveProfileTab('experience')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeProfileTab === 'experience' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Experience ({selectedCandidate.experience.length})
              </button>
              <button
                onClick={() => setActiveProfileTab('education')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeProfileTab === 'education' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Education &amp; Projects
              </button>
              <button
                onClick={() => setActiveProfileTab('ats')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${activeProfileTab === 'ats' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                ATS Score &amp; Gaps
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {activeProfileTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <div className="text-slate-500 font-semibold">Overall ATS Score</div>
                      <div className="text-2xl font-black text-indigo-600 mt-0.5">{selectedCandidate.atsScore}/100</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-semibold">Screening Status</div>
                      <div className="mt-0.5 font-bold">
                        {selectedCandidate.isShortlisted ? (
                          <span className="text-emerald-600">✓ Shortlisted</span>
                        ) : (
                          <span className="text-rose-600">✕ Not Shortlisted</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-semibold">Source Resume File</div>
                      <div className="font-bold text-slate-800 truncate mt-0.5">{selectedCandidate.filename}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Professional Summary</h3>
                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-indigo-950 font-medium leading-relaxed">
                      {selectedCandidate.summary || 'Professional summary extracted from resume document.'}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Screening Rationale</h3>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-slate-800">
                      <p className="font-semibold">{selectedCandidate.screeningExplanation.summary}</p>
                      {selectedCandidate.screeningExplanation.whyShortlisted?.map((r, i) => (
                        <div key={i} className="text-emerald-700 font-bold">✓ {r}</div>
                      ))}
                      {selectedCandidate.screeningExplanation.whyNotShortlisted?.map((r, i) => (
                        <div key={i} className="text-rose-700 font-bold">✕ {r}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'skills' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Categorized Skills Extracted from Resume</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(
                        selectedCandidate.skills.reduce((acc, s) => {
                          const cat = s.category || 'Other Skills';
                          if (!acc[cat]) acc[cat] = [];
                          acc[cat].push(s.name);
                          return acc;
                        }, {} as Record<string, string[]>)
                      ).map(([category, skillList], idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="font-bold text-indigo-900">{category}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {skillList.map((sk, sIdx) => (
                              <span key={sIdx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg font-bold text-[11px] shadow-2xs">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'experience' && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Work Experience History</h3>
                  <div className="space-y-4">
                    {selectedCandidate.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-slate-900 text-sm">{exp.title}</div>
                          <div className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">{exp.duration}</div>
                        </div>
                        <div className="font-semibold text-slate-700">{exp.company}</div>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="list-disc pl-4 space-y-1 text-slate-600">
                            {exp.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {exp.technologies.map((tech, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-bold">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeProfileTab === 'education' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Education History</h3>
                    <div className="space-y-3">
                      {selectedCandidate.education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900">{edu.degree}</div>
                            <div className="text-slate-600 font-medium">{edu.institution} {edu.field ? `· ${edu.field}` : ''}</div>
                          </div>
                          <div className="font-bold text-indigo-600 text-[11px]">{edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Projects &amp; Certifications</h3>
                    <div className="space-y-3">
                      {selectedCandidate.projects.map((proj, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                          <div className="font-bold text-slate-900">{proj.name}</div>
                          <p className="text-slate-600">{proj.description}</p>
                          {proj.technologies && proj.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.technologies.map((t, tIdx) => (
                                <span key={tIdx} className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {selectedCandidate.certifications.length > 0 && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="font-bold text-slate-900">Certifications</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCandidate.certifications.map((cert, cIdx) => (
                              <span key={cIdx} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl font-bold text-[11px]">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'ats' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Transparent ATS Score Breakdown</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-center">
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Skill Match</div>
                        <div className="text-base font-black text-indigo-900 mt-1">{selectedCandidate.atsBreakdown.skillMatch}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Experience</div>
                        <div className="text-base font-black text-indigo-900 mt-1">{selectedCandidate.atsBreakdown.experienceMatch}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Education</div>
                        <div className="text-base font-black text-indigo-900 mt-1">{selectedCandidate.atsBreakdown.educationMatch}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Preferred</div>
                        <div className="text-base font-black text-indigo-900 mt-1">{selectedCandidate.atsBreakdown.preferredMatch}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Structure</div>
                        <div className="text-base font-black text-indigo-900 mt-1">{selectedCandidate.atsBreakdown.resumeStructure}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-900">Matching Required Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCandidate.matchingSkills.map((ms, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[11px]">
                            {ms}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="font-bold text-slate-900">Skill Gaps (Missing)</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCandidate.missingSkills.map((ms, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg font-bold text-[11px]">
                            {ms}
                          </span>
                        ))}
                        {selectedCandidate.missingSkills.length === 0 && (
                          <span className="text-emerald-600 font-bold">No skill gaps!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Close Candidate Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
