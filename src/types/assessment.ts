export type AssessmentType = 'job-knowledge' | 'behavioral' | 'roleplay' | 'situational';

export type AssessmentStatus = 'pending' | 'in_progress' | 'completed' | 'reviewed';

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'coding' | 'text' | 'scenario';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface AssessmentTemplate {
  id: string;
  type: AssessmentType;
  title: string;
  description: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: Question[];
  targetRole: string[];
  skillsAssessed: string[];
}

export interface CandidateAssessment {
  id: string;
  templateId: string;
  candidateId: string;
  status: AssessmentStatus;
  startedAt?: string;
  completedAt?: string;
  score?: number;
  feedback?: string;
  answers?: {
    questionId: string;
    answer: string;
  }[];
}

export interface AssessmentResult {
  assessmentId: string;
  candidateId: string;
  score: number;
  feedback: string;
  completedAt: string;
  detailedScores: {
    category: string;
    score: number;
    maxScore: number;
    feedback?: string;
  }[];
} 