'use client';

import { useState } from 'react';
import { UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface TeamDynamicsSimulationProps {
  onComplete: (score: number) => void;
}

interface Scenario {
  id: string;
  situation: string;
  options: {
    id: string;
    text: string;
    score: number;
    feedback: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 'conflict',
    situation: 'Two team members disagree on the technical approach for a critical feature. How do you handle this situation?',
    options: [
      {
        id: 'a1',
        text: 'Schedule a meeting to discuss both approaches, focusing on technical merits and trade-offs',
        score: 100,
        feedback: 'Excellent approach! Facilitating an open discussion promotes collaboration and informed decision-making.'
      },
      {
        id: 'a2',
        text: 'Let them work on both approaches separately and choose the better one later',
        score: 50,
        feedback: 'While this allows exploration, it may waste resources and create team division.'
      },
      {
        id: 'a3',
        text: 'Make the decision yourself to save time and move forward',
        score: 25,
        feedback: 'This misses an opportunity for team learning and may reduce buy-in.'
      }
    ]
  },
  {
    id: 'feedback',
    situation: "A junior team member submits code that doesn't meet the team's quality standards. How do you address this?",
    options: [
      {
        id: 'b1',
        text: 'Schedule a pair programming session to review and improve the code together',
        score: 100,
        feedback: 'Perfect! This provides hands-on learning and maintains a supportive environment.'
      },
      {
        id: 'b2',
        text: 'Leave detailed comments in the code review explaining what needs to change',
        score: 75,
        feedback: 'Good communication, but a more interactive approach might be more effective for learning.'
      },
      {
        id: 'b3',
        text: 'Fix the code yourself and send it back as an example',
        score: 25,
        feedback: 'This misses a teaching opportunity and may discourage the team member.'
      }
    ]
  },
  {
    id: 'innovation',
    situation: "During a team brainstorming session, someone proposes a risky but innovative solution. How do you respond?",
    options: [
      {
        id: 'c1',
        text: "Encourage them to elaborate and help the team explore the idea's potential and risks",
        score: 100,
        feedback: 'Excellent! This fosters innovation while ensuring thorough evaluation.'
      },
      {
        id: 'c2',
        text: 'Suggest focusing on more conventional approaches to meet the deadline',
        score: 50,
        feedback: 'While safer, this may discourage future creative thinking.'
      },
      {
        id: 'c3',
        text: 'Dismiss the idea as too risky and move on',
        score: 0,
        feedback: 'This approach can stifle innovation and team member engagement.'
      }
    ]
  }
];

export function TeamDynamicsSimulation({ onComplete }: TeamDynamicsSimulationProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    const scenario = scenarios[currentScenario];
    const option = scenario.options.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    
    const newScores = [...scores, option.score];
    setScores(newScores);

    if (currentScenario === scenarios.length - 1) {
      // Calculate final score (average of all scenario scores)
      const finalScore = Math.round(newScores.reduce((sum, score) => sum + score, 0) / scenarios.length);
      setTimeout(() => onComplete(finalScore), 2000);
    }
  };

  const handleNext = () => {
    setCurrentScenario(prev => prev + 1);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const scenario = scenarios[currentScenario];
  const selectedOptionData = scenario.options.find(opt => opt.id === selectedOption);

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-accent" />
          <span className="font-medium text-gray-900">
            Scenario {currentScenario + 1} of {scenarios.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Average Score: {scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0}
          </span>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-accent" />
            </div>
            <p className="text-lg text-gray-900">{scenario.situation}</p>
          </div>

          <div className="space-y-3">
            {scenario.options.map((option) => (
              <button
                key={option.id}
                onClick={() => !showFeedback && handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`
                  w-full p-4 text-left border rounded-lg transition-colors
                  ${showFeedback && option.id === selectedOption
                    ? 'border-accent bg-accent/5'
                    : 'hover:bg-gray-50'}
                  ${showFeedback && option.id !== selectedOption ? 'opacity-50' : ''}
                `}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && selectedOptionData && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                selectedOptionData.score >= 75 ? 'bg-green-100' : 
                selectedOptionData.score >= 50 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <UserGroupIcon className={`w-5 h-5 ${
                  selectedOptionData.score >= 75 ? 'text-green-600' : 
                  selectedOptionData.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    Score: {selectedOptionData.score}%
                  </span>
                </div>
                <p className="text-gray-600">{selectedOptionData.feedback}</p>
              </div>
            </div>
            {currentScenario < scenarios.length - 1 && (
              <button
                onClick={handleNext}
                className="mt-4 w-full py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Next Scenario
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 