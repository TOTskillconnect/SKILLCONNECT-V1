'use client';

import { useState, useEffect } from 'react';
import { TeamSimulation } from '@/types/cultureFit';
import { UserGroupIcon, ClockIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface TeamDynamicsSimulationProps {
  simulation: TeamSimulation;
  onComplete: (decisions: Array<{ stageId: string; optionId: string; timeSpent: number }>) => void;
}

export function TeamDynamicsSimulation({ simulation, onComplete }: TeamDynamicsSimulationProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [decisions, setDecisions] = useState<Array<{ stageId: string; optionId: string; timeSpent: number }>>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentStage = simulation.stages[currentStageIndex];

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null);
    setFeedback(null);
  }, [currentStageIndex]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = currentStage.options.find(o => o.id === optionId);
    if (option) {
      const impact = option.impact;
      type ImpactKey = keyof typeof impact;
      const entries = Object.entries(impact) as [ImpactKey, number][];
      const primaryStrength = entries.reduce<[ImpactKey, number]>((a, b) => 
        impact[a[0]] > impact[b[0]] ? a : b, entries[0]
      )[0];
      setFeedback(`This approach demonstrates strong ${primaryStrength} skills.`);
    }
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newDecisions = [...decisions, {
      stageId: currentStage.id,
      optionId: selectedOption,
      timeSpent
    }];

    setDecisions(newDecisions);

    if (currentStageIndex === simulation.stages.length - 1) {
      onComplete(newDecisions);
    } else {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Dynamics Simulation</h2>
        <p className="text-gray-600">
          Navigate through team scenarios and make decisions that reflect your leadership style.
        </p>
      </div>

      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Stage {currentStageIndex + 1} of {simulation.stages.length}
            </span>
            <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${((currentStageIndex + 1) / simulation.stages.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span className="text-sm">2-3 min per decision</span>
          </div>
        </div>

        {/* Simulation Content */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {simulation.title}
                </h3>
                <p className="text-gray-600">{currentStage.situation}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {currentStage.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`
                  w-full p-4 text-left border rounded-lg transition-colors
                  ${selectedOption === option.id
                    ? 'border-accent bg-accent/5'
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {option.text}
              </button>
            ))}
          </div>

          {feedback && (
            <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
              <p className="text-accent">{feedback}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg
              ${selectedOption
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
              transition-colors
            `}
          >
            {currentStageIndex === simulation.stages.length - 1 ? 'Complete' : 'Next'}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 