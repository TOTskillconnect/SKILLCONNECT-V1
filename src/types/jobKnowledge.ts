export type QuestionType = 'coding_challenge' | 'technical_scenario';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  timeLimit: number; // in seconds
  competencies: string[];
  points: number;
}

export interface CodingChallenge extends BaseQuestion {
  type: 'coding_challenge';
  prompt: string;
  starterCode?: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

export interface TechnicalScenario extends BaseQuestion {
  type: 'technical_scenario';
  scenario: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export type Question = CodingChallenge | TechnicalScenario;

export interface AssessmentProgress {
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    answer: string;
    timeSpent: number;
  }>;
  score: number;
  competencyScores: Record<string, number>;
} 