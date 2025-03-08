'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  TrophyIcon,
  UsersIcon,
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { mockCandidates } from '@/data/mockCandidates';

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock analytics data with weekly breakdown
const analyticsData = {
  overview: {
    totalCandidates: mockCandidates.length,
    activeAssessments: 24,
    avgTimeToHire: '18 days',
    conversionRate: '68%'
  },
  funnel: {
    shortlisted: mockCandidates.filter(c => c.stage === 'shortlisted').length,
    screening: mockCandidates.filter(c => c.stage === 'screening').length,
    validating: mockCandidates.filter(c => c.stage === 'validating').length,
    interview: mockCandidates.filter(c => c.stage === 'interview').length,
    offer: mockCandidates.filter(c => c.stage === 'offer').length
  },
  sources: {
    directSourcing: {
      percentage: 45,
      total: 150,
      tooltip: "Candidates identified directly through our pre vetted talent pool",
      weeklyData: [35, 42, 38, 45] // Last 4 weeks
    },
    challenges: {
      percentage: 30,
      total: 100,
      tooltip: "Candidates who have participated sponsored challenges and competitions",
      weeklyData: [22, 25, 28, 30] // Last 4 weeks
    },
    referral: {
      percentage: 25,
      total: 85,
      tooltip: "Candidates recommended by trusted partners and industry professionals",
      weeklyData: [18, 20, 22, 25] // Last 4 weeks
    }
  },
  timeToHireByRole: {
    'Software Engineer': 21,
    'Product Manager': 25,
    'UX Designer': 18,
    'Data Scientist': 23
  }
};

// Mock feedback data with expanded information
const mockFeedback = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      role: 'Technical Recruiter',
      avatar: '👩‍💼'
    },
    message: 'Strong problem-solving skills demonstrated in the coding challenge. Recommend fast-tracking.',
    timestamp: '2024-03-20T10:30:00Z',
    type: 'positive'
  },
  {
    id: '2',
    author: {
      name: 'James Wilson',
      role: 'Engineering Manager',
      avatar: '👨‍💻'
    },
    message: 'Technical skills are solid but need to evaluate team fit more thoroughly.',
    timestamp: '2024-03-20T09:15:00Z',
    type: 'neutral'
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      role: 'HR Director',
      avatar: '👩‍💼'
    },
    message: 'Cultural alignment looks promising. Scheduled follow-up interview.',
    timestamp: '2024-03-19T16:45:00Z',
    type: 'positive'
  }
];

// Add after the mock feedback data
const mockTechnicalSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs', 'MongoDB', 'PostgreSQL',
  'System Design', 'CI/CD', 'Test Driven Development', 'Microservices',
  'React Native', 'Vue.js', 'Angular', 'Machine Learning', 'Data Structures',
  'Algorithms', 'Cloud Architecture', 'DevOps', 'Security'
];

const mockBehavioralTraits = [
  'Problem Solving', 'Communication', 'Leadership', 'Team Collaboration',
  'Adaptability', 'Time Management', 'Critical Thinking', 'Initiative',
  'Conflict Resolution', 'Decision Making', 'Mentoring', 'Strategic Thinking',
  'Emotional Intelligence', 'Project Management', 'Innovation', 'Accountability',
  'Customer Focus', 'Analytical Thinking', 'Attention to Detail'
];

const mockCulturalValues = [
  'Innovation First', 'Customer Obsession', 'Ownership Mindset', 'Learn & Be Curious',
  'Think Big', 'Bias for Action', 'Earn Trust', 'Dive Deep', 'Have Backbone',
  'Deliver Results', 'Embrace Change', 'Inclusive Mindset', 'Sustainability',
  'Work-Life Balance', 'Continuous Learning', 'Transparency', 'Data-Driven',
  'Quality Focus', 'Collaborative Spirit'
];

// Add new interfaces after existing interfaces
interface CampaignForm {
  title: string;
  role: string;
  department: string;
  location: string;
  technicalSkills: { name: string; importance: 'required' | 'preferred' | 'bonus' }[];
  behavioralTraits: { name: string; importance: 'required' | 'preferred' | 'bonus' }[];
  culturalValues: { name: string; importance: 'required' | 'preferred' | 'bonus' }[];
}

