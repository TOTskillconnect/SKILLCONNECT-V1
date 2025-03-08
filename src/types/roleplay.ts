export type Stage = 'preparation' | 'execution' | 'reflection';
export type Mood = 'neutral' | 'positive' | 'negative' | 'very_positive' | 'very_negative';
export type ResponseStyle = 'professional' | 'empathetic' | 'direct' | 'collaborative' | 'assertive';

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  mood: Mood;
}

export interface DialogueOption {
  id: string;
  text: string;
  style: ResponseStyle;
  nextNodeId: string;
  impacts: {
    communication: number;   // -2 to +2
    problemSolving: number; // -2 to +2
    competency: number;     // -2 to +2
  };
}

export interface DialogueNode {
  id: string;
  text: string;
  speaker: Character;
  options: DialogueOption[];
  competencyChecks?: string[]; // IDs of competencies being tested
  moodImpact: number; // -2 to +2 scale
}

export interface CompetencyCheck {
  id: string;
  competency: string;
  criteria: string[];
  weight: number; // 1-5 scale
}

export interface RolePlayScenario {
  id: string;
  title: string;
  context: string;
  timeLimit: number; // in seconds
  stages: {
    preparation: number;  // time in seconds
    execution: number;    // time in seconds
    reflection: number;   // time in seconds
  };
  competencyChecks: CompetencyCheck[];
} 