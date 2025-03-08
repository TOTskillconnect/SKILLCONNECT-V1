import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Rule {
  id: string;
  description: string;
  icon: string;
}

interface Pattern {
  id: string;
  sequence: string[];
  rules: Rule[];
}

interface AdaptivePuzzleProps {
  onComplete: (success: boolean, timeSpent: number, adaptations: string[]) => void;
}

export function AdaptivePuzzle({ onComplete }: AdaptivePuzzleProps) {
  const [currentPattern, setCurrentPattern] = useState<Pattern>({
    id: 'p1',
    sequence: ['🔵', '🔴', '🟡'],
    rules: [
      { id: 'r1', description: 'Match the pattern sequence', icon: '🎯' }
    ]
  });

  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [availableSymbols, setAvailableSymbols] = useState(['🔵', '🔴', '🟡', '🟢', '🟣']);
  const [score, setScore] = useState(0);
  const [adaptations, setAdaptations] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
  const [startTime] = useState(Date.now());
  const [difficulty, setDifficulty] = useState(1);
  const [showRuleChange, setShowRuleChange] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
      const success = score >= 100;
      const timeSpent = (Date.now() - startTime) / 1000;
      onComplete(success, timeSpent, adaptations);
    }
  }, [timeLeft, score, adaptations, onComplete, startTime]);

  const handleSymbolClick = (symbol: string) => {
    if (userSequence.length >= currentPattern.sequence.length) return;

    setUserSequence(prev => [...prev, symbol]);
  };

  useEffect(() => {
    if (userSequence.length === currentPattern.sequence.length) {
      const isCorrect = userSequence.every(
        (symbol, index) => symbol === currentPattern.sequence[index]
      );

      if (isCorrect) {
        setScore(prev => prev + 20);
        setAdaptations(prev => [...prev, `Completed pattern ${currentPattern.id}`]);
        
        // Increase difficulty
        setDifficulty(prev => prev + 1);
        setShowRuleChange(true);
        
        // Change pattern and rules
        setTimeout(() => {
          setShowRuleChange(false);
          setCurrentPattern({
            id: `p${difficulty + 1}`,
            sequence: generateNewSequence(difficulty + 1),
            rules: [
              { id: `r${difficulty + 1}`, description: getNewRule(difficulty + 1), icon: '🔄' }
            ]
          });
        }, 1500);
      }

      // Reset user sequence after a delay
      setTimeout(() => {
        setUserSequence([]);
      }, 1000);
    }
  }, [userSequence, currentPattern, difficulty]);

  const generateNewSequence = (level: number): string[] => {
    const length = Math.min(3 + level, 6);
    return Array.from({ length }, () => 
      availableSymbols[Math.floor(Math.random() * availableSymbols.length)]
    );
  };

  const getNewRule = (level: number): string => {
    const rules = [
      'Match the pattern sequence',
      'Match the pattern in reverse',
      'Match alternating symbols',
      'Skip one symbol in between',
      'Double each symbol'
    ];
    return rules[Math.min(level - 1, rules.length - 1)];
  };

  return (
    <div className="relative w-full min-h-[400px] bg-gray-900 rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-1">Progress</div>
            <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="text-gray-300">
            Level {difficulty}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-sm font-medium
          ${timeLeft > 45 ? 'bg-emerald-500/20 text-emerald-300' :
            timeLeft > 15 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'}`}>
          {timeLeft}s
        </div>
      </div>

      {/* Pattern Display */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-gray-300 font-medium">Current Pattern:</h3>
          {currentPattern.rules.map(rule => (
            <span key={rule.id} className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded text-sm text-gray-300">
              {rule.icon} {rule.description}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-6">
          {currentPattern.sequence.map((symbol, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg text-2xl"
            >
              {symbol}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {userSequence.map((symbol, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg text-2xl"
            >
              {symbol}
            </motion.div>
          ))}
          {Array.from({ length: currentPattern.sequence.length - userSequence.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700"
            />
          ))}
        </div>
      </div>

      {/* Available Symbols */}
      <div className="flex items-center gap-4 justify-center">
        {availableSymbols.map((symbol, index) => (
          <motion.button
            key={index}
            onClick={() => handleSymbolClick(symbol)}
            className="w-12 h-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 
              rounded-lg text-2xl transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {symbol}
          </motion.button>
        ))}
      </div>

      {/* Rule Change Notification */}
      <AnimatePresence>
        {showRuleChange && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              bg-accent/90 text-white px-6 py-3 rounded-lg text-lg font-medium"
          >
            Rules are changing! Adapt quickly!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
        text-center text-gray-400 text-sm bg-gray-800/80 px-4 py-2 rounded-lg">
        Match the pattern according to the current rules. Be ready to adapt when rules change!
      </div>
    </div>
  );
} 