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
  status: 'pending' | 'in_progress' | 'completed';
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
} 