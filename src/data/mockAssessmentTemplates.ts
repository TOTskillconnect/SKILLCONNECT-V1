import { AssessmentTemplate } from '@/types/assessment';

export const mockAssessmentTemplates: AssessmentTemplate[] = [
  // Finance Templates
  {
    id: 'fin-1',
    type: 'job-knowledge',
    title: 'Financial Analysis & Reporting',
    description: 'Assessment of financial analysis, reporting, and regulatory compliance knowledge.',
    duration: 45,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'Explain the key differences between GAAP and IFRS reporting standards.',
        type: 'text',
        points: 20
      },
      {
        id: 'q2',
        text: 'Which financial ratio would be most appropriate to assess a company\'s liquidity?',
        type: 'multiple_choice',
        options: [
          'Current Ratio',
          'Debt-to-Equity Ratio',
          'Return on Assets',
          'Price-to-Earnings Ratio'
        ],
        correctAnswer: 'Current Ratio',
        points: 15
      }
    ],
    targetRole: ['Financial Analyst', 'Accountant', 'Finance Manager'],
    skillsAssessed: ['Financial Analysis', 'Accounting Standards', 'Financial Reporting', 'Risk Assessment']
  },
  
  // Marketing Templates
  {
    id: 'mkt-1',
    type: 'job-knowledge',
    title: 'Digital Marketing Strategy',
    description: 'Evaluation of digital marketing knowledge, analytics, and campaign management.',
    duration: 40,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'What are the key components of a successful content marketing strategy?',
        type: 'text',
        points: 20
      },
      {
        id: 'q2',
        text: 'Which metric is most relevant for measuring social media engagement?',
        type: 'multiple_choice',
        options: [
          'Impressions',
          'Engagement Rate',
          'Click-through Rate',
          'Conversion Rate'
        ],
        correctAnswer: 'Engagement Rate',
        points: 15
      }
    ],
    targetRole: ['Marketing Manager', 'Digital Marketing Specialist', 'Content Strategist'],
    skillsAssessed: ['Digital Marketing', 'Analytics', 'Content Strategy', 'Campaign Management']
  },

  // Management Templates
  {
    id: 'mgmt-1',
    type: 'job-knowledge',
    title: 'Leadership & Team Management',
    description: 'Assessment of leadership skills, team management, and strategic planning.',
    duration: 50,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'Describe your approach to managing underperforming team members.',
        type: 'text',
        points: 25
      },
      {
        id: 'q2',
        text: 'What is the most effective way to handle conflict between team members?',
        type: 'multiple_choice',
        options: [
          'Immediate intervention',
          'Let them resolve it themselves',
          'Schedule a mediated discussion',
          'Escalate to HR'
        ],
        correctAnswer: 'Schedule a mediated discussion',
        points: 20
      }
    ],
    targetRole: ['Team Lead', 'Department Manager', 'Project Manager'],
    skillsAssessed: ['Leadership', 'Conflict Resolution', 'Team Building', 'Strategic Planning']
  },

  // Sales Templates
  {
    id: 'sales-1',
    type: 'job-knowledge',
    title: 'Sales Strategy & Negotiation',
    description: 'Evaluation of sales techniques, negotiation skills, and customer relationship management.',
    duration: 35,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'What strategies do you use to overcome common sales objections?',
        type: 'text',
        points: 20
      },
      {
        id: 'q2',
        text: 'Which approach is most effective for building long-term client relationships?',
        type: 'multiple_choice',
        options: [
          'Regular follow-ups',
          'Offering discounts',
          'Value-added consulting',
          'Social networking'
        ],
        correctAnswer: 'Value-added consulting',
        points: 15
      }
    ],
    targetRole: ['Sales Representative', 'Account Manager', 'Business Development'],
    skillsAssessed: ['Sales Strategy', 'Negotiation', 'Client Relations', 'Business Development']
  },

  // Customer Service Templates
  {
    id: 'cs-1',
    type: 'job-knowledge',
    title: 'Customer Service Excellence',
    description: 'Assessment of customer service skills, problem resolution, and communication.',
    duration: 30,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'How do you handle an angry customer who has a valid complaint?',
        type: 'text',
        points: 20
      },
      {
        id: 'q2',
        text: 'What is the best approach to handle multiple customer inquiries simultaneously?',
        type: 'multiple_choice',
        options: [
          'First-come, first-served',
          'Priority-based handling',
          'Delegate to others',
          'Quick responses to all'
        ],
        correctAnswer: 'Priority-based handling',
        points: 15
      }
    ],
    targetRole: ['Customer Service Representative', 'Support Specialist', 'Customer Success Manager'],
    skillsAssessed: ['Customer Service', 'Problem Resolution', 'Communication', 'Multi-tasking']
  },

  // Behavioral Assessment Template
  {
    id: 'beh-1',
    type: 'behavioral',
    title: 'Professional Behavior Assessment',
    description: 'Evaluation of workplace behavior, adaptability, and interpersonal skills.',
    duration: 40,
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        text: 'Describe a situation where you had to adapt to a significant change at work.',
        type: 'text',
        points: 25
      },
      {
        id: 'q2',
        text: 'How do you typically handle feedback on your work?',
        type: 'multiple_choice',
        options: [
          'Implement changes immediately',
          'Analyze and discuss further',
          'Seek additional perspectives',
          'Defend your approach'
        ],
        correctAnswer: 'Analyze and discuss further',
        points: 20
      }
    ],
    targetRole: ['All Roles'],
    skillsAssessed: ['Adaptability', 'Communication', 'Emotional Intelligence', 'Professional Growth']
  }
]; 