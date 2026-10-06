import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  User,
  Save,
  RotateCcw,
  Sparkles,
  Shield,
  GraduationCap
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeProfile, updateProfileData, resetToDefaultData, targetRole, jobRoles, setTargetRoleId } = useApp();

  const [name, setName] = useState(activeProfile.name);
  const [rollNumber, setRollNumber] = useState(activeProfile.rollNumber);
  const [email, setEmail] = useState(activeProfile.email);
  const [department, setDepartment] = useState(activeProfile.department);
  const [summary, setSummary] = useState(activeProfile.summary);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileData({
      name,
      rollNumber,
      email,
      department,
      summary
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform Settings</h2>
        <p className="text-xs text-slate-500">
          Manage candidate profile information, target career objectives, and system preferences.
        </p>
      </div>

      {/* Candidate Profile Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Candidate Information</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Roll / Registration Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Academic Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Professional Summary</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {savedSuccess ? (
              <span className="text-emerald-600 font-semibold text-xs">
                ✓ Profile saved successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Target Role Configuration */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Active Career Target Role</h3>
        <p className="text-xs text-slate-500">
          Changing this will recalculate skill gaps and resequence your learning roadmap across the platform.
        </p>

        <div className="pt-2">
          <select
            value={targetRole.id}
            onChange={(e) => setTargetRoleId(e.target.value)}
            className="w-full max-w-md px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            {jobRoles.map(role => (
              <option key={role.id} value={role.id}>
                {role.title} — {role.department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Demo Reset */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Reset Demo Baseline</h3>
          <p className="text-xs text-slate-500">
            Restores Siva Sankar S's standard profile, initial 73% readiness, and mock roadmap progress.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all demo state to standard baseline?')) {
              resetToDefaultData();
              alert('Reset complete.');
            }
          }}
          className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Baseline</span>
        </button>
      </div>
    </div>
  );
};
