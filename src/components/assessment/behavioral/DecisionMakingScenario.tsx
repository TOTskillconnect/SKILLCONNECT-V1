'use client';

import { useState } from 'react';
import { LightBulbIcon, ClockIcon } from '@heroicons/react/24/outline';

interface DecisionMakingScenarioProps {
  onComplete: (score: number) => void;
}

interface Decision {
  id: string;
  scenario: string;
  context: string;
  options: {
    id: string;
    text: string;
    impact: {
      time: number;
      quality: number;
      team: number;
      business: number;
    };
    feedback: string;
  }[];
}

const decisions: Decision[] = [
  {
    id: 'deadline',
    scenario: 'Project Deadline Challenge',
    context: 'Your team is behind schedule on a critical project. The deadline is approaching, and stakeholders are getting concerned.',
    options: [
      {
        id: 'd1',
        text: 'Analyze the situation with the team, identify bottlenecks, and propose a realistic revised timeline',
        impact: {
          time: 70,
          quality: 90,
          team: 100,
          business: 85
        },
        feedback: 'Strong leadership approach that maintains quality and team morale while being transparent with stakeholders.'
      },
      {
        id: 'd2',
        text: 'Push the team to work overtime to meet the original deadline',
        impact: {
          time: 90,
          quality: 60,
          team: 40,
          business: 75
        },
        feedback: 'While this meets the deadline, it risks burnout and may impact code quality.'
      },
      {
        id: 'd3',
        text: 'Reduce the scope without consulting stakeholders',
        impact: {
          time: 100,
          quality: 70,
          team: 60,
          business: 30
        },
        feedback: 'This may solve the immediate problem but damages trust and alignment with business goals.'
      }
    ]
  },
  {
    id: 'quality',
    scenario: 'Quality vs Speed Trade-off',
    context: 'A major bug is discovered in production. The quick fix is available but might cause issues in the future.',
    options: [
      {
        id: 'q1',
        text: 'Take time to properly analyze and fix the root cause',
        impact: {
          time: 60,
          quality: 100,
          team: 90,
          business: 80
        },
        feedback: 'Best long-term solution that prevents future issues and maintains code quality.'
      },
      {
        id: 'q2',
        text: 'Apply the quick fix now and plan to refactor later',
        impact: {
          time: 90,
          quality: 60,
          team: 70,
          business: 75
        },
        feedback: 'Balances immediate needs with future maintenance, but risks technical debt.'
      },
      {
        id: 'q3',
        text: 'Roll back to the previous version while investigating',
        impact: {
          time: 80,
          quality: 80,
          team: 80,
          business: 60
        },
        feedback: 'Safe approach but may impact business operations longer than necessary.'
      }
    ]
  }
];

export function DecisionMakingScenario({ onComplete }: DecisionMakingScenarioProps) {
  const [currentDecision, setCurrentDecision] = useState(0);
  const [showImpact, setShowImpact] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  const handleOptionSelect = (optionId: string) => {
    const decision = decisions[currentDecision];
    const option = decision.options.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    setSelectedOption(optionId);
    setShowImpact(true);
    
    // Calculate score based on impact metrics
    const score = Math.round(
      (option.impact.time + option.impact.quality + option.impact.team + option.impact.business) / 4
    );
    
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentDecision === decisions.length - 1) {
      // Calculate final score (average of all decision scores)
      const finalScore = Math.round(newScores.reduce((sum, score) => sum + score, 0) / decisions.length);
      setTimeout(() => onComplete(finalScore), 2000);
    }
  };

  const handleNext = () => {
    setCurrentDecision(prev => prev + 1);
    setShowImpact(false);
    setSelectedOption(null);
  };

  const decision = decisions[currentDecision];
  const selectedOptionData = decision.options.find(opt => opt.id === selectedOption);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <LightBulbIcon className="w-5 h-5 text-accent" />
          <span className="font-medium text-gray-900">
            Decision {currentDecision + 1} of {decisions.length}
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{decision.scenario}</h3>
          <p className="text-gray-600 mb-6">{decision.context}</p>

          <div className="space-y-3">
            {decision.options.map((option) => (
              <button
                key={option.id}
                onClick={() => !showImpact && handleOptionSelect(option.id)}
                disabled={showImpact}
                className={`
                  w-full p-4 text-left border rounded-lg transition-colors
                  ${showImpact && option.id === selectedOption
                    ? 'border-accent bg-accent/5'
                    : 'hover:bg-gray-50'}
                  ${showImpact && option.id !== selectedOption ? 'opacity-50' : ''}
                `}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Analysis */}
        {showImpact && selectedOptionData && (
          <div className="p-4 bg-gray-50 border-t">
            <h4 className="font-medium text-gray-900 mb-4">Impact Analysis</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Time Efficiency</span>
                  <span className="text-sm font-medium text-gray-900">{selectedOptionData.impact.time}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${selectedOptionData.impact.time}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Quality</span>
                  <span className="text-sm font-medium text-gray-900">{selectedOptionData.impact.quality}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${selectedOptionData.impact.quality}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Team Morale</span>
                  <span className="text-sm font-medium text-gray-900">{selectedOptionData.impact.team}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${selectedOptionData.impact.team}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Business Value</span>
                  <span className="text-sm font-medium text-gray-900">{selectedOptionData.impact.business}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${selectedOptionData.impact.business}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{selectedOptionData.feedback}</p>
            {currentDecision < decisions.length - 1 && (
              <button
                onClick={handleNext}
                className="w-full py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Next Decision
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 