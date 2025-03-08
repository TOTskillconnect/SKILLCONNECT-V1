'use client';

import { useState } from 'react';
import { ValueSortChallenge } from '@/components/assessment/culture-fit/ValueSortChallenge';
import { TeamDynamicsSimulation } from '@/components/assessment/behavioral/TeamDynamicsSimulation';
import { DecisionMakingScenario } from '@/components/assessment/behavioral/DecisionMakingScenario';
import { CompanyValue } from '@/types/cultureFit';

const companyValues: CompanyValue[] = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Continuously seeking new and better ways to solve problems',
    icon: '🚀',
    behaviors: ['Proposes creative solutions', 'Embraces change', 'Experiments with new approaches']
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Working together effectively to achieve shared goals',
    icon: '🤝',
    behaviors: ['Communicates effectively', 'Supports team members', 'Shares knowledge']
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Striving for the highest quality in everything we do',
    icon: '⭐',
    behaviors: ['Sets high standards', 'Delivers quality work', 'Continuously improves']
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Being honest, ethical, and transparent in all actions',
    icon: '🎯',
    behaviors: ['Acts ethically', 'Shows transparency', 'Takes responsibility']
  },
  {
    id: 'customer-focus',
    title: 'Customer Focus',
    description: 'Putting customers at the center of every decision',
    icon: '👥',
    behaviors: ['Understands customer needs', 'Provides excellent service', 'Seeks feedback']
  }
];

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

  const handleStageComplete = (stageName: keyof typeof scores, score: number | string[]) => {
    let numericScore: number;
    
    if (stageName === 'values' && Array.isArray(score)) {
      // Calculate score based on the order of values
      // Perfect order gets 100 points, deduct points for each position difference
      const idealOrder = ['innovation', 'excellence', 'customer-focus', 'collaboration', 'integrity'];
      numericScore = score.reduce((total, value, index) => {
        const idealIndex = idealOrder.indexOf(value);
        const positionDifference = Math.abs(index - idealIndex);
        // Deduct 10 points for each position difference
        return total - (positionDifference * 10);
      }, 100);
      
      // Ensure score is between 0 and 100
      numericScore = Math.max(0, Math.min(100, numericScore));
    } else {
      numericScore = score as number;
    }

    setScores(prev => ({
      ...prev,
      [stageName]: numericScore
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
          values={companyValues}
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