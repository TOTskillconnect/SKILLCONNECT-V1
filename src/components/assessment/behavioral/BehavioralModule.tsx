'use client';

import { useState } from 'react';
import { ValueSortChallenge } from '@/components/assessment/culture-fit/ValueSortChallenge';
import { TeamDynamicsSimulation } from '@/components/assessment/behavioral/TeamDynamicsSimulation';
import { DecisionMakingScenario } from '@/components/assessment/behavioral/DecisionMakingScenario';

interface BehavioralModuleProps {
  candidateId: string;
  role: string;
}

type BehavioralStage = 'values' | 'teamDynamics' | 'decisionMaking' | 'complete';

export function BehavioralModule({ candidateId, role }: BehavioralModuleProps) {
  const [stage, setStage] = useState<BehavioralStage>('values');
  const [scores, setScores] = useState({
    values: 0,
    teamDynamics: 0,
    decisionMaking: 0
  });

  const handleStageComplete = (stageName: keyof typeof scores, score: number) => {
    setScores(prev => ({
      ...prev,
      [stageName]: score
    }));

    // Progress to next stage
    switch (stageName) {
      case 'values':
        setStage('teamDynamics');
        break;
      case 'teamDynamics':
        setStage('decisionMaking');
        break;
      case 'decisionMaking':
        setStage('complete');
        break;
    }
  };

  if (stage === 'complete') {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = 300; // 100 points per stage

    return (
      <div className="space-y-6">
        <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#714b67] mb-6">Assessment Complete</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#f3f4f6] rounded-lg">
              <span className="text-[#714b67]/80">Overall Score</span>
              <span className="text-3xl font-bold text-[#714b67]">
                {Math.round((totalScore / maxPossibleScore) * 100)}%
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Values Alignment</span>
                  <span className="text-sm text-[#714b67]">{scores.values} points</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#fbb130] transition-all duration-300"
                    style={{ width: `${(scores.values / 100) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Team Dynamics</span>
                  <span className="text-sm text-[#714b67]">{scores.teamDynamics} points</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1ad3bb] transition-all duration-300"
                    style={{ width: `${(scores.teamDynamics / 100) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#714b67]/80">Decision Making</span>
                  <span className="text-sm text-[#714b67]">{scores.decisionMaking} points</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#714b67] transition-all duration-300"
                    style={{ width: `${(scores.decisionMaking / 100) * 100}%` }}
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
      {stage === 'values' && (
        <ValueSortChallenge
          onComplete={(score) => handleStageComplete('values', score)}
        />
      )}
      {stage === 'teamDynamics' && (
        <TeamDynamicsSimulation
          onComplete={(score) => handleStageComplete('teamDynamics', score)}
        />
      )}
      {stage === 'decisionMaking' && (
        <DecisionMakingScenario
          onComplete={(score) => handleStageComplete('decisionMaking', score)}
        />
      )}
    </div>
  );
} 