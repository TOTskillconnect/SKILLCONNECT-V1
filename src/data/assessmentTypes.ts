import { 
  ChatBubbleLeftRightIcon, 
  PuzzlePieceIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export const assessmentTypes = [
  {
    id: 'job-knowledge',
    name: 'Job Knowledge',
    icon: AcademicCapIcon,
    description: 'Evaluate role-specific knowledge and expertise',
    roles: [
      'Finance',
      'Marketing',
      'Management',
      'Sales',
      'Customer Service',
      'Software Engineering',
      'Product Management'
    ]
  },
  {
    id: 'behavioral',
    name: 'Behavioral Assessment',
    icon: PuzzlePieceIcon,
    description: 'Evaluate decision-making and behavioral competencies',
    roles: ['All Roles']
  },
  {
    id: 'roleplay',
    name: 'Role Play Scenarios',
    icon: UserGroupIcon,
    description: 'Interactive scenarios with simulated stakeholders',
    roles: ['All Roles']
  },
  {
    id: 'situational',
    name: 'Situational Judgment',
    icon: BriefcaseIcon,
    description: 'Real-world problem-solving and decision-making scenarios',
    roles: ['All Roles']
  }
];

export type AssessmentTypeId = typeof assessmentTypes[number]['id']; 