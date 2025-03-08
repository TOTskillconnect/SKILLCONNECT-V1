export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'coding' | 'text' | 'scenario';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface AssessmentTemplate {
  id: string;
  type: 'technical' | 'roleplay' | 'sjt';
  title: string;
  description: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: Question[];
  targetRole: string[];
}

export const mockAssessmentTemplates: AssessmentTemplate[] = [
  {
    id: 'tech-1',
    type: 'technical',
    title: 'Frontend Development Assessment',
    description: 'Comprehensive assessment of React, TypeScript, and modern frontend development practices.',
    duration: 60,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'What is the difference between useState and useRef in React?',
        type: 'text',
        points: 10
      },
      {
        id: 'q2',
        text: 'Implement a function that debounces API calls in React',
        type: 'coding',
        points: 20
      },
      {
        id: 'q3',
        text: 'Which hook would you use for side effects in React?',
        type: 'multiple_choice',
        options: ['useEffect', 'useState', 'useMemo', 'useCallback'],
        correctAnswer: 'useEffect',
        points: 10
      }
    ],
    targetRole: ['Frontend Developer', 'Full Stack Developer', 'React Developer']
  },
  {
    id: 'sjt-1',
    type: 'sjt',
    title: 'Product Management Scenarios',
    description: 'Evaluate decision-making and problem-solving skills in product management scenarios.',
    duration: 45,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'Your team is behind schedule on a critical feature release. The engineering team suggests cutting some planned functionality to meet the deadline. How do you proceed?',
        type: 'scenario',
        points: 25
      },
      {
        id: 'q2',
        text: 'A key stakeholder wants to add new requirements mid-sprint. How do you handle this situation?',
        type: 'scenario',
        points: 25
      }
    ],
    targetRole: ['Product Manager', 'Product Owner', 'Technical Product Manager']
  }
]; 