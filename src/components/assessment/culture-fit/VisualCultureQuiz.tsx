'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { VisualScenario } from '@/types/cultureFit';
import { ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline';

interface VisualCultureQuizProps {
  scenarios: VisualScenario[];
  onComplete: (responses: Array<{ scenarioId: string; optionId: string; timeSpent: number }>) => void;
}

export function VisualCultureQuiz({ scenarios, onComplete }: VisualCultureQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Array<{ scenarioId: string; optionId: string; timeSpent: number }>>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentScenario = scenarios[currentIndex];

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null);
  }, [currentIndex]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newResponses = [...responses, {
      scenarioId: currentScenario.id,
      optionId: selectedOption,
      timeSpent
    }];

    setResponses(newResponses);

    if (currentIndex === scenarios.length - 1) {
      onComplete(newResponses);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Visual Culture Quiz</h2>
        <p className="text-gray-600">
          Review each scenario and choose the response that best reflects your approach.
        </p>
      </div>

      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Scenario {currentIndex + 1} of {scenarios.length}
            </span>
            <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span className="text-sm">2-3 min per scenario</span>
          </div>
        </div>

        {/* Scenario Content */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={currentScenario.mediaUrl}
              alt={currentScenario.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentScenario.title}
            </h3>
            <p className="text-gray-600 mb-4">{currentScenario.description}</p>

            <div className="space-y-3">
              {currentScenario.options.map((option) => (
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
          </div>
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
            {currentIndex === scenarios.length - 1 ? 'Complete' : 'Next'}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 