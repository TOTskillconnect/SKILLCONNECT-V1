import { StaticImageData } from 'next/image';

export type CultureFitState = 'selection' | 'value-sort' | 'visual-quiz' | 'team-sim' | 'complete';

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  behaviors: string[];
}

export interface VisualScenario {
  id: string;
  title: string;
  description: string;
  mediaUrl: string | StaticImageData;
  options: {
    id: string;
    text: string;
    culturalAlignment: Record<string, number>;
  }[];
}

export interface TeamSimulation {
  id: string;
  title: string;
  description: string;
  stages: {
    id: string;
    situation: string;
    options: {
      id: string;
      text: string;
      impact: {
        collaboration: number;
        communication: number;
        adaptability: number;
        leadership: number;
      };
    }[];
  }[];
}

export interface CultureProfile {
  valueAlignment: Record<string, number>;
  culturalPreferences: Record<string, number>;
  teamDynamics: {
    collaboration: number;
    communication: number;
    adaptability: number;
    leadership: number;
  };
}

export interface CultureFitProgress {
  completedStages: string[];
  valueRankings: string[];
  scenarioResponses: Array<{
    scenarioId: string;
    optionId: string;
    timeSpent: number;
  }>;
  simulationDecisions: Array<{
    stageId: string;
    optionId: string;
    timeSpent: number;
  }>;
  profile: CultureProfile;
} 