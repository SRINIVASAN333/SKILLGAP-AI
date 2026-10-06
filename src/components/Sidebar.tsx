import React, { useState } from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Target,
  Compass,
  BookOpen,
  CheckSquare,
  TrendingUp,
  FileBarChart,
  Settings,
  ArrowLeft,
  GraduationCap,
  Database,
  ChevronDown,
  UserCheck,
  Users
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeProfile, profiles, setActiveProfileId } = useApp();
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume-analysis', label: 'Resume Analysis', icon: FileText },
    { id: 'resume-screening', label: 'Resume Screening', icon: Users },
    { id: 'job-matching', label: 'Job Matching', icon: Briefcase },
    { id: 'skill-gap', label: 'Skill Gap', icon: Target },
    { id: 'career-paths', label: 'Career Paths', icon: Compass },
    { id: 'learning-roadmap', label: 'Learning Roadmap', icon: BookOpen },
    { id: 'skill-assessment', label: 'Skill Assessment', icon: CheckSquare },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'career-report', label: 'Career Report', icon: FileBarChart },
    { id: 'job-database', label: 'Job Database', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-200 flex flex-col flex-shrink-0 border-r border-slate-800/80 min-h-screen select-none shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
              SkillGap<span className="text-indigo-400">AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Core Modules
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Academic Report
        </div>
        <button
          onClick={() => setActiveTab('landing')}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition-colors text-left border border-slate-800/80"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" />
          <span>About Project Report</span>
        </button>
      </nav>

      {/* User Profile Footer Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 relative">
        <div
          onClick={() => setShowProfileSwitcher(!showProfileSwitcher)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 cursor-pointer transition-all border border-slate-800 flex items-center justify-between group shadow-sm"
          title="Click to switch candidate profile"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {activeProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0 truncate">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                {activeProfile.name}
              </div>
              <div className="text-[10px] text-indigo-300 truncate font-mono">
                {activeProfile.rollNumber}
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors flex-shrink-0" />
        </div>

        {/* Profile Switcher Popover */}
        {showProfileSwitcher && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1 mb-1 tracking-wider">
              Switch Candidate Profile
            </div>
            {profiles.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProfileId(p.id);
                  setShowProfileSwitcher(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                  p.id === activeProfile.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="truncate">
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="text-[10px] text-indigo-200/80 font-mono">{p.rollNumber}</div>
                </div>
                {p.id === activeProfile.id && <UserCheck className="w-3.5 h-3.5 ml-2 text-white" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
