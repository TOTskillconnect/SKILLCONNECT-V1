'use client';

import { useState } from 'react';
import { CultureFitState, CultureFitProgress, CultureProfile } from '@/types/cultureFit';
import { companyValues, visualScenarios, teamSimulation } from '@/data/mockCultureFitData';
import { ValueSortChallenge } from './culture-fit/ValueSortChallenge';
import { VisualCultureQuiz } from './culture-fit/VisualCultureQuiz';
import { TeamDynamicsSimulation } from './culture-fit/TeamDynamicsSimulation';
import { CultureFitSummary } from './culture-fit/CultureFitSummary';
import { ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface CultureFitModuleProps {
  candidateId: string;
}

const initialProgress: CultureFitProgress = {
  completedStages: [],
  valueRankings: [],
  scenarioResponses: [],
  simulationDecisions: [],
  profile: {
    valueAlignment: {},
    culturalPreferences: {},
    teamDynamics: {
      collaboration: 0,
      communication: 0,
      adaptability: 0,
      leadership: 0
    }
  }
};

export function CultureFitModule({ candidateId }: CultureFitModuleProps) {
  const [state, setState] = useState<CultureFitState>('selection');
  const [progress, setProgress] = useState<CultureFitProgress>(initialProgress);
  const [scores, setScores] = useState({ valueSortScore: 0 });

  const handleValueSortComplete = (rankings: string[]) => {
    const idealOrder = ['innovation', 'excellence', 'customer-focus', 'collaboration', 'integrity'];
    let score = 0;
    
    // Calculate score based on position matches and proximity
    rankings.forEach((value, index) => {
      const idealIndex = idealOrder.indexOf(value);
      const distance = Math.abs(index - idealIndex);
      
      if (distance === 0) {
        score += 20; // Perfect position match
      } else if (distance === 1) {
        score += 15; // Off by one position
      } else if (distance === 2) {
        score += 10; // Off by two positions
      } else {
        score += 5; // More distant position
      }
    });

    setScores(prev => ({ ...prev, valueSortScore: score }));
    setState('visual-quiz');
  };

  const handleVisualQuizComplete = (responses: Array<{ scenarioId: string; optionId: string; timeSpent: number }>) => {
    const culturalPreferences = responses.reduce((acc, response) => {
      const scenario = visualScenarios.find(s => s.id === response.scenarioId);
      const option = scenario?.options.find(o => o.id === response.optionId);
      
      if (option) {
        Object.entries(option.culturalAlignment).forEach(([trait, score]) => {
          acc[trait] = (acc[trait] || 0) + score;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    setProgress(prev => ({
      ...prev,
      completedStages: [...prev.completedStages, 'visual-quiz'],
      scenarioResponses: responses,
      profile: {
        ...prev.profile,
        culturalPreferences
      }
    }));
    setState('team-sim');
  };

  const handleTeamSimComplete = (decisions: Array<{ stageId: string; optionId: string; timeSpent: number }>) => {
    const teamDynamics = decisions.reduce((acc, decision) => {
      const stage = teamSimulation.stages.find(s => s.id === decision.stageId);
      const option = stage?.options.find(o => o.id === decision.optionId);
      
      if (option) {
        Object.entries(option.impact).forEach(([trait, score]) => {
          acc[trait as keyof CultureProfile['teamDynamics']] += score;
        });
      }
      return acc;
    }, {
      collaboration: 0,
      communication: 0,
      adaptability: 0,
      leadership: 0
    });

    setProgress(prev => ({
      ...prev,
      completedStages: [...prev.completedStages, 'team-sim'],
      simulationDecisions: decisions,
      profile: {
        ...prev.profile,
        teamDynamics
      }
    }));
    setState('complete');
  };

  if (state === 'selection') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-full">
              <ChartBarIcon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Culture Fit Assessment</h2>
              <p className="text-gray-600">Discover how your values and work style align with our culture</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">1. Value Sorting Challenge</h3>
              <p className="text-gray-600">Rank our core values based on their importance to you</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">2. Visual Culture Quiz</h3>
              <p className="text-gray-600">Respond to realistic workplace scenarios</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">3. Team Dynamics Simulation</h3>
              <p className="text-gray-600">Navigate team challenges in an interactive environment</p>
            </div>
          </div>

          <button
            onClick={() => setState('value-sort')}
            className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              {state === 'complete' ? 'Assessment Complete' : 'In Progress'}
            </span>
            <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{
                  width: `${(progress.completedStages.length / 3) * 100}%`
                }}
              />
            </div>
          </div>
          {state === 'complete' && (
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">All stages complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {state === 'value-sort' && (
          <ValueSortChallenge
            values={companyValues}
            onComplete={handleValueSortComplete}
          />
        )}
        
        {state === 'visual-quiz' && (
          <VisualCultureQuiz
            scenarios={visualScenarios}
            onComplete={handleVisualQuizComplete}
          />
        )}
        
        {state === 'team-sim' && (
          <TeamDynamicsSimulation
            simulation={teamSimulation}
            onComplete={handleTeamSimComplete}
          />
        )}
        
        {state === 'complete' && (
          <CultureFitSummary profile={progress.profile} />
        )}
      </div>
    </div>
  );
} 