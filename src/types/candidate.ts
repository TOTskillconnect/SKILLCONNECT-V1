export interface SkillRating {
  name: string;
  score: number;
}

export interface BehavioralTrait {
  name: string;
  score: number;
}

export interface CulturalValue {
  name: string;
  score: number;
}

export interface Assessment {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  score?: number;
  feedback?: string;
  completedAt?: string;
}

export interface HireContextPreference {
  categoryId: string;
  preferredContexts: string[];
  experienceLevel: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  industry: string;
  yearsOfExperience: number;
  resumeSummary: string;
  technicalSkills: SkillRating[];
  softSkills: SkillRating[];
  behavioralTraits: BehavioralTrait[];
  culturalValues: CulturalValue[];
  hireContextPreferences: HireContextPreference[];
  stage?: 'shortlisted' | 'screening' | 'validating' | 'interview' | 'offer';
  profileImage?: string;
  assessments?: Assessment[];
  availability?: boolean;
} 