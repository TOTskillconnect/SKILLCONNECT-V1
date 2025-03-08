'use client';

import { createContext, PropsWithChildren, useState, useEffect } from 'react';

// Custom error classes
export class AssessmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssessmentError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Validation functions
const validateScore = (score: number, maxScore: number = 100): boolean => {
  if (typeof score !== 'number' || isNaN(score)) {
    throw new ValidationError('Score must be a valid number');
  }
  if (score < 0 || score > maxScore) {
    throw new ValidationError(`Score must be between 0 and ${maxScore}`);
  }
  return true;
};

const validateStage = (stage: string, totalStages: number): boolean => {
  if (typeof stage !== 'string' || !stage.trim()) {
    throw new ValidationError('Stage must be a non-empty string');
  }
  if (typeof totalStages !== 'number' || totalStages < 1) {
    throw new ValidationError('Total stages must be a positive number');
  }
  return true;
};

// Types
export interface AssessmentScore {
  category: string;
  value: number;
  maxValue: number;
}

export interface AssessmentProgress {
  currentStage: string;
  totalStages: number;
  scores: AssessmentScore[];
}

export interface AssessmentContextType {
  currentAssessment: string | null;
  progress: AssessmentProgress;
  scores: AssessmentScore[];
  error: Error | null;
  updateProgress: (progress: Partial<AssessmentProgress>) => void;
  updateScores: (scores: AssessmentScore[]) => void;
  clearError: () => void;
}

// Create the context
export const AssessmentContext = createContext<AssessmentContextType | null>(null);

// Provider component
export function AssessmentProvider({ children }: PropsWithChildren) {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [progress, setProgress] = useState<AssessmentProgress>({
    currentStage: 'initial',
    totalStages: 0,
    scores: []
  });
  const [scores, setScores] = useState<AssessmentScore[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const updateProgress = (newProgress: Partial<AssessmentProgress>) => {
    try {
      validateStage(
        newProgress.currentStage || progress.currentStage,
        newProgress.totalStages || progress.totalStages
      );
      setProgress(prev => ({ ...prev, ...newProgress }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Invalid progress update'));
    }
  };

  const updateScores = (newScores: AssessmentScore[]) => {
    try {
      newScores.forEach(score => {
        validateScore(score.value, score.maxValue);
      });
      setScores(newScores);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Invalid scores update'));
    }
  };

  const clearError = () => setError(null);

  const value = {
    currentAssessment,
    progress,
    scores,
    error,
    updateProgress,
    updateScores,
    clearError
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
} 