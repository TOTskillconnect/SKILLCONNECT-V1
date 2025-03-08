import { RolePlayScenario, DialogueNode, Character } from '@/types/roleplay';

const characters: Character[] = [
  {
    id: 'manager',
    name: 'Alex Thompson',
    role: 'Engineering Manager',
    avatar: '👨‍💼',
    mood: 'neutral'
  },
  {
    id: 'dev-lead',
    name: 'Jordan Chen',
    role: 'Development Lead',
    avatar: '👨‍💻',
    mood: 'neutral'
  },
  {
    id: 'stakeholder',
    name: 'Sarah Miller',
    role: 'Product Stakeholder',
    avatar: '👩‍💼',
    mood: 'neutral'
  },
  {
    id: 'team-member',
    name: 'Chris Rodriguez',
    role: 'Team Member',
    avatar: '👨‍💻',
    mood: 'neutral'
  }
];

const dialogueNodes: Record<string, DialogueNode> = {
  'start': {
    id: 'start',
    text: "We can't just drop everything we promised for the sprint. The stakeholders are expecting these features.",
    speaker: characters[1], // dev-lead
    options: [
      {
        id: 'opt1',
        text: "Let's assess the bug's impact and see if we can create a temporary workaround while maintaining sprint commitments.",
        style: 'collaborative',
        nextNodeId: 'explore-options',
        impacts: {
          communication: 2,
          problemSolving: 2,
          competency: 1
        }
      },
      {
        id: 'opt2',
        text: "Production bugs affecting users take priority. We'll need to adjust the sprint scope.",
        style: 'direct',
        nextNodeId: 'adjust-sprint',
        impacts: {
          communication: -1,
          problemSolving: 1,
          competency: 2
        }
      },
      {
        id: 'opt3',
        text: "I understand your concern about the sprint commitments. Could you help me understand the impact if we delay some features?",
        style: 'empathetic',
        nextNodeId: 'explore-impact',
        impacts: {
          communication: 2,
          problemSolving: 1,
          competency: 1
        }
      }
    ],
    competencyChecks: ['prioritization', 'stakeholder-mgmt'],
    moodImpact: -1
  },
  'explore-options': {
    id: 'explore-options',
    text: "A workaround might work, but we need to be careful not to accumulate technical debt. What's your plan for handling both?",
    speaker: characters[1], // dev-lead
    options: [
      {
        id: 'opt4',
        text: "We'll implement a quick fix now and add proper resolution to next sprint's priorities. I'll work with stakeholders to adjust expectations.",
        style: 'professional',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 1,
          problemSolving: 2,
          competency: 2
        }
      },
      {
        id: 'opt5',
        text: "Let's split the team - half continues with sprint work while others focus on the bug. We can minimize impact on both fronts.",
        style: 'collaborative',
        nextNodeId: 'team-response',
        impacts: {
          communication: 1,
          problemSolving: 1,
          competency: 1
        }
      }
    ],
    competencyChecks: ['prioritization'],
    moodImpact: 1
  },
  'adjust-sprint': {
    id: 'adjust-sprint',
    text: "The stakeholders won't be happy about this. How do you plan to handle their reaction?",
    speaker: characters[2], // stakeholder
    options: [
      {
        id: 'opt6',
        text: "I'll prepare a detailed analysis showing the bug's impact and our mitigation plan. We can discuss which features to prioritize together.",
        style: 'professional',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 2,
          problemSolving: 1,
          competency: 2
        }
      },
      {
        id: 'opt7',
        text: "We need to focus on quality and user experience. I'm confident we can make up for the delay in the next sprint.",
        style: 'assertive',
        nextNodeId: 'stakeholder-pushback',
        impacts: {
          communication: -1,
          problemSolving: 1,
          competency: 1
        }
      }
    ],
    competencyChecks: ['stakeholder-mgmt'],
    moodImpact: -1
  },
  'explore-impact': {
    id: 'explore-impact',
    text: "We have three major features promised: user authentication improvements, performance optimization, and the new dashboard. Each has different stakeholders waiting.",
    speaker: characters[1], // dev-lead
    options: [
      {
        id: 'opt8',
        text: "Let's prioritize based on user impact and technical dependencies. Can you share more about each feature's criticality?",
        style: 'professional',
        nextNodeId: 'feature-details',
        impacts: {
          communication: 2,
          problemSolving: 2,
          competency: 2
        }
      },
      {
        id: 'opt9',
        text: "The authentication improvements seem most critical for security. Should we prioritize that and negotiate on the others?",
        style: 'direct',
        nextNodeId: 'security-focus',
        impacts: {
          communication: 1,
          problemSolving: 1,
          competency: 1
        }
      }
    ],
    competencyChecks: ['prioritization'],
    moodImpact: 1
  },
  'feature-details': {
    id: 'feature-details',
    text: "The authentication update addresses security vulnerabilities, performance optimization impacts 70% of users with slower devices, and the dashboard is needed by the sales team for Q3 planning.",
    speaker: characters[1], // dev-lead
    options: [
      {
        id: 'opt11',
        text: "Given the security implications and broad user impact, let's prioritize auth and performance. I'll explain to the sales team and find an interim solution for them.",
        style: 'professional',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 2,
          problemSolving: 2,
          competency: 2
        }
      }
    ],
    competencyChecks: ['prioritization', 'stakeholder-mgmt'],
    moodImpact: 1
  },
  'security-focus': {
    id: 'security-focus',
    text: "Yes, the security risks are significant. But the performance issues are causing customer complaints, and sales is depending on the dashboard for revenue projections.",
    speaker: characters[2], // stakeholder
    options: [
      {
        id: 'opt12',
        text: "You're right, we need to balance all these needs. Let's create a phased approach that addresses critical security first, then performance, while providing sales with interim reporting.",
        style: 'collaborative',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 2,
          problemSolving: 2,
          competency: 2
        }
      }
    ],
    competencyChecks: ['stakeholder-mgmt'],
    moodImpact: 1
  },
  'team-response': {
    id: 'team-response',
    text: "Splitting the team could work, but it might slow down both efforts. How will you ensure effective coordination?",
    speaker: characters[3], // team-member
    options: [
      {
        id: 'opt13',
        text: "We'll have daily sync meetings between both groups and set clear handoff points. I'll coordinate between them to ensure alignment.",
        style: 'professional',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 2,
          problemSolving: 1,
          competency: 2
        }
      }
    ],
    competencyChecks: ['stakeholder-mgmt'],
    moodImpact: 1
  },
  'stakeholder-pushback': {
    id: 'stakeholder-pushback',
    text: "That's not good enough. We need concrete plans, not just promises about the next sprint.",
    speaker: characters[2], // stakeholder
    options: [
      {
        id: 'opt14',
        text: "You're right, let me outline our exact approach: we'll fix the bug this week, deliver the highest-priority feature next week, and create a detailed recovery plan for the remaining items.",
        style: 'professional',
        nextNodeId: 'stakeholder-response',
        impacts: {
          communication: 2,
          problemSolving: 2,
          competency: 2
        }
      }
    ],
    competencyChecks: ['stakeholder-mgmt'],
    moodImpact: 1
  },
  'stakeholder-response': {
    id: 'stakeholder-response',
    text: "I appreciate your thoughtful approach to this situation. Let's work together on adjusting the timeline.",
    speaker: characters[2], // stakeholder
    options: [
      {
        id: 'opt10',
        text: "Thank you for understanding. I'll send over a revised plan with options for reprioritization by end of day.",
        style: 'professional',
        nextNodeId: 'conclusion',
        impacts: {
          communication: 2,
          problemSolving: 1,
          competency: 2
        }
      }
    ],
    competencyChecks: ['stakeholder-mgmt'],
    moodImpact: 2
  },
  'conclusion': {
    id: 'conclusion',
    text: "Good job handling this situation. Let's proceed with your plan.",
    speaker: characters[0], // manager
    options: [],
    moodImpact: 1
  }
};

export const sprintConflictScenario: RolePlayScenario = {
  id: 'sprint-conflict',
  title: 'Sprint Priority Conflict',
  context: 'A critical bug has been reported in production, but the team is already at capacity with sprint commitments. As the project lead, you need to manage this situation while considering both technical and stakeholder impacts.',
  timeLimit: 900, // 15 minutes
  stages: {
    preparation: 120,
    execution: 600,
    reflection: 180
  },
  competencyChecks: [
    {
      id: 'prioritization',
      competency: 'Priority Management',
      criteria: [
        'Evaluates urgency vs importance',
        'Considers resource constraints',
        'Communicates decisions clearly'
      ],
      weight: 5
    },
    {
      id: 'stakeholder-mgmt',
      competency: 'Stakeholder Management',
      criteria: [
        'Maintains professional communication',
        'Manages expectations effectively',
        'Finds win-win solutions'
      ],
      weight: 4
    }
  ]
};

export { dialogueNodes, characters }; 