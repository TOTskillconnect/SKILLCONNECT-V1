import { CompanyValue, VisualScenario, TeamSimulation } from '../types/cultureFit';

export const companyValues: CompanyValue[] = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Embracing new ideas and creative solutions to drive progress',
    icon: 'LightBulbIcon',
    behaviors: [
      'Encourages experimentation',
      'Challenges status quo',
      'Embraces change'
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Working together effectively to achieve shared goals',
    icon: 'UserGroupIcon',
    behaviors: [
      'Supports team members',
      'Shares knowledge',
      'Values diverse perspectives'
    ]
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Maintaining high ethical standards and transparency',
    icon: 'ShieldCheckIcon',
    behaviors: [
      'Acts ethically',
      'Shows transparency',
      'Takes responsibility'
    ]
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Striving for the highest quality in everything we do',
    icon: 'SparklesIcon',
    behaviors: [
      'Pursues quality',
      'Sets high standards',
      'Continuous improvement'
    ]
  },
  {
    id: 'accountability',
    title: 'Accountability',
    description: 'Taking ownership of actions and delivering on commitments',
    icon: 'ChartBarIcon',
    behaviors: [
      'Meets deadlines',
      'Owns outcomes',
      'Reliable execution'
    ]
  }
];

export const visualScenarios: VisualScenario[] = [
  {
    id: 'project-deadline',
    title: 'Project Deadline Challenge',
    description: 'Your team is approaching a critical deadline, but a team member suggests a significant change that could improve the final outcome.',
    mediaUrl: '/scenarios/project-deadline.jpg',
    options: [
      {
        id: 'opt1',
        text: 'Push for the change despite the deadline risk, prioritizing innovation and quality',
        culturalAlignment: {
          innovation: 0.8,
          excellence: 0.7,
          accountability: 0.3
        }
      },
      {
        id: 'opt2',
        text: 'Stick to the current plan to ensure deadline compliance',
        culturalAlignment: {
          accountability: 0.9,
          integrity: 0.6,
          excellence: 0.4
        }
      },
      {
        id: 'opt3',
        text: 'Collaborate with the team to find a balanced solution',
        culturalAlignment: {
          collaboration: 0.9,
          innovation: 0.5,
          excellence: 0.6
        }
      }
    ]
  },
  {
    id: 'innovation-stability',
    title: 'Innovation vs. Stability',
    description: 'A new technology could significantly improve efficiency, but it would require substantial changes to established processes.',
    mediaUrl: '/scenarios/innovation-stability.jpg',
    options: [
      {
        id: 'opt1',
        text: 'Champion the new technology and lead the change',
        culturalAlignment: {
          innovation: 0.9,
          excellence: 0.7,
          accountability: 0.5
        }
      },
      {
        id: 'opt2',
        text: 'Propose a gradual implementation with careful testing',
        culturalAlignment: {
          excellence: 0.8,
          accountability: 0.7,
          collaboration: 0.6
        }
      },
      {
        id: 'opt3',
        text: 'Maintain current processes until the technology is more proven',
        culturalAlignment: {
          integrity: 0.8,
          accountability: 0.7,
          excellence: 0.4
        }
      }
    ]
  }
];

export const teamSimulation: TeamSimulation = {
  id: 'cross-functional-project',
  title: 'Cross-functional Project Leadership',
  description: 'Lead a diverse team through a challenging project with multiple stakeholders',
  stages: [
    {
      id: 'stage1',
      situation: 'Team members from different departments disagree on project priorities',
      options: [
        {
          id: 'opt1',
          text: 'Facilitate a structured discussion to find common ground',
          impact: {
            collaboration: 0.8,
            communication: 0.7,
            leadership: 0.6,
            adaptability: 0.5
          }
        },
        {
          id: 'opt2',
          text: 'Make an executive decision based on overall project goals',
          impact: {
            leadership: 0.9,
            communication: 0.5,
            collaboration: 0.3,
            adaptability: 0.4
          }
        },
        {
          id: 'opt3',
          text: 'Seek input from each department and create a balanced plan',
          impact: {
            collaboration: 0.9,
            communication: 0.8,
            adaptability: 0.7,
            leadership: 0.6
          }
        }
      ]
    },
    {
      id: 'stage2',
      situation: 'A key team member unexpectedly leaves the project',
      options: [
        {
          id: 'opt1',
          text: 'Redistribute responsibilities among existing team members',
          impact: {
            leadership: 0.7,
            adaptability: 0.8,
            collaboration: 0.6,
            communication: 0.5
          }
        },
        {
          id: 'opt2',
          text: 'Quickly bring in a replacement and ensure knowledge transfer',
          impact: {
            leadership: 0.6,
            communication: 0.8,
            adaptability: 0.7,
            collaboration: 0.5
          }
        },
        {
          id: 'opt3',
          text: 'Pause and reorganize the project structure',
          impact: {
            adaptability: 0.9,
            leadership: 0.8,
            collaboration: 0.7,
            communication: 0.6
          }
        }
      ]
    }
  ]
}; 