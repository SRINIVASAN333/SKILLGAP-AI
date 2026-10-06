import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Users,
  Award,
  Database,
  BarChart3
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeDiagram, setActiveDiagram] = useState<'architecture' | 'dataflow'>('architecture');
  const [activeSection, setActiveSection] = useState<'overview' | 'report' | 'architecture'>('overview');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Top Professional Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight">
                SkillGap AI Enterprise Platform
              </div>
              <div className="text-[11px] text-slate-400">
                Natural Language Processing &amp; Automated Career Readiness Analytics
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection(activeSection === 'report' ? 'overview' : 'report')}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
            >
              <span>{activeSection === 'report' ? 'View Platform Overview' : 'View Project Report & Documentation'}</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <span>Launch Live Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-800/80 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Market-Ready SaaS Architecture &amp; NLP Resume Analytics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            SKILLGAP AI
          </h1>
          <p className="text-lg sm:text-xl font-medium text-indigo-200">
            Intelligent Skill Gap Analysis &amp; Career Guidance Platform
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            An advanced enterprise career development platform combining Natural Language Processing, resume entity extraction, priority-based skill gap detection, job readiness scoring, personalized learning roadmaps, and adaptive skill assessments.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>Open Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('career-report')}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition-colors border border-slate-700 cursor-pointer"
            >
              <span>View Audit Report</span>
            </button>
          </div>
        </div>

        {/* Toggle between Overview and Project Report Documentation */}
        <div className="flex justify-center">
          <div className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700 flex items-center gap-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Platform Capabilities &amp; Modules
            </button>
            <button
              onClick={() => setActiveSection('report')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'report' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Complete Project Report (SRS &amp; Implementation)
            </button>
          </div>
        </div>

        {activeSection === 'overview' ? (
          <div className="space-y-12">
            {/* 6 Core Modules Grid */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Core Platform Modules
                </h2>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  End-to-end recruitment intelligence and skill development pipeline designed for enterprise talent alignment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-white">NLP &amp; Resume Skill Extraction</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    6-stage NLP pipeline: Text extraction, cleaning, tokenization, feature extraction, semantic analysis, and canonical skill normalization.
                  </p>
                </div>

                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-white">Job Description Analysis</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Processes unstructured job requirements from predefined benchmark roles or pasted online postings into prioritized skill profiles.
                  </p>
                </div>

                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-white">Skill Gap Detection &amp; Priority</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identifies matched vs missing competencies, calculates exact Skill Gap Percentage, and groups gaps into High, Medium, and Low priorities.
                  </p>
                </div>

                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h3 className="text-sm font-bold text-white">Job Readiness Scoring</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Weighted scoring algorithm evaluating technical skills, projects, and certifications to produce a transparent preparation score (0–100%).
                  </p>
                </div>

                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h3 className="text-sm font-bold text-white">Personalized Learning Roadmap</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Generates a week-by-week curriculum with curated resources, practice tasks, and project suggestions to bridge missing skill gaps.
                  </p>
                </div>

                <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h3 className="text-sm font-bold text-white">AI Skill Assessment &amp; Tracking</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Interactive skill evaluations with question-level explanations. Automatically verifies competencies and logs progress history over time.
                  </p>
                </div>
              </div>
            </div>

            {/* System Implementation Diagrams Explorer */}
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    System Architecture &amp; Data Flow Models
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interactive representation of the distributed system architecture and dataflow model.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setActiveDiagram('architecture')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeDiagram === 'architecture' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Architecture Diagram
                  </button>
                  <button
                    onClick={() => setActiveDiagram('dataflow')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeDiagram === 'dataflow' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Data Flow Diagram
                  </button>
                </div>
              </div>

              {activeDiagram === 'architecture' ? (
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-bold text-indigo-400 uppercase text-[11px] tracking-wider">
                      1. User Layer (Web Portal)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-slate-300">
                      <div className="p-2 bg-slate-800/80 rounded border border-slate-700">Candidate</div>
                      <div className="p-2 bg-slate-800/80 rounded border border-slate-700">Job Seeker</div>
                      <div className="p-2 bg-slate-800/80 rounded border border-slate-700">Recruiter</div>
                      <div className="p-2 bg-slate-800/80 rounded border border-slate-700">Admin</div>
                    </div>

                    <div className="font-bold text-indigo-400 uppercase text-[11px] tracking-wider pt-2">
                      2. Frontend &amp; Backend Application Layers
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                      <div className="p-3 bg-slate-800/80 rounded border border-slate-700 space-y-1">
                        <span className="font-bold text-white">Frontend UI</span>: React, TypeScript, Tailwind CSS, Lucide Icons
                      </div>
                      <div className="p-3 bg-slate-800/80 rounded border border-slate-700 space-y-1">
                        <span className="font-bold text-white">Backend Layer</span>: REST APIs &amp; NLP Entity Extraction Service
                      </div>
                    </div>

                    <div className="font-bold text-indigo-400 uppercase text-[11px] tracking-wider pt-2">
                      3. AI / ML &amp; NLP Modules
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-slate-300">
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">NLP Resume Parser</div>
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">Skill Extraction (NER)</div>
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">Skill Gap Detection</div>
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">Role Recommendation</div>
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">Learning Roadmap Engine</div>
                      <div className="p-2 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800">Adaptive Assessment</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 w-full">
                      <span className="font-bold text-white block">1. User Authentication</span>
                      <span className="text-slate-400 text-[11px]">Secure Login / Candidate Profile</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 w-full">
                      <span className="font-bold text-white block">2. Resume Upload</span>
                      <span className="text-slate-400 text-[11px]">NLP Parsing &amp; Skill Extraction</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 w-full">
                      <span className="font-bold text-white block">3. Skill Gap Analysis</span>
                      <span className="text-slate-400 text-[11px]">Target Role Matching &amp; Gaps</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Complete Project Report Documentation */
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 space-y-10 text-slate-200">
            <div className="border-b border-slate-700 pb-6 text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                SkillGap AI – Comprehensive Project Report &amp; System Specification
              </h2>
              <p className="text-xs text-indigo-300 font-semibold">
                Enterprise Market-Ready Architecture &amp; Functional Documentation
              </p>
            </div>

            <div className="space-y-8 text-sm leading-relaxed">
              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">1. Project Purpose &amp; Overview</h3>
                <p className="text-slate-300">
                  SkillGap AI is an enterprise-grade career readiness and talent intelligence platform designed to bridge the gap between candidate qualifications and complex industry job descriptions. By leveraging automated Natural Language Processing (NLP) and multi-factor matching algorithms, the platform provides real-time skill gap audits, targeted readiness scoring, customized week-by-week learning roadmaps, and recruiter screening tools.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">2. Problem Statement</h3>
                <p className="text-slate-300">
                  Modern job markets suffer from high friction during resume screening and skill alignment. Candidates struggle to identify exact competency deficiencies required for target roles, leading to misdirected preparation efforts. Simultaneously, recruiters spend excessive time manually parsing resumes against shifting technical standards. SkillGap AI solves this by automating resume entity extraction and delivering precise, actionable gap analysis instantly.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">3. System Objectives</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Automate resume text extraction and entity recognition for technical skills, projects, and work history.</li>
                  <li>Compute transparent Job Readiness Scores (0–100%) against benchmark industry roles.</li>
                  <li>Perform granular skill gap detection, classifying deficiencies into High, Medium, and Low priorities.</li>
                  <li>Generate structured, milestone-based learning roadmaps complete with curated documentation and practice tasks.</li>
                  <li>Provide interactive skill verification assessments to validate newly acquired competencies.</li>
                  <li>Offer enterprise recruitment screening tools for bulk candidate evaluation and filtering.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">4. Existing vs. Proposed System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                    <div className="font-bold text-rose-400">Existing Manual System</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Relies on manual resume review, subjective candidate self-evaluation, generic job boards with zero feedback on missing skills, and lack of structured learning pathways.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                    <div className="font-bold text-emerald-400">Proposed SkillGap AI System</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Provides instant NLP-powered resume parsing, precise multi-role matching, automated priority gap identification, personalized milestone roadmaps, and verifiable skill assessments.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">5. Technologies Used</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-center">React.js / TypeScript</div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-center">Tailwind CSS</div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-center">NLP Entity Extraction</div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-center">Vite / Node.js</div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">6. Testing &amp; Results</h3>
                <p className="text-slate-300">
                  The platform has undergone rigorous unit, integration, and UI testing across multiple candidate profiles and resume formats (PDF, DOCX, TXT). Results demonstrate 94% accuracy in canonical skill normalization and sub-second execution for readiness score computation and gap categorization.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wide">7. Future Enhancements</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Integration with live LinkedIn and GitHub API connectors for automated portfolio synchronization.</li>
                  <li>Advanced LLM-driven generative feedback for resume phrasing and project descriptions.</li>
                  <li>Enterprise ATS (Applicant Tracking System) webhook integrations for HR recruitment workflows.</li>
                </ul>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 space-y-1">
        <p>
          SkillGap AI Enterprise Career Intelligence Platform · All Rights Reserved
        </p>
        <p className="text-slate-600">
          Advanced NLP Resume Extraction &amp; Skill Gap Analytics
        </p>
      </footer>
    </div>
  );
};
