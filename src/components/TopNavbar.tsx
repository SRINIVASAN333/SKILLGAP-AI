import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, RefreshCw, ShieldCheck, LogOut, User, ChevronDown } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const { currentUser, logoutUser, targetRole, setTargetRoleId, jobRoles, currentAnalysis, resetToDefaultData } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName = currentUser ? currentUser.name : 'Recruiter';
  const firstName = userName.split(' ')[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Welcome info badge */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Welcome back, {firstName}
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Session
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block">
            Enterprise Recruitment Platform · Target Role: <span className="font-semibold text-slate-700">{targetRole.title}</span>
          </p>
        </div>
      </div>

      {/* Target Role Selector & Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Target Role Dropdown */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50/90 border border-indigo-200/80 rounded-xl text-xs font-semibold text-indigo-900 shadow-2xs">
            <Target className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <span className="hidden md:inline">Target Role:</span>
            <select
              value={targetRole.id}
              onChange={(e) => setTargetRoleId(e.target.value)}
              className="bg-transparent text-indigo-700 font-bold cursor-pointer focus:outline-none pr-1"
            >
              {jobRoles.map(role => (
                <option key={role.id} value={role.id} className="bg-white text-slate-800">
                  {role.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Job Readiness Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-slate-500">Readiness:</span>
          <span className="font-extrabold text-slate-900">{currentAnalysis.jobReadinessScore}%</span>
        </div>

        {/* Profile / Logout Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900 truncate">{userName}</div>
                <div className="text-[11px] text-slate-500 truncate">{currentUser?.email}</div>
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  logoutUser();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out (Logout)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
