import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitPuzzle } from './puzzles/CircuitPuzzle';

interface BehavioralTrait {
  name: string;
  score: number;
  evidence: string[];
}

interface PuzzleState {
  id: string;
  type: 'pattern' | 'resource' | 'adaptive' | 'team' | 'persistence';
  completed: boolean;
  timeSpent: number;
  traits: BehavioralTrait[];
}

const TRAIT_NAMES = ['Problem Solving', 'Adaptability', 'Innovation', 'Teamwork', 'Grit'] as const;
type TraitName = typeof TRAIT_NAMES[number];

const PUZZLE_NAMES = [
  'Circuit Connection',
  'Network Allocation',
  'Data Flow',
  'Team Protocol',
  'System Recovery'
] as const;

const ASSESSMENT_DURATION = 900; // 15 minutes in seconds

export function BehavioralAssessment() {
  const [timeRemaining, setTimeRemaining] = useState(ASSESSMENT_DURATION);
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleState | null>(null);
  const [completedPuzzles, setCompletedPuzzles] = useState<PuzzleState[]>([]);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize trait scores calculation to prevent unnecessary recalculations
  const traitScores = useMemo(() => {
    return TRAIT_NAMES.map(traitName => {
      const matchingTraits = completedPuzzles
        .flatMap(puzzle => puzzle.traits)
        .filter(t => t.name === traitName);

      const score = matchingTraits.length > 0
        ? Math.round(matchingTraits.reduce((sum, t) => sum + t.score, 0) / matchingTraits.length)
        : Math.min(completedPuzzles.length * 2, 10);

      return {
        name: traitName,
        score,
        displayScore: `${score}/10`
      };
    });
  }, [completedPuzzles]);

  // Optimized timer implementation using requestAnimationFrame
  useEffect(() => {
    if (timeRemaining <= 0 || isAssessmentComplete) {
      if (timeRemaining === 0) {
        setIsAssessmentComplete(true);
      }
      return;
    }

    let lastTime = Date.now();
    const updateTimer = () => {
      const currentTime = Date.now();
      const deltaTime = Math.floor((currentTime - lastTime) / 1000);
      
      if (deltaTime >= 1) {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsAssessmentComplete(true);
            return 0;
          }
          return prev - deltaTime;
        });
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateTimer);
    };

    const animationFrame = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animationFrame);
  }, [timeRemaining, isAssessmentComplete]);

  // Memoized time formatting
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const remainingSeconds = timeRemaining % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  // Error boundary wrapper
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-800">Something went wrong</h2>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePuzzleComplete = useCallback((success: boolean, timeSpent: number) => {
    if (!currentPuzzle || !success) return;

    const puzzleTraits: BehavioralTrait[] = [
      {
        name: 'Problem Solving',
        score: Math.round(Math.random() * 3 + 7), // Score between 7-10
        evidence: ['Completed circuit efficiently']
      },
      {
        name: 'Innovation',
        score: Math.round(Math.random() * 3 + 6), // Score between 6-9
        evidence: ['Found optimal connection path']
      }
    ];

    setCompletedPuzzles(prev => [...prev, {
      ...currentPuzzle,
      completed: true,
      timeSpent,
      traits: puzzleTraits
    }]);
    setCurrentPuzzle(null);
  }, [currentPuzzle]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-primary-text">Behavioral Assessment</h1>
              <p className="mt-1 text-sm text-secondary-text">Complete the puzzles to assess your behavioral traits</p>
            </div>
            <div className="text-2xl font-mono font-semibold text-primary-text">
              {formattedTime}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 10 M 10 10 L 10 0" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                  </pattern>
                  <rect x="0" y="0" width="100" height="100" fill="url(#circuit)"/>
                </svg>
              </div>
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {currentPuzzle ? (
                    <motion.div
                      key={currentPuzzle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="min-h-[400px]"
                    >
                      <CircuitPuzzle onComplete={handlePuzzleComplete} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="min-h-[400px] flex items-center justify-center"
                    >
                      <button
                        onClick={() => setCurrentPuzzle({
                          id: Date.now().toString(),
                          type: 'pattern',
                          completed: false,
                          timeSpent: 0,
                          traits: []
                        })}
                        className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 
                          transition-colors flex items-center gap-2"
                      >
                        <span>Start First Puzzle</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-primary-text mb-4">Progress</h2>
              <div className="space-y-4">
                {PUZZLE_NAMES.map((puzzleName, index) => (
                  <div key={puzzleName} className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      index === completedPuzzles.length ? 'bg-accent/10' : 
                      index < completedPuzzles.length ? 'bg-success-light' : 'bg-form-background'
                    }`}>
                      <svg className={`w-5 h-5 ${
                        index === completedPuzzles.length ? 'text-accent' :
                        index < completedPuzzles.length ? 'text-success' : 'text-secondary-text'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {index < completedPuzzles.length ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        )}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-primary-text">{puzzleName}</span>
                        <span className="text-xs text-secondary-text">
                          {index < completedPuzzles.length ? 'Completed' : 
                           index === completedPuzzles.length ? 'Current' : 'Locked'}
                        </span>
                      </div>
                      <div className="h-2 bg-form-background rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${
                          index < completedPuzzles.length ? 'bg-success w-full' :
                          index === completedPuzzles.length ? 'bg-accent w-1/2' : 'w-0'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-primary-text mb-4">Trait Analysis</h2>
              <div className="space-y-4">
                {traitScores.map(({ name, score, displayScore }) => (
                  <div key={name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-primary-text">{name}</span>
                      <span className="text-secondary-text">{displayScore}</span>
                    </div>
                    <div className="h-2 bg-form-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-blue-500"
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}