interface ChallengeForm {
  title: string;
  type: string;
  difficulty: string;
  deadline: string;
  description: string;
  requiredSkills: { name: string; importance: 'required' | 'preferred' | 'bonus' }[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
  avatar: string;
}

interface FeedbackMessage {
  id: string;
  content: string;
  timestamp: string;
  authorId: string;
  isUrgent: boolean;
  isRead: boolean;
}

interface FeedbackThread {
  id: string;
  campaignId: string;
  campaignName: string;
  role: string;
  department: string;
  candidateId: string;
  candidateName: string;
  messages: FeedbackMessage[];
  lastMessage: FeedbackMessage;
  unreadCount: number;
  hasUrgent: boolean;
}

const sampleTimeToHireData = [
  { role: 'Software Engineer', days: 25, department: 'Engineering' },
  { role: 'Product Manager', days: 28, department: 'Product' },
  { role: 'UX Designer', days: 18, department: 'Design' },
  { role: 'Data Scientist', days: 22, department: 'Data' },
  { role: 'DevOps Engineer', days: 24, department: 'Engineering' },
  { role: 'Marketing Manager', days: 20, department: 'Marketing' },
  { role: 'Sales Director', days: 26, department: 'Sales' },
  { role: 'HR Specialist', days: 15, department: 'HR' },
];

// Add after existing mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Technical Recruiter',
    department: 'Engineering',
    status: 'online',
    lastActive: 'Active now',
    avatar: '👩‍💼'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Engineering Manager',
    department: 'Engineering',
    status: 'away',
    lastActive: 'Last active 5m ago',
    avatar: '👨‍💻'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'HR Director',
    department: 'HR',
    status: 'offline',
    lastActive: 'Last active 1h ago',
    avatar: '👩‍💼'
  }
];

