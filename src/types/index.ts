export type SkillCategory =
  | 'Programming Languages'
  | 'Frameworks & Libraries'
  | 'Databases'
  | 'Development Tools'
  | 'Cloud & Emerging Technologies'
  | 'Data Science & AI'
  | 'Professional Skills';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced';

export interface ExtractedSkill {
  name: string;
  category: SkillCategory;
  normalizedName: string;
  proficiency: ProficiencyLevel;
  confidence: number; // 0 to 100
  source: 'Resume' | 'Assessment Verified' | 'Manual' | 'Project';
  yearsExperience?: number;
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  specialization: string;
  year: string;
  grade?: string;
}

export interface CandidateProject {
  title: string;
  description: string;
  technologies: string[];
  role?: string;
}

export interface CandidateExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  institution: string;
  department: string;
  yearOfStudy: string;
  targetRole: string;
  avatar?: string;
  summary: string;
  education: CandidateEducation[];
  projects: CandidateProject[];
  experience: CandidateExperience[];
  certifications: string[];
  skills: ExtractedSkill[];
}

export interface JobRequirementSkill {
  name: string;
  normalizedName: string;
  category: SkillCategory;
  priority: PriorityLevel;
  requiredProficiency: ProficiencyLevel;
  weight: number; // 1 to 5
  description?: string;
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  description: string;
  averageSalaryRange: string;
  requiredSkills: JobRequirementSkill[];
  educationRequirement: string;
  certificationsRecommended: string[];
}

export interface SkillGapItem {
  skillName: string;
  category: SkillCategory;
  priority: PriorityLevel;
  currentProficiency: ProficiencyLevel | 'None';
  requiredProficiency: ProficiencyLevel;
  gapPercentage: number; // e.g. 80%
  estimatedWeeks: number;
  importanceDescription: string;
}

export interface SkillGapAnalysisResult {
  roleId: string;
  roleTitle: string;
  totalRequired: number;
  matchedCount: number;
  missingCount: number;
  skillGapPercentage: number; // 0 to 100
  jobReadinessScore: number; // 0 to 100
  readinessLevel: 'Job Ready' | 'Near Ready' | 'Developing' | 'Needs Foundation';
  matchedSkills: ExtractedSkill[];
  missingSkills: SkillGapItem[];
  highPriorityGaps: SkillGapItem[];
  mediumPriorityGaps: SkillGapItem[];
  lowPriorityGaps: SkillGapItem[];
  improvementAreas: string[];
}

export interface LearningRoadmapStep {
  id: string;
  week: number;
  skillName: string;
  title: string;
  category: SkillCategory;
  priority: PriorityLevel;
  concepts: string[];
  resources: {
    title: string;
    type: 'Documentation' | 'Interactive Course' | 'Guide' | 'Video Tutorial';
    provider: string;
    url: string;
  }[];
  practiceTask: string;
  projectSuggestion: string;
  estimatedHours: number;
  completed: boolean;
  completedAt?: string;
}

export interface AssessmentQuestion {
  id: string;
  skill: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AssessmentSubmission {
  id: string;
  skill: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  score: number; // out of 100
  totalQuestions: number;
  correctCount: number;
  proficiencyResult: ProficiencyLevel;
  date: string;
  passed: boolean;
}

export interface ProgressHistoryRecord {
  id: string;
  date: string;
  jobReadinessScore: number;
  skillGapPercentage: number;
  skillsMatchedCount: number;
  skillsTotalCount: number;
  notes: string;
}

export interface JobRecord {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  location: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceMin: number;
  experienceMax: number;
  education: string;
  eligibility: string;
  salary: string;
  stipend: string;
  jobType: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  description: string;
  source: string;
  sourceUrl?: string;
  postedDate: string;
  deadline?: string;
  status: 'Active' | 'Closing Soon' | 'Filled';
}

