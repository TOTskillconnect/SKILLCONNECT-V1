import { Question } from '@/types/jobKnowledge';

export const frontendQuestions: Question[] = [
  {
    id: 'fe-1',
    type: 'coding_challenge',
    timeLimit: 300,
    competencies: ['React', 'State Management'],
    points: 20,
    prompt: 'Create a custom React hook called useDebounce that takes a value and a delay time as parameters. The hook should return the debounced value that only updates after the specified delay has passed since the last change.',
    starterCode: `function useDebounce(value, delay) {
  // Implement the hook here
}`,
    testCases: [
      {
        input: 'Call with "test" and 1000ms delay',
        expectedOutput: 'Returns "test" after 1000ms of no changes'
      }
    ]
  },
  {
    id: 'fe-2',
    type: 'technical_scenario',
    timeLimit: 120,
    competencies: ['Performance Optimization', 'Problem Solving'],
    points: 15,
    scenario: 'You notice that a React component is re-rendering frequently, causing performance issues. The component displays a list of items and has a search filter. What would be the most effective way to optimize this component?',
    options: [
      {
        id: 'fe-2-a',
        text: 'Wrap the entire component with React.memo()',
        isCorrect: false
      },
      {
        id: 'fe-2-b',
        text: 'Use useMemo for the filtered list and useCallback for the filter function',
        isCorrect: true
      },
      {
        id: 'fe-2-c',
        text: 'Add a key prop to the list items',
        isCorrect: false
      }
    ]
  },
  {
    id: 'fe-3',
    type: 'coding_challenge',
    timeLimit: 300,
    competencies: ['TypeScript', 'Data Structures'],
    points: 25,
    prompt: 'Implement a generic TypeScript function that takes an array of objects and a key, and returns a new object where the values are grouped by that key.',
    starterCode: `function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  // Implement the grouping logic here
}`,
    testCases: [
      {
        input: 'groupBy([{id: 1, type: "A"}, {id: 2, type: "A"}, {id: 3, type: "B"}], "type")',
        expectedOutput: '{ A: [{id: 1, type: "A"}, {id: 2, type: "A"}], B: [{id: 3, type: "B"}] }'
      }
    ]
  },
  {
    id: 'fe-4',
    type: 'technical_scenario',
    timeLimit: 180,
    competencies: ['Security', 'Best Practices'],
    points: 20,
    scenario: 'You need to store sensitive user data in the browser for a banking application. Which approach would be most secure?',
    options: [
      {
        id: 'fe-4-a',
        text: 'Store encrypted data in localStorage',
        isCorrect: false
      },
      {
        id: 'fe-4-b',
        text: 'Use HttpOnly cookies and secure session management',
        isCorrect: true
      },
      {
        id: 'fe-4-c',
        text: 'Store data in sessionStorage',
        isCorrect: false
      }
    ]
  }
];

export const financialControllerQuestions: Question[] = [
  {
    id: 'fc-1',
    type: 'technical_scenario',
    timeLimit: 180,
    competencies: ['Financial Analysis', 'Risk Management'],
    points: 20,
    scenario: "During your monthly financial review, you discover that actual expenses are 25% higher than budgeted in a key department. What should be your first course of action?",
    options: [
      {
        id: 'fc-1-a',
        text: "Immediately cut the department's budget for next month",
        isCorrect: false
      },
      {
        id: 'fc-1-b',
        text: "Analyze the variance by examining detailed transaction records and identify patterns or unusual items",
        isCorrect: true
      },
      {
        id: 'fc-1-c',
        text: "Report the overspending to senior management without investigation",
        isCorrect: false
      }
    ]
  },
  {
    id: 'fc-2',
    type: 'coding_challenge',
    timeLimit: 300,
    competencies: ['Data Analysis', 'Excel/Spreadsheet'],
    points: 25,
    prompt: 'Write a function that calculates the Internal Rate of Return (IRR) given an array of cash flows. The first value represents the initial investment (negative value) and subsequent values represent returns.',
    starterCode: `function calculateIRR(cashFlows) {
  // Implement IRR calculation here
  // Return the IRR as a percentage
}`,
    testCases: [
      {
        input: '[-1000, 300, 400, 500]',
        expectedOutput: 'Returns ~15.8%'
      }
    ]
  },
  {
    id: 'fc-3',
    type: 'technical_scenario',
    timeLimit: 240,
    competencies: ['Compliance', 'Regulatory Knowledge'],
    points: 30,
    scenario: 'You discover that a recently implemented accounting practice might not fully comply with the latest IFRS standards. The impact is material but not critical. How should you proceed?',
    options: [
      {
        id: 'fc-3-a',
        text: 'Wait until the next audit to address the issue',
        isCorrect: false
      },
      {
        id: 'fc-3-b',
        text: 'Document the issue, assess the impact, and present a correction plan to management and auditors',
        isCorrect: true
      },
      {
        id: 'fc-3-c',
        text: 'Immediately change the practice without documentation',
        isCorrect: false
      }
    ]
  },
  {
    id: 'fc-4',
    type: 'coding_challenge',
    timeLimit: 300,
    competencies: ['Financial Modeling', 'Data Analysis'],
    points: 25,
    prompt: 'Create a function that performs a sensitivity analysis on a financial model. The function should calculate how changes in revenue growth rate affect net profit margin.',
    starterCode: `function sensitivityAnalysis(baseRevenue, growthRates, costStructure) {
  // Implement sensitivity analysis
  // Return array of profit margins for different growth rates
}`,
    testCases: [
      {
        input: 'baseRevenue: 1000000, growthRates: [0.05, 0.1, 0.15], costStructure: { fixed: 300000, variable: 0.6 }',
        expectedOutput: 'Array of profit margins for each growth rate'
      }
    ]
  }
];

export interface SkillAssessment {
  id: string;
  title: string;
  description: string;
  role: string;
  skills: string[];
  questionCount: number;
  timeEstimate: string;
}

export const skillAssessments: SkillAssessment[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Development Assessment',
    description: 'Evaluate your proficiency in React, TypeScript, and modern frontend development practices.',
    role: 'frontend developer',
    skills: ['React', 'TypeScript', 'Performance Optimization', 'Security'],
    questionCount: 4,
    timeEstimate: '30-45 minutes'
  },
  {
    id: 'financial-control',
    title: 'Financial Controller Assessment',
    description: 'Test your knowledge of financial analysis, regulatory compliance, and risk management.',
    role: 'financial controller',
    skills: ['Financial Analysis', 'Risk Management', 'Compliance', 'Data Analysis'],
    questionCount: 4,
    timeEstimate: '35-50 minutes'
  }
];

export const getQuestionsByRole = (role: string): Question[] => {
  switch (role.toLowerCase()) {
    case 'frontend developer':
      return frontendQuestions;
    case 'financial controller':
      return financialControllerQuestions;
    default:
      return [];
  }
}; 