const mockFeedbackThreads: FeedbackThread[] = [
  {
    id: '1',
    campaignId: 'campaign-1',
    campaignName: 'Senior Software Engineer',
    role: 'Software Engineer',
    department: 'Engineering',
    candidateId: 'candidate-1',
    candidateName: 'John Doe',
    messages: [
      {
        id: 'msg-1',
        content: 'Strong problem-solving skills demonstrated in the coding challenge. Recommend fast-tracking.',
        timestamp: '2024-03-20T10:30:00Z',
        authorId: '1',
        isUrgent: true,
        isRead: false
      },
      {
        id: 'msg-2',
        content: 'Technical skills are solid but need to evaluate team fit more thoroughly.',
        timestamp: '2024-03-20T09:15:00Z',
        authorId: '2',
        isUrgent: false,
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg-1',
      content: 'Strong problem-solving skills demonstrated in the coding challenge. Recommend fast-tracking.',
      timestamp: '2024-03-20T10:30:00Z',
      authorId: '1',
      isUrgent: true,
      isRead: false
    },
    unreadCount: 1,
    hasUrgent: true
  },
  {
    id: '2',
    campaignId: 'campaign-2',
    campaignName: 'Product Manager',
    role: 'Product Manager',
    department: 'Product',
    candidateId: 'candidate-2',
    candidateName: 'Jane Smith',
    messages: [
      {
        id: 'msg-3',
        content: 'Cultural alignment looks promising. Scheduled follow-up interview.',
        timestamp: '2024-03-19T16:45:00Z',
        authorId: '3',
        isUrgent: false,
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg-3',
      content: 'Cultural alignment looks promising. Scheduled follow-up interview.',
      timestamp: '2024-03-19T16:45:00Z',
      authorId: '3',
      isUrgent: false,
      isRead: true
    },
    unreadCount: 0,
    hasUrgent: false
  },
  {
    id: '3',
    campaignId: 'campaign-3',
    campaignName: 'UX Designer',
    role: 'UX Designer',
    department: 'Design',
    candidateId: 'candidate-3',
    candidateName: 'Alex Chen',
    messages: [
      {
        id: 'msg-4',
        content: 'Portfolio review complete - exceptional visual design skills and great attention to accessibility standards.',
        timestamp: '2024-03-20T11:20:00Z',
        authorId: '2',
        isUrgent: false,
        isRead: false
      },
      {
        id: 'msg-5',
        content: 'Candidate has multiple competing offers. Need to expedite our decision.',
        timestamp: '2024-03-20T11:25:00Z',
        authorId: '1',
        isUrgent: true,
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg-5',
      content: 'Candidate has multiple competing offers. Need to expedite our decision.',
      timestamp: '2024-03-20T11:25:00Z',
      authorId: '1',
      isUrgent: true,
      isRead: false
    },
    unreadCount: 2,
    hasUrgent: true
  },
  {
    id: '4',
    campaignId: 'campaign-4',
    campaignName: 'Data Scientist',
    role: 'Data Scientist',
    department: 'Data',
    candidateId: 'candidate-4',
    candidateName: 'Maria Garcia',
    messages: [
      {
        id: 'msg-6',
        content: 'Excellent machine learning background. Her research paper on NLP is directly relevant to our needs.',
        timestamp: '2024-03-20T09:00:00Z',
        authorId: '2',
        isUrgent: false,
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg-6',
      content: 'Excellent machine learning background. Her research paper on NLP is directly relevant to our needs.',
      timestamp: '2024-03-20T09:00:00Z',
      authorId: '2',
      isUrgent: false,
      isRead: true
    },
    unreadCount: 0,
    hasUrgent: false
  },
  {
    id: '5',
    campaignId: 'campaign-5',
    campaignName: 'DevOps Engineer',
    role: 'DevOps Engineer',
    department: 'Engineering',
    candidateId: 'candidate-5',
    candidateName: 'Tom Wilson',
    messages: [
      {
        id: 'msg-7',
        content: 'Strong AWS certification and Kubernetes experience. Technical assessment score: 92%',
        timestamp: '2024-03-19T15:30:00Z',
        authorId: '2',
        isUrgent: false,
        isRead: true
      },
      {
        id: 'msg-8',
        content: 'References checked - all positive. Previous lead role in similar-scale infrastructure.',
        timestamp: '2024-03-20T10:45:00Z',
        authorId: '3',
        isUrgent: false,
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg-8',
      content: 'References checked - all positive. Previous lead role in similar-scale infrastructure.',
      timestamp: '2024-03-20T10:45:00Z',
      authorId: '3',
      isUrgent: false,
      isRead: false
    },
    unreadCount: 1,
    hasUrgent: false
  },
  {
    id: '6',
    campaignId: 'campaign-1',
    campaignName: 'Senior Software Engineer',
    role: 'Software Engineer',
    department: 'Engineering',
    candidateId: 'candidate-6',
    candidateName: 'Sarah Lee',
    messages: [
      {
        id: 'msg-9',
        content: 'Candidate withdrew application - accepted another offer. Need to improve our process timing.',
        timestamp: '2024-03-20T11:00:00Z',
        authorId: '1',
        isUrgent: true,
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg-9',
      content: 'Candidate withdrew application - accepted another offer. Need to improve our process timing.',
      timestamp: '2024-03-20T11:00:00Z',
      authorId: '1',
      isUrgent: true,
      isRead: false
    },
    unreadCount: 1,
    hasUrgent: true
  }
];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState('30d');
  const [feedbackFilter, setFeedbackFilter] = useState('');
  const [newFeedback, setNewFeedback] = useState('');
  const [feedback, setFeedback] = useState(mockFeedback);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [campaignForm, setCampaignForm] = useState<CampaignForm>({
    title: '',
    role: '',
    department: '',
    location: '',
    technicalSkills: [],
    behavioralTraits: [],
    culturalValues: []
  });
  const [challengeForm, setChallengeForm] = useState<ChallengeForm>({
    title: '',
    type: 'coding',
    difficulty: 'medium',
    deadline: '',
    description: '',
    requiredSkills: []
  });

  // Update the state declarations
  const [newSkill, setNewSkill] = useState<{ name: string; importance: 'required' | 'preferred' | 'bonus' }>({ 
    name: '', 
    importance: 'required' 
  });

  const [newTrait, setNewTrait] = useState<{ name: string; importance: 'required' | 'preferred' | 'bonus' }>({ 
    name: '', 
    importance: 'required' 
  });

  const [newValue, setNewValue] = useState<{ name: string; importance: 'required' | 'preferred' | 'bonus' }>({ 
    name: '', 
    importance: 'required' 
  });

  // Add new states for filtered suggestions
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [traitSuggestions, setTraitSuggestions] = useState<string[]>([]);
  const [valueSuggestions, setValueSuggestions] = useState<string[]>([]);
  const [challengeSkillSuggestions, setChallengeSkillSuggestions] = useState<string[]>([]);

  // Add new state for challenge skills
  const [newChallengeSkill, setNewChallengeSkill] = useState<{ name: string; importance: 'required' | 'preferred' | 'bonus' }>({
    name: '',
    importance: 'required'
  });

  // Add to existing state declarations
  const [feedbackThreads, setFeedbackThreads] = useState<FeedbackThread[]>(mockFeedbackThreads);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState({
    campaign: '',
    urgent: false,
    teamMember: ''
  });

  const handleSubmitFeedback = () => {
    if (newFeedback.trim()) {
      const newEntry = {
        id: String(feedback.length + 1),
        author: {
          name: 'Current User',
          role: 'Recruiter',
          avatar: '👤'
        },
        message: newFeedback,
        timestamp: new Date().toISOString(),
        type: 'general'
      };
      setFeedback([newEntry, ...feedback]);
      setNewFeedback('');
    }
  };

  const handleFeedbackClick = (id: string) => {
    setSelectedFeedback(id);
    setChatVisible(true);
  };

  // Helper function for source category styling
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'directSourcing':
        return <UserCircleIcon className="w-6 h-6" />;
      case 'challenges':
        return <TrophyIcon className="w-6 h-6" />;
      case 'referral':
        return <UsersIcon className="w-6 h-6" />;
      default:
        return null;
    }
  };

  // Get the maximum value for the y-axis scale
  const maxWeeklyTotal = Object.values(analyticsData.sources).reduce((max, source) => {
    const sourceMax = Math.max(...source.weeklyData);
    return Math.max(max, sourceMax);
  }, 0);

  // Add new handlers
  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data
    console.log('Campaign Form:', campaignForm);
    setShowCampaignModal(false);
    setCampaignForm({
      title: '',
      role: '',
      department: '',
      location: '',
      technicalSkills: [],
      behavioralTraits: [],
      culturalValues: []
    });
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data
    console.log('Challenge Form:', challengeForm);
    setShowChallengeModal(false);
    setChallengeForm({
      title: '',
      type: 'coding',
      difficulty: 'medium',
      deadline: '',
      description: '',
      requiredSkills: []
    });
  };

  // Update the dropdown menu click handlers
  const handleCampaignClick = () => {
    setShowCreateMenu(false);
    setShowCampaignModal(true);
  };

  const handleChallengeClick = () => {
    setShowCreateMenu(false);
    setShowChallengeModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#ffffff]">
      <h1 className="text-2xl font-bold text-[#714b67] mb-8">Hiring Analytics</h1>
      
      <div className="grid gap-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#714b67] before:to-[#714b67]/70">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#714b67] bg-opacity-10 rounded-lg transform transition-transform duration-300 hover:scale-110">
                <UsersIcon className="w-6 h-6 text-[#714b67]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-xl font-semibold text-[#714b67]">{analyticsData.overview.totalCandidates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#fbb130] before:to-[#fbb130]/70">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#fbb130] bg-opacity-10 rounded-lg transform transition-transform duration-300 hover:scale-110">
                <DocumentCheckIcon className="w-6 h-6 text-[#fbb130]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Assessments</p>
                <p className="text-xl font-semibold text-[#714b67]">{analyticsData.overview.activeAssessments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#1ad3bb] before:to-[#1ad3bb]/70">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#1ad3bb] bg-opacity-10 rounded-lg transform transition-transform duration-300 hover:scale-110">
                <ClockIcon className="w-6 h-6 text-[#1ad3bb]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Time to Hire</p>
                <p className="text-xl font-semibold text-[#714b67]">{analyticsData.overview.avgTimeToHire}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] hover:scale-[1.02] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#fbb130] before:to-[#fbb130]/70">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#fbb130] bg-opacity-10 rounded-lg transform transition-transform duration-300 hover:scale-110">
                <ArrowTrendingUpIcon className="w-6 h-6 text-[#fbb130]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-xl font-semibold text-[#714b67]">{analyticsData.overview.conversionRate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Funnel and Time to Hire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time to Hire Section */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#714b67] before:to-[#714b67]/70">
            <h2 className="text-lg font-semibold text-[#714b67] mb-4">Time to Hire by Role</h2>
            <div className="space-y-4">
              {Object.entries(analyticsData.timeToHireByRole)
                .sort(([, a], [, b]) => b - a)
                .map(([role, days]) => (
                  <div key={role} className="flex items-center justify-between p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200">
                    <span className="text-gray-700">{role}</span>
                    <span className="text-[#714b67] font-medium">{days} days</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Funnel Section */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#fbb130] before:to-[#fbb130]/70">
            <h2 className="text-lg font-semibold text-[#714b67] mb-6">Hiring Funnel</h2>
            <div className="space-y-4">
              {Object.entries(analyticsData.funnel).map(([stage, count]) => (
                <div key={stage} className="relative p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors duration-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{stage}</span>
                    <span className="text-sm text-gray-600">{count} candidates</span>
                  </div>
                  <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#714b67] to-[#714b67]/70 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${(count / analyticsData.overview.totalCandidates) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Sources and Team Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sources Section */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#1ad3bb] before:to-[#1ad3bb]/70">
            <h2 className="text-lg font-semibold text-[#714b67] mb-6">Candidate Sources</h2>
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-64">
                  <Doughnut
                    data={{
                      labels: Object.entries(analyticsData.sources).map(([source]) =>
                        source.replace(/([A-Z])/g, ' $1').trim()
                      ),
                      datasets: [
                        {
                          data: Object.values(analyticsData.sources).map(source => source.total),
                          backgroundColor: [
                            '#714b67',
                            '#fbb130',
                            '#1ad3bb',
                          ],
                          borderColor: [
                            '#714b67',
                            '#fbb130',
                            '#1ad3bb',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      cutout: '70%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            padding: 20,
                            font: {
                              size: 12,
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {Object.entries(analyticsData.sources).map(([source, data], index) => (
                  <div key={source} className="bg-[#f3f4f6] rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {getSourceIcon(source)}
                      <span className="text-sm font-medium text-[#714b67]">
                        {source.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-semibold text-[#714b67]">{data.total}</span>
                      <span className="text-sm text-gray-600">Candidates</span>
                      <div className="mt-2 text-xs text-gray-500">
                        Last 4 weeks trend: {data.weeklyData.join(' → ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Feedback Section */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#f3f4f6] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#714b67] before:to-[#714b67]/70">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#714b67]">Team Feedback</h2>
                {feedbackThreads.some(thread => thread.hasUrgent) && (
                  <span className="px-2 py-1 text-xs font-medium bg-[#fbb130] bg-opacity-10 text-[#714b67] rounded-full">
                    {feedbackThreads.filter(thread => thread.hasUrgent).length} Urgent
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <select
                  className="text-sm border-[#f3f4f6] rounded-md text-[#714b67]"
                  value={filter.campaign}
                  onChange={(e) => setFilter({ ...filter, campaign: e.target.value })}
                >
                  <option value="">All Campaigns</option>
                  {Array.from(new Set(feedbackThreads.map(thread => thread.campaignName))).map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={filter.urgent}
                    onChange={(e) => setFilter({ ...filter, urgent: e.target.checked })}
                    className="rounded border-[#f3f4f6] text-[#714b67]"
                  />
                  Urgent Only
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Thread List */}
              <div className="border border-[#f3f4f6] rounded-lg divide-y divide-[#f3f4f6] bg-white shadow-lg">
                {feedbackThreads
                  .filter(thread => {
                    if (filter.campaign && thread.campaignName !== filter.campaign) return false;
                    if (filter.urgent && !thread.hasUrgent) return false;
                    return true;
                  })
                  .sort((a, b) => {
                    if (a.hasUrgent && !b.hasUrgent) return -1;
                    if (!a.hasUrgent && b.hasUrgent) return 1;
                    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
                  })
                  .map((thread, index) => (
                    <div
                      key={thread.id}
                      className={`
                        flex items-center px-4 py-3 cursor-pointer transition-all duration-200
                        ${thread.hasUrgent ? 'bg-[#fbb130] bg-opacity-5 hover:bg-opacity-10' : 'hover:bg-[#f3f4f6]'}
                        ${selectedThread === thread.id ? 'bg-[#714b67] bg-opacity-5 hover:bg-opacity-10 shadow-md' : ''}
                        border-l-4 ${
                          thread.hasUrgent 
                            ? 'border-l-[#fbb130]' 
                            : thread.unreadCount > 0 
                              ? 'border-l-[#714b67]'
                              : 'border-l-transparent'
                        }
                        hover:scale-[1.01] transform
                      `}
                      onClick={() => setSelectedThread(thread.id)}
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 min-w-0">
                            <h3 className="font-medium text-[#714b67] truncate">{thread.candidateName}</h3>
                            <span className="text-sm text-gray-400 shrink-0">•</span>
                            <span className="text-sm text-gray-500 truncate shrink-0">{thread.role}</span>
                          </div>
                          <div className="flex gap-1.5 ml-auto">
                            {thread.unreadCount > 0 && (
                              <span className="shrink-0 px-1.5 py-0.5 text-xs font-medium bg-[#714b67] bg-opacity-10 text-[#714b67] rounded-full">
                                {thread.unreadCount}
                              </span>
                            )}
                            {thread.hasUrgent && (
                              <span className="shrink-0 px-1.5 py-0.5 text-xs font-medium bg-[#fbb130] bg-opacity-10 text-[#714b67] rounded-full">
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600 truncate flex-1">{thread.lastMessage.content}</p>
                          <span className="text-xs text-gray-400 shrink-0">
                            {new Date(thread.lastMessage.timestamp).toLocaleString(undefined, {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {mockTeamMembers.find(member => member.id === thread.lastMessage.authorId)?.name}
                          </span>
                          <button
                            className="text-xs text-[#714b67] hover:text-[#714b67] font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFeedbackThreads(threads =>
                                threads.map(t =>
                                  t.id === thread.id
                                    ? {
                                        ...t,
                                        hasUrgent: !t.hasUrgent,
                                        messages: t.messages.map(m =>
                                          m.id === t.lastMessage.id ? { ...m, isUrgent: !t.hasUrgent } : m
                                        )
                                      }
                                    : t
                                )
                              );
                            }}
                          >
                            {thread.hasUrgent ? 'Mark as Normal' : 'Mark as Urgent'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Conversation View */}
              <div className="lg:border-l lg:pl-6 border-[#f3f4f6]">
                {selectedThread ? (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-[#714b67]">
                          {feedbackThreads.find(t => t.id === selectedThread)?.candidateName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feedbackThreads.find(t => t.id === selectedThread)?.role}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedThread(null)}
                        className="text-gray-400 hover:text-[#714b67]"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {feedbackThreads
                        .find(thread => thread.id === selectedThread)
                        ?.messages.map(message => (
                          <div
                            key={message.id}
                            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
                              message.isUrgent ? 'bg-gradient-to-r from-[#fbb130]/5 to-[#fbb130]/10 border border-[#fbb130] border-opacity-20' : 'bg-[#f3f4f6]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[#714b67]">
                                  {mockTeamMembers.find(member => member.id === message.authorId)?.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(message.timestamp).toLocaleString()}
                                </span>
                              </div>
                              {message.isUrgent && (
                                <span className="px-2 py-1 text-xs font-medium bg-[#fbb130] bg-opacity-10 text-[#714b67] rounded-full">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{message.content}</p>
                          </div>
                        ))}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 pr-20 border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (newMessage.trim()) {
                              const thread = feedbackThreads.find(t => t.id === selectedThread);
                              if (thread) {
                                const newMsg: FeedbackMessage = {
                                  id: `msg-${Date.now()}`,
                                  content: newMessage,
                                  timestamp: new Date().toISOString(),
                                  authorId: '1',
                                  isUrgent: false,
                                  isRead: true
                                };
                                setFeedbackThreads(threads =>
                                  threads.map(t =>
                                    t.id === selectedThread
                                      ? {
                                          ...t,
                                          messages: [...t.messages, newMsg],
                                          lastMessage: newMsg,
                                          unreadCount: 0
                                        }
                                      : t
                                  )
                                );
                                setNewMessage('');
                              }
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (newMessage.trim()) {
                            const thread = feedbackThreads.find(t => t.id === selectedThread);
                            if (thread) {
                              const newMsg: FeedbackMessage = {
                                id: `msg-${Date.now()}`,
                                content: newMessage,
                                timestamp: new Date().toISOString(),
                                authorId: '1',
                                isUrgent: false,
                                isRead: true
                              };
                              setFeedbackThreads(threads =>
                                threads.map(t =>
                                  t.id === selectedThread
                                    ? {
                                        ...t,
                                        messages: [...t.messages, newMsg],
                                        lastMessage: newMsg,
                                        unreadCount: 0
                                      }
                                    : t
                                )
                              );
                              setNewMessage('');
                            }
                          }
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#714b67] text-white rounded-lg hover:bg-[#714b67]/90 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Select a conversation to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 