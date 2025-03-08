'use client';

import { useState } from 'react';
import { BriefcaseIcon, ClockIcon } from '@heroicons/react/24/outline';

interface SituationalJudgmentModuleProps {
  candidateId: string;
  role: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    score: number;
    feedback: string;
    impact: {
      problemSolving: number;
      decisionMaking: number;
      judgment: number;
    };
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 'project-delay',
    title: 'Project Delay Management',
    description: 'A critical project is falling behind schedule due to unexpected technical challenges. The client is getting concerned about the timeline.',
    options: [
      {
        id: 'pd1',
        text: 'Analyze the situation with the team, identify bottlenecks, and propose a realistic revised timeline with mitigation strategies.',
        score: 100,
        feedback: 'Excellent approach! This demonstrates strong problem-solving and stakeholder management skills.',
        impact: {
          problemSolving: 95,
          decisionMaking: 90,
          judgment: 95
        }
      },
      {
        id: 'pd2',
        text: 'Immediately allocate more resources to the project to catch up with the original timeline.',
        score: 60,
        feedback: 'While proactive, this may not address the root cause and could strain team resources.',
        impact: {
          problemSolving: 60,
          decisionMaking: 65,
          judgment: 55
        }
      },
      {
        id: 'pd3',
        text: 'Reduce the project scope without consulting the client to meet the deadline.',
        score: 30,
        feedback: 'This approach risks damaging client trust and may not align with project objectives.',
        impact: {
          problemSolving: 40,
          decisionMaking: 30,
          judgment: 20
        }
      }
    ]
  },
  {
    id: 'team-conflict',
    title: 'Team Conflict Resolution',
    description: 'Two senior team members strongly disagree on the technical architecture for a new feature, causing tension in the team.',
    options: [
      {
        id: 'tc1',
        text: 'Facilitate a structured discussion to evaluate both approaches objectively, focusing on technical merits and project goals.',
        score: 100,
        feedback: 'Perfect! This promotes collaboration while ensuring decisions are based on objective criteria.',
        impact: {
          problemSolving: 90,
          decisionMaking: 95,
          judgment: 100
        }
      },
      {
        id: 'tc2',
        text: 'Let them implement both approaches as prototypes and choose the better one.',
        score: 70,
        feedback: 'While this allows for practical evaluation, it may be resource-intensive and delay the project.',
        impact: {
          problemSolving: 75,
          decisionMaking: 70,
          judgment: 65
        }
      },
      {
        id: 'tc3',
        text: 'Make the decision yourself to avoid further delays.',
        score: 40,
        feedback: 'This misses an opportunity for team growth and may not lead to the best technical solution.',
        impact: {
          problemSolving: 45,
          decisionMaking: 40,
          judgment: 35
        }
      }
    ]
  }
];

export function SituationalJudgmentModule({ candidateId, role }: SituationalJudgmentModuleProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [impacts, setImpacts] = useState<{
    problemSolving: number[];
    decisionMaking: number[];
    judgment: number[];
  }>({
    problemSolving: [],
    decisionMaking: [],
    judgment: []
  });

  const handleOptionSelect = (optionId: string) => {
    const scenario = scenarios[currentScenario];
    const option = scenario.options.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    
    const newScores = [...scores, option.score];
    setScores(newScores);

    setImpacts(prev => ({
      problemSolving: [...prev.problemSolving, option.impact.problemSolving],
      decisionMaking: [...prev.decisionMaking, option.impact.decisionMaking],
      judgment: [...prev.judgment, option.impact.judgment]
    }));
  };

  const handleNext = () => {
    setCurrentScenario(prev => prev + 1);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const scenario = scenarios[currentScenario];
  const selectedOptionData = scenario.options.find(opt => opt.id === selectedOption);

  const getAverageScore = (scores: number[]) => {
    return scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
  };

  if (currentScenario >= scenarios.length) {
    const finalScores = {
      overall: getAverageScore(scores),
      problemSolving: getAverageScore(impacts.problemSolving),
      decisionMaking: getAverageScore(impacts.decisionMaking),
      judgment: getAverageScore(impacts.judgment)
    };

    return (
      <div className="space-y-6">
        <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#714b67] mb-6">Assessment Complete</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#f3f4f6] rounded-lg">
              <span className="text-[#714b67]/80">Overall Score</span>
              <span className="text-3xl font-bold text-[#714b67]">
                {finalScores.overall}%
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Problem Solving</span>
                  <span className="text-sm text-[#714b67]">{finalScores.problemSolving}%</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#fbb130] transition-all duration-300"
                    style={{ width: `${finalScores.problemSolving}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Decision Making</span>
                  <span className="text-sm text-[#714b67]">{finalScores.decisionMaking}%</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1ad3bb] transition-all duration-300"
                    style={{ width: `${finalScores.decisionMaking}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Professional Judgment</span>
                  <span className="text-sm text-[#714b67]">{finalScores.judgment}%</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#714b67] transition-all duration-300"
                    style={{ width: `${finalScores.judgment}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between bg-[#ffffff] p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-[#714b67]" />
          <span className="font-medium text-[#714b67]">
            Scenario {currentScenario + 1} of {scenarios.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#714b67]/80">
            Average Score: {getAverageScore(scores)}%
          </span>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#714b67] mb-4">{scenario.title}</h3>
          <p className="text-[#714b67]/80 mb-6">{scenario.description}</p>

          <div className="space-y-3">
            {scenario.options.map((option) => (
              <button
                key={option.id}
                onClick={() => !showFeedback && handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`
                  w-full p-4 text-left border rounded-lg transition-colors
                  ${showFeedback && option.id === selectedOption
                    ? 'border-[#714b67] bg-[#714b67]/5'
                    : 'hover:bg-[#f3f4f6]'}
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
          <div className="p-6 bg-[#f3f4f6] border-t">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[#714b67]/80">Score</span>
                <span className="text-lg font-semibold text-[#714b67]">
                  {selectedOptionData.score}%
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#714b67]/80">Problem Solving</span>
                    <span className="text-sm text-[#714b67]">{selectedOptionData.impact.problemSolving}%</span>
                  </div>
                  <div className="h-2 bg-[#ffffff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#fbb130] transition-all duration-300"
                      style={{ width: `${selectedOptionData.impact.problemSolving}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#714b67]/80">Decision Making</span>
                    <span className="text-sm text-[#714b67]">{selectedOptionData.impact.decisionMaking}%</span>
                  </div>
                  <div className="h-2 bg-[#ffffff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1ad3bb] transition-all duration-300"
                      style={{ width: `${selectedOptionData.impact.decisionMaking}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#714b67]/80">Professional Judgment</span>
                    <span className="text-sm text-[#714b67]">{selectedOptionData.impact.judgment}%</span>
                  </div>
                  <div className="h-2 bg-[#ffffff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#714b67] transition-all duration-300"
                      style={{ width: `${selectedOptionData.impact.judgment}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[#714b67]/80">{selectedOptionData.feedback}</p>
              {currentScenario < scenarios.length - 1 && (
                <button
                  onClick={handleNext}
                  className="w-full py-2 bg-[#fbb130] text-white rounded-lg hover:bg-[#fbb130]/90 transition-colors"
                >
                  Next Scenario
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 