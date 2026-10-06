import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CandidateProfile,
  JobRole,
  LearningRoadmapStep,
  AssessmentSubmission,
  ProgressHistoryRecord,
  SkillGapAnalysisResult,
  ExtractedSkill
} from '../types';
import {
  JOB_ROLES_DATABASE,
  INITIAL_ROADMAP_STEPS,
  INITIAL_PROGRESS_HISTORY,
  ASSESSMENT_QUESTIONS
} from '../data/mockData';
import { calculateSkillGapAndReadiness } from '../services/nlpService';
import confetti from 'canvas-confetti';

export type NavigationTab =
  | 'dashboard'
  | 'resume-analysis'
  | 'job-matching'
  | 'skill-gap'
  | 'career-paths'
  | 'learning-roadmap'
  | 'skill-assessment'
  | 'progress'
  | 'career-report'
  | 'job-database'
  | 'resume-screening'
  | 'settings'
  | 'landing';

export interface UserSession {
  email: string;
  name: string;
}

interface AppContextType {
  currentUser: UserSession | null;
  loginUser: (email: string, pass: string) => { success: boolean; error?: string };
  registerUser: (name: string, email: string, pass: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  hasUploadedResume: boolean;
  setHasUploadedResume: (val: boolean) => void;
  profiles: CandidateProfile[];
  activeProfile: CandidateProfile;
  setActiveProfileId: (id: string) => void;
  jobRoles: JobRole[];
  targetRole: JobRole;
  setTargetRoleId: (id: string) => void;
  currentAnalysis: SkillGapAnalysisResult;
  roadmapSteps: LearningRoadmapStep[];
  toggleRoadmapStep: (id: string) => void;
  addRoadmapStepForSkill: (skillName: string) => void;
  assessmentSubmissions: AssessmentSubmission[];
  recordAssessmentResult: (submission: Omit<AssessmentSubmission, 'id' | 'date'>) => void;
  progressHistory: ProgressHistoryRecord[];
  addSkillToActiveProfile: (skill: ExtractedSkill) => void;
  updateProfileData: (updated: Partial<CandidateProfile>) => void;
  addNewJobRole: (role: JobRole) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('skillgap_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const loginUser = (email: string, pass: string) => {
    const usersStr = localStorage.getItem('skillgap_registered_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const found = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      return { success: false, error: 'No account found with this work email.' };
    }
    if (found.pass !== pass) {
      return { success: false, error: 'Incorrect password.' };
    }

    const session: UserSession = { email: found.email, name: found.name };
    setCurrentUser(session);
    localStorage.setItem('skillgap_auth_user', JSON.stringify(session));
    
    const userKeyEmail = found.email.toLowerCase();
    const savedUpload = localStorage.getItem(`skillgap_has_uploaded_${userKeyEmail}`);
    setHasUploadedResume(savedUpload ? JSON.parse(savedUpload) : false);

    return { success: true };
  };

  const registerUser = (name: string, email: string, pass: string) => {
    const usersStr = localStorage.getItem('skillgap_registered_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, error: 'An account with this work email already exists.' };
    }

    const newUser = { name, email, pass };
    users.push(newUser);
    localStorage.setItem('skillgap_registered_users', JSON.stringify(users));
    
    // Ensure new registered user starts with 0 upload state
    localStorage.setItem(`skillgap_has_uploaded_${email.toLowerCase()}`, JSON.stringify(false));
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('skillgap_auth_user');
    setHasUploadedResume(false);
    setActiveTab('dashboard');
  };

  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  // User-specific resume upload persistence key
  const userKey = currentUser ? currentUser.email.toLowerCase() : 'default';
  const uploadStorageKey = `skillgap_has_uploaded_${userKey}`;
  const profileStorageKey = `skillgap_profile_${userKey}`;

  const [hasUploadedResume, setHasUploadedResume] = useState<boolean>(() => {
    const saved = localStorage.getItem(uploadStorageKey);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(uploadStorageKey, JSON.stringify(hasUploadedResume));
  }, [hasUploadedResume, uploadStorageKey]);

  // Fresh Candidate Profile for New Users (0 skills before upload)
  const emptyFreshProfile: CandidateProfile = {
    id: `candidate-${userKey}`,
    name: currentUser ? currentUser.name : 'Candidate Profile',
    rollNumber: 'EMP-2026-01',
    email: currentUser ? currentUser.email : 'candidate@organization.com',
    institution: 'Professional Organization',
    department: 'Software Engineering',
    yearOfStudy: 'Experienced Professional',
    targetRole: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    summary: 'No resume analyzed yet. Upload your resume in the Resume Analysis section to generate your professional profile and skill-gap metrics.',
    education: [],
    projects: [],
    experience: [],
    certifications: [],
    skills: []
  };

  const [profiles, setProfiles] = useState<CandidateProfile[]>(() => {
    if (!hasUploadedResume) return [emptyFreshProfile];
    const saved = localStorage.getItem(profileStorageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) { /* ignore */ }
    }
    return [emptyFreshProfile];
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(profiles[0]?.id || 'candidate-primary');

  useEffect(() => {
    localStorage.setItem(profileStorageKey, JSON.stringify(profiles));
  }, [profiles, profileStorageKey]);

  // Job Roles
  const [jobRoles, setJobRoles] = useState<JobRole[]>(() => {
    const saved = localStorage.getItem('skillgap_job_roles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return JOB_ROLES_DATABASE;
  });

  const [targetRoleId, setTargetRoleId] = useState<string>('role-full-stack');

  // Roadmap Steps
  const [roadmapSteps, setRoadmapSteps] = useState<LearningRoadmapStep[]>(INITIAL_ROADMAP_STEPS);

  // Assessment Submissions
  const [assessmentSubmissions, setAssessmentSubmissions] = useState<AssessmentSubmission[]>([]);

  // Progress History
  const [progressHistory, setProgressHistory] = useState<ProgressHistoryRecord[]>(INITIAL_PROGRESS_HISTORY);

  // Derived Active Profile & Target Role
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || emptyFreshProfile;
  const targetRole = jobRoles.find(r => r.id === targetRoleId) || jobRoles[0] || JOB_ROLES_DATABASE[0];

  // Derived Analysis Result
  const rawAnalysis = calculateSkillGapAndReadiness(activeProfile, targetRole);
  const currentAnalysis = !hasUploadedResume ? {
    ...rawAnalysis,
    jobReadinessScore: 0,
    matchedCount: 0,
    missingCount: rawAnalysis.totalRequired,
    skillGapPercentage: 0,
    matchedSkills: [],
    missingSkills: rawAnalysis.missingSkills,
    highPriorityGaps: rawAnalysis.highPriorityGaps,
    mediumPriorityGaps: rawAnalysis.mediumPriorityGaps,
    lowPriorityGaps: rawAnalysis.lowPriorityGaps,
    improvementAreas: ['Upload your resume in the Resume Analysis section to analyze your profile and generate learning recommendations.']
  } : rawAnalysis;

  const toggleRoadmapStep = (id: string) => {
    setRoadmapSteps(prev =>
      prev.map(step => {
        if (step.id === id) {
          const nextCompleted = !step.completed;
          if (nextCompleted) {
            try {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
            } catch (e) { /* ignore */ }
          }
          return {
            ...step,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return step;
      })
    );
  };

  const addRoadmapStepForSkill = (skillName: string) => {
    if (roadmapSteps.some(s => s.skillName.toLowerCase() === skillName.toLowerCase())) {
      return;
    }
    const newStep: LearningRoadmapStep = {
      id: `step-${Date.now()}`,
      week: roadmapSteps.length + 1,
      skillName,
      title: `${skillName} Targeted Mastery Plan`,
      category: 'Development Tools',
      priority: 'High',
      concepts: [`Core principles, syntax, real-world patterns, and integration exercises for ${skillName}.`],
      resources: [
        { title: `${skillName} Official Documentation`, type: 'Documentation', provider: 'Foundation', url: 'https://developer.mozilla.org' }
      ],
      practiceTask: `Build a functional mini-feature demonstrating proficient usage of ${skillName}.`,
      projectSuggestion: `Incorporate ${skillName} into your capstone portfolio project.`,
      estimatedHours: 12,
      completed: false
    };
    setRoadmapSteps(prev => [...prev, newStep]);
  };

  const addSkillToActiveProfile = (skill: ExtractedSkill) => {
    setHasUploadedResume(true);
    setProfiles(prev =>
      prev.map(p => {
        if (p.id === activeProfile.id) {
          const existingIdx = p.skills.findIndex(
            s => s.normalizedName.toLowerCase() === skill.normalizedName.toLowerCase()
          );
          let newSkills = [...p.skills];
          if (existingIdx >= 0) {
            newSkills[existingIdx] = { ...newSkills[existingIdx], ...skill };
          } else {
            newSkills.push(skill);
          }
          return { ...p, skills: newSkills };
        }
        return p;
      })
    );
  };

  const updateProfileData = (updated: Partial<CandidateProfile>) => {
    setProfiles(prev =>
      prev.map(p => {
        if (p.id === activeProfile.id) {
          return { ...p, ...updated };
        }
        return p;
      })
    );
  };

  const recordAssessmentResult = (submissionData: Omit<AssessmentSubmission, 'id' | 'date'>) => {
    const submission: AssessmentSubmission = {
      ...submissionData,
      id: `sub-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setAssessmentSubmissions(prev => [submission, ...prev]);

    if (submission.passed) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) { /* ignore */ }

      addSkillToActiveProfile({
        name: submission.skill,
        normalizedName: submission.skill.toLowerCase(),
        category: 'Development Tools',
        proficiency: submission.proficiencyResult,
        confidence: submission.score,
        source: 'Assessment Verified',
        yearsExperience: 1
      });
    }
  };

  const addNewJobRole = (role: JobRole) => {
    setJobRoles(prev => [role, ...prev]);
  };

  const resetToDefaultData = () => {
    setHasUploadedResume(false);
    setProfiles([emptyFreshProfile]);
    setJobRoles(JOB_ROLES_DATABASE);
    setTargetRoleId('role-full-stack');
    setRoadmapSteps(INITIAL_ROADMAP_STEPS);
    setProgressHistory(INITIAL_PROGRESS_HISTORY);
    setAssessmentSubmissions([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        activeTab,
        setActiveTab,
        hasUploadedResume,
        setHasUploadedResume,
        profiles,
        activeProfile,
        setActiveProfileId,
        jobRoles,
        targetRole,
        setTargetRoleId,
        currentAnalysis,
        roadmapSteps,
        toggleRoadmapStep,
        addRoadmapStepForSkill,
        assessmentSubmissions,
        recordAssessmentResult,
        progressHistory,
        addSkillToActiveProfile,
        updateProfileData,
        addNewJobRole,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
