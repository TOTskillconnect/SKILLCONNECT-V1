import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResourcePuzzle } from './puzzles/ResourcePuzzle';
import { ConversationPuzzle } from './puzzles/ConversationPuzzle';
import { AdaptivePuzzle } from './puzzles/AdaptivePuzzle';
import { DecisionPuzzle } from './puzzles/DecisionPuzzle';

interface PuzzleState {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  completed: boolean;
  timeSpent: number;
}

export function BehavioralAssessment() {
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleState | null>(null);
  const [puzzles, setPuzzles] = useState<PuzzleState[]>([
    {
      id: 'resource',
      title: 'Allocation Arena',
      description: 'Master the art of strategic resource allocation. Navigate complex scenarios and optimize your resources to maximize impact under time pressure.',
      component: ResourcePuzzle,
      completed: false,
      timeSpent: 0
    },
    {
      id: 'conversation',
      title: 'Engagement',
      description: 'Handle interpersonal interactions and demonstrate effective communication. Choose appropriate responses to build rapport and achieve objectives.',
      component: ConversationPuzzle,
      completed: false,
      timeSpent: 0
    },
    {
      id: 'adaptive',
      title: 'Pattern Recognition',
      description: 'Identify and adapt to changing patterns. Learn new rules quickly and demonstrate flexibility in your problem-solving approach.',
      component: AdaptivePuzzle,
      completed: false,
      timeSpent: 0
    },
    {
      id: 'decision',
      title: 'Strategic Decisions',
      description: 'Make critical business decisions considering risk and reward. Balance short-term gains with long-term strategic impact.',
      component: DecisionPuzzle,
      completed: false,
      timeSpent: 0
    }
  ]);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isAssessmentComplete && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsAssessmentComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAssessmentComplete, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePuzzleComplete = (puzzleId: string, success: boolean, timeSpent: number) => {
    setPuzzles(prev => prev.map(puzzle => 
      puzzle.id === puzzleId
        ? { ...puzzle, completed: true, timeSpent }
        : puzzle
    ));
    setCurrentPuzzle(null);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Behavioral Assessment</h1>
        <div className={`px-4 py-2 rounded-lg text-lg font-medium ${
          timeRemaining > 300 ? 'bg-emerald-100 text-emerald-700' :
          timeRemaining > 120 ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {formatTime(timeRemaining)}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Main Content Area */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            {currentPuzzle ? (
              <motion.div
                key={currentPuzzle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6"
              >
                <div className="mb-6">
                  <button
                    onClick={() => setCurrentPuzzle(null)}
                    className="text-gray-500 hover:text-gray-700 mb-4"
                  >
                    ← Back to puzzles
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {currentPuzzle.title}
                  </h2>
                  <p className="text-gray-600">
                    {currentPuzzle.description}
                  </p>
                </div>
                <currentPuzzle.component
                  onComplete={(success: boolean, time: number) => 
                    handlePuzzleComplete(currentPuzzle.id, success, time)}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {isAssessmentComplete 
                      ? "Assessment Complete!"
                      : "Welcome to the Behavioral Assessment"}
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {isAssessmentComplete
                      ? "Thank you for completing the assessment. Your results are being analyzed."
                      : "Complete the following puzzles to demonstrate your problem-solving, decision-making, and adaptability skills. Each puzzle has a time limit and specific objectives."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {puzzles.map((puzzle) => (
                    <button
                      key={puzzle.id}
                      onClick={() => !puzzle.completed && !currentPuzzle && setCurrentPuzzle(puzzle)}
                      disabled={puzzle.completed || !!currentPuzzle || isAssessmentComplete}
                      className={`p-6 rounded-xl border text-left transition-all
                        ${puzzle.completed
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-white border-gray-200 hover:border-accent hover:shadow-md'
                        } ${(!!currentPuzzle || isAssessmentComplete) && !puzzle.completed
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                        }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {puzzle.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {puzzle.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className={puzzle.completed ? 'text-emerald-600' : 'text-gray-500'}>
                          {puzzle.completed ? 'Completed' : 'Not started'}
                        </span>
                        {puzzle.completed && (
                          <span className="text-gray-500">
                            {formatTime(puzzle.timeSpent)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 