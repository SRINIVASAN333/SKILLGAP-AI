import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  Cpu,
  RefreshCw,
  Plus
} from 'lucide-react';
import { processResumeWithNLP, SKILL_SYNONYM_MAP } from '../services/nlpService';
import { ExtractedSkill, SkillCategory } from '../types';

export const ResumeAnalysisView: React.FC = () => {
  const { activeProfile, updateProfileData, addSkillToActiveProfile, setActiveTab, setHasUploadedResume, hasUploadedResume } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<'skills' | 'pipeline' | 'projects' | 'raw'>('skills');
  const [nlpReport, setNlpReport] = useState(() => {
    if (!hasUploadedResume || activeProfile.skills.length === 0) return null;
    return processResumeWithNLP(
      `${activeProfile.name}\n${activeProfile.summary}\nTechnical Skills: ${activeProfile.skills.map(s => s.name).join(', ')}`
    );
  });
  const [manualSkillInput, setManualSkillInput] = useState('');
  const [selectedManualCategory, setSelectedManualCategory] = useState<SkillCategory>('Programming Languages');

  // Load sample professional resume
  const handleUseSampleResume = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setHasUploadedResume(true);
      const sampleText = `Alex Morgan\nSenior Full Stack Software Engineer\nWork Email: alex.morgan@organization.com\nSkills: Java, JavaScript, React.js, HTML5, CSS3, SQL, Git, REST API, Spring Boot, Docker, AWS.\nProjects: Enterprise Cloud Microservices Platform (React, Java, Spring Boot, PostgreSQL, Docker), Real-time Analytics Dashboard (React, Node.js, WebSocket).\nExperience: Software Engineer at TechCorp Solutions (2024 - Present).`;
      const result = processResumeWithNLP(sampleText);
      setNlpReport(result);
      result.extractedSkills.forEach(s => addSkillToActiveProfile(s));
      updateProfileData({
        summary: 'Senior software engineer specializing in scalable full-stack web applications, microservices, and cloud architecture.',
        education: [
          { degree: 'B.S. Computer Science', institution: 'University Institute of Technology', specialization: 'Computer Science', year: '2020 - 2024', grade: 'First Class' }
        ],
        projects: [
          { title: 'Enterprise Cloud Microservices Platform', description: 'Designed distributed REST microservices with Spring Boot, React, and PostgreSQL.', technologies: ['React.js', 'Java', 'SQL', 'Docker'], role: 'Lead Developer' }
        ],
        experience: [
          { role: 'Software Engineer', organization: 'TechCorp Solutions', duration: '2024 - Present', description: 'Engineered high-throughput backend API endpoints and responsive client interfaces.' }
        ]
      });
      setIsProcessing(false);
    }, 600);
  };

  // Handle uploaded file (PDF / DOCX / TXT)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      setTimeout(() => {
        setHasUploadedResume(true);
        const parsed = processResumeWithNLP(content || `Uploaded Resume: ${file.name}`);
        setNlpReport(parsed);
        parsed.extractedSkills.forEach(skill => {
          addSkillToActiveProfile(skill);
        });
        setIsProcessing(false);
      }, 700);
    };

    reader.onerror = () => {
      setIsProcessing(false);
      alert('Error reading file. Please try a text or PDF document.');
    };

    reader.readAsText(file);
  };

  const handleAddManualSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSkillInput.trim()) return;

    setHasUploadedResume(true);
    const trimmed = manualSkillInput.trim();
    const mapped = SKILL_SYNONYM_MAP[trimmed.toLowerCase()];
    const canonicalName = mapped ? mapped.canonical : trimmed;
    const category = mapped ? mapped.category : selectedManualCategory;

    const newSkill: ExtractedSkill = {
      name: canonicalName,
      normalizedName: canonicalName.toLowerCase(),
      category: category,
      proficiency: 'Intermediate',
      confidence: 90,
      source: 'Manual',
      yearsExperience: 1
    };

    addSkillToActiveProfile(newSkill);
    setManualSkillInput('');
  };

  // Group skills by category
  const skillsByCategory = activeProfile.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, ExtractedSkill[]>);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in duration-300">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>6-Stage Natural Language Processing Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Resume Extraction &amp; NLP Parsing
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Upload your resume to automatically extract technical skills, education, projects, and work experience through semantic entity recognition.
          </p>
        </div>

        <button
          onClick={handleUseSampleResume}
          disabled={isProcessing}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Load Sample Professional Resume</span>
        </button>
      </div>

      {/* Dropzone Container */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) {
            setIsProcessing(true);
            const reader = new FileReader();
            reader.onload = (event) => {
              const text = (event.target?.result as string) || file.name;
              setTimeout(() => {
                setHasUploadedResume(true);
                const parsed = processResumeWithNLP(text);
                setNlpReport(parsed);
                parsed.extractedSkills.forEach(s => addSkillToActiveProfile(s));
                setIsProcessing(false);
              }, 600);
            };
            reader.readAsText(file);
          }
        }}
        className={`bg-white border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/30'
            : 'border-slate-200 hover:border-slate-300 shadow-xs'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
            <Upload className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1">
            Upload Your Resume
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Supports PDF, DOCX, and TXT documents. Drop file or click to browse.
          </p>

          <label className="cursor-pointer py-2.5 px-6 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md">
            <Upload className="w-4 h-4" />
            <span>Browse Computer</span>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {isProcessing && (
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Executing 6-Stage NLP Pipeline...</span>
            </div>
          )}
        </div>
      </div>

      {/* Segmented Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTabSub('skills')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTabSub === 'skills'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Extracted Skills ({activeProfile.skills.length})
        </button>
        <button
          onClick={() => setActiveTabSub('pipeline')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTabSub === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          NLP Processing Pipeline (6 Stages)
        </button>
        <button
          onClick={() => setActiveTabSub('projects')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTabSub === 'projects'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Projects &amp; Experience
        </button>
      </div>

      {/* Subtab Contents */}
      {activeTabSub === 'skills' && (
        <div className="space-y-6">
          {hasUploadedResume && activeProfile.skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5 border-b border-slate-100 pb-2.5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{category}</h4>
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">{skills.length}</span>
                    </div>

                    <div className="space-y-2.5">
                      {skills.map(s => (
                        <div
                          key={s.name}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">{s.name}</div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {s.proficiency} · {s.source} · {s.confidence}% conf
                            </div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No Resume Analyzed Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Upload your resume above or load the sample professional resume to begin NLP skill extraction and career matching.
              </p>
            </div>
          )}

          {/* Quick Manual Add Skill Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-1">Add or Verify Additional Skill</h4>
            <p className="text-xs text-slate-500 mb-4">
              Manually add technical skills to update your active candidate profile instantly.
            </p>

            <form onSubmit={handleAddManualSkill} className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={manualSkillInput}
                onChange={(e) => setManualSkillInput(e.target.value)}
                placeholder="e.g. Docker, TypeScript, AWS, PostgreSQL"
                className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600 min-w-[260px] shadow-2xs"
              />

              <select
                value={selectedManualCategory}
                onChange={(e) => setSelectedManualCategory(e.target.value as SkillCategory)}
                className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-600 bg-white shadow-2xs font-medium cursor-pointer"
              >
                <option value="Programming Languages">Programming Languages</option>
                <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                <option value="Databases">Databases</option>
                <option value="Development Tools">Development Tools</option>
                <option value="Cloud & Emerging Technologies">Cloud & Emerging Technologies</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Professional Skills">Professional Skills</option>
              </select>

              <button
                type="submit"
                className="py-2.5 px-5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTabSub === 'pipeline' && (
        <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Natural Language Processing (NLP) Execution Pipeline
            </h3>
            <p className="text-xs text-slate-500">
              6-stage pipeline architecture for semantic entity recognition and skill matching.
            </p>
          </div>

          {nlpReport ? (
            <div className="space-y-4">
              {nlpReport.pipelineSteps.map((step) => (
                <div key={step.stage} className="p-5 rounded-xl bg-slate-50 border border-slate-200/90">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-sm">
                        {step.stage}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{step.name}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 pl-10 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="ml-10 text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 text-slate-800 shadow-2xs">
                    {step.outputPreview}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-medium">
              Upload your resume above to execute the 6-stage NLP extraction pipeline.
            </div>
          )}
        </div>
      )}

      {activeTabSub === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Extracted Projects &amp; Experience</h3>
            {hasUploadedResume && activeProfile.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeProfile.projects.map((proj, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                        {proj.role && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">{proj.role}</span>}
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-600">No Projects Extracted Yet</p>
                <p className="text-[11px] text-slate-400 mt-1">Upload a resume to automatically extract project portfolios and work history.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
