import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Decision {
  id: string;
  title: string;
  description: string;
  context: string;
  options: {
    id: string;
    text: string;
    risk: number; // 0-100
    reward: number; // 0-100
    icon: string;
  }[];
}

interface DecisionPuzzleProps {
  onComplete: (success: boolean, timeSpent: number) => void;
}

export function DecisionPuzzle({ onComplete }: DecisionPuzzleProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [score, setScore] = useState(0);
  const [riskProfile, setRiskProfile] = useState(50);
  const [timeLeft, setTimeLeft] = useState(60);
  const [decisionCount, setDecisionCount] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!showInstructions) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            const timeSpent = (Date.now() - startTime) / 1000;
            onComplete(score >= 70, timeSpent);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      if (!currentDecision) {
        setCurrentDecision(generateNextDecision(decisionCount + 1));
      }

      return () => clearInterval(timer);
    }
  }, [showInstructions, currentDecision, score, decisionCount, startTime, onComplete]);

  const handleDecision = (option: Decision['options'][0]) => {
    // Update score based on reward and risk balance
    const decisionScore = (option.reward + (100 - option.risk)) / 2;
    setScore(prev => Math.min(100, prev + decisionScore / 5));
    
    // Update risk profile
    setRiskProfile(prev => (prev + option.risk) / 2);
    
    // Move to next decision
    setDecisionCount(prev => prev + 1);
    setCurrentDecision(generateNextDecision(decisionCount + 2));
  };

  const generateNextDecision = (count: number): Decision => {
    const decisions: Decision[] = [
      {
        id: 'd1',
        title: 'Market Strategy',
        description: 'Choose your approach to entering a new market',
        context: 'Your company is planning to expand into a new region. You need to decide on the entry strategy.',
        options: [
          {
            id: 'o1',
            text: 'Aggressive expansion with high investment',
            risk: 80,
            reward: 100,
            icon: '🚀'
          },
          {
            id: 'o2',
            text: 'Gradual market penetration',
            risk: 40,
            reward: 60,
            icon: '📈'
          },
          {
            id: 'o3',
            text: 'Partnership with local business',
            risk: 30,
            reward: 50,
            icon: '🤝'
          }
        ]
      },
      {
        id: 'd2',
        title: 'Resource Allocation',
        description: 'How would you allocate the limited project resources?',
        context: 'Your team has received additional funding, but it\'s not enough to cover all planned improvements. You need to decide how to allocate these resources effectively.',
        options: [
          {
            id: 'o1',
            text: 'Invest heavily in cutting-edge tools',
            risk: 70,
            reward: 90,
            icon: '💎'
          },
          {
            id: 'o2',
            text: 'Maintain a balanced resource distribution',
            risk: 40,
            reward: 60,
            icon: '📊'
          },
          {
            id: 'o3',
            text: 'Focus on essential needs only',
            risk: 20,
            reward: 30,
            icon: '🎯'
          }
        ]
      },
      {
        id: 'd3',
        title: 'Innovation Investment',
        description: 'Select your innovation strategy',
        context: 'A disruptive technology has emerged in your industry. You need to decide how to respond.',
        options: [
          {
            id: 'o1',
            text: 'Be an early adopter',
            risk: 90,
            reward: 120,
            icon: '⚡'
          },
          {
            id: 'o2',
            text: 'Wait and analyze market response',
            risk: 50,
            reward: 70,
            icon: '🔍'
          },
          {
            id: 'o3',
            text: 'Stick to current technology',
            risk: 30,
            reward: 40,
            icon: '🛡️'
          }
        ]
      }
    ];

    return decisions[Math.min(count - 1, decisions.length - 1)];
  };

  if (showInstructions) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Strategic Decision Making
        </h2>
        <p className="text-gray-600 mb-6">
          You will be presented with a series of business scenarios. For each one:
          <br />1. Carefully read the context
          <br />2. Evaluate the risk and potential reward of each option
          <br />3. Make your decision within the time limit
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Success Criteria</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maintain a score above 70%</li>
            <li>• Complete all decisions within the time limit</li>
            <li>• Balance risk and reward effectively</li>
          </ul>
        </div>
        <button
          onClick={() => setShowInstructions(false)}
          className="w-full py-3 px-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Performance</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{Math.round(score)}%</span>
              <span className="text-sm text-gray-500">Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{Math.round(riskProfile)}%</span>
              <span className="text-sm text-gray-500">Risk Profile</span>
            </div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg text-lg font-medium ${
          timeLeft > 30 ? 'bg-emerald-100 text-emerald-700' :
          timeLeft > 10 ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {timeLeft}s
        </div>
      </div>

      {/* Decision Card */}
      <AnimatePresence mode="wait">
        {currentDecision && (
          <motion.div
            key={currentDecision.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentDecision.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentDecision.description}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                {currentDecision.context}
              </p>
            </div>
            <div className="space-y-3">
              {currentDecision.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDecision(option)}
                  className="w-full p-4 bg-white border rounded-lg hover:border-accent hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {option.icon}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{option.text}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-red-600">Risk:</span>
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${option.risk}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-emerald-600">Reward:</span>
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500"
                              style={{ width: `${option.reward}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 