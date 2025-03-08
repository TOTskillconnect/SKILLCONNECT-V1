'use client';

import { useState, useMemo } from 'react';
import { ValidationError } from '../AssessmentContext';

// Styles
export const assessmentStyles = {
  colors: {
    primary: '#714b67',
    secondary: '#fbb130',
    accent: '#1ad3bb',
    error: '#ef4444',
  },
  components: {
    card: 'bg-[#ffffff] rounded-xl shadow-sm p-6',
    progressBar: 'h-2 bg-[#f3f4f6] rounded-full overflow-hidden',
    errorText: 'text-red-500 text-sm font-medium',
  }
};

// Props interfaces
interface ScoreProgressBarProps {
  score: number;
  category: string;
  color: string;
  maxScore?: number;
}

interface StageTrackerProps {
  stage: string;
  totalStages: number;
  onStageChange?: (stage: string) => void;
  onError?: (error: Error) => void;
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

export function ScoreProgressBar({ score, category, color, maxScore = 100 }: ScoreProgressBarProps) {
  const [error, setError] = useState<Error | null>(null);
  
  const validatedWidth = useMemo(() => {
    try {
      validateScore(score, maxScore);
      return `${(score / maxScore) * 100}%`;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Invalid score'));
      return '0%';
    }
  }, [score, maxScore]);

  if (error) {
    return (
      <div className={assessmentStyles.components.errorText}>
        Error displaying progress: {error.message}
      </div>
    );
  }

  return (
    <div className={assessmentStyles.components.progressBar}>
      <div
        className="h-full transition-all duration-300"
        style={{ 
          width: validatedWidth,
          backgroundColor: color 
        }}
      />
    </div>
  );
}

export function AssessmentStageTracker({ stage, totalStages, onStageChange, onError }: StageTrackerProps) {
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    try {
      validateStage(stage, totalStages);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Invalid stage'));
      onError?.(err instanceof Error ? err : new Error('Invalid stage'));
    }
  }, [stage, totalStages, onError]);

  if (error) {
    return (
      <div className={assessmentStyles.components.errorText}>
        Error tracking stage: {error.message}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-[#714b67]">
        Stage {stage} of {totalStages}
      </span>
      <div className={assessmentStyles.components.progressBar}>
        <div
          className="h-full bg-[#1ad3bb] transition-all duration-300"
          style={{ 
            width: `${(parseInt(stage) / totalStages) * 100}%`
          }}
        />
      </div>
    </div>
  );
} 