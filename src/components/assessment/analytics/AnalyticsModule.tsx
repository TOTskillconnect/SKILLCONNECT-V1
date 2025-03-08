'use client';

import { ChartBarIcon, AcademicCapIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface AnalyticsModuleProps {
  candidateId: string;
  role: string;
}

// Mock data for demonstration
const performanceData = {
  technicalSkills: {
    score: 85,
    breakdown: [
      { name: 'Problem Solving', score: 90 },
      { name: 'Code Quality', score: 85 },
      { name: 'System Design', score: 80 },
      { name: 'Testing', score: 85 }
    ]
  },
  behavioralTraits: {
    score: 88,
    breakdown: [
      { name: 'Communication', score: 90 },
      { name: 'Collaboration', score: 85 },
      { name: 'Leadership', score: 88 },
      { name: 'Adaptability', score: 89 }
    ]
  },
  culturalFit: {
    score: 92,
    breakdown: [
      { name: 'Values Alignment', score: 95 },
      { name: 'Team Dynamics', score: 90 },
      { name: 'Innovation Mindset', score: 92 },
      { name: 'Growth Potential', score: 91 }
    ]
  }
};

const strengthsAndAreas = {
  strengths: [
    'Strong problem-solving capabilities with a systematic approach',
    'Excellent communication and team collaboration skills',
    'High alignment with company values and culture',
    'Demonstrates strong potential for growth and leadership'
  ],
  improvement: [
    'Could further develop system design expertise',
    'Opportunity to enhance testing practices',
    'Room to grow in technical leadership scenarios'
  ]
};

const archetype = {
  primary: 'Innovative Problem Solver',
  description: 'You excel at finding creative solutions to complex challenges while maintaining strong technical standards. Your approach combines analytical thinking with practical implementation.',
  traits: [
    'Analytical thinking',
    'Creative problem-solving',
    'Strong technical foundation',
    'Collaborative mindset'
  ]
};

export function AnalyticsModule({ candidateId, role }: AnalyticsModuleProps) {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-accent/5 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Technical Skills</h3>
                  <span className="text-2xl font-bold text-accent">{performanceData.technicalSkills.score}%</span>
                </div>
              </div>
              <div className="space-y-2">
                {performanceData.technicalSkills.breakdown.map(item => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Behavioral Traits</h3>
                  <span className="text-2xl font-bold text-accent">{performanceData.behavioralTraits.score}%</span>
                </div>
              </div>
              <div className="space-y-2">
                {performanceData.behavioralTraits.breakdown.map(item => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <LightBulbIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Cultural Fit</h3>
                  <span className="text-2xl font-bold text-accent">{performanceData.culturalFit.score}%</span>
                </div>
              </div>
              <div className="space-y-2">
                {performanceData.culturalFit.breakdown.map(item => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Areas for Improvement */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Strengths & Areas for Improvement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Key Strengths</h3>
              <ul className="space-y-2">
                {strengthsAndAreas.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-500" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Areas for Improvement</h3>
              <ul className="space-y-2">
                {strengthsAndAreas.improvement.map((area, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-amber-500" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Archetype */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{archetype.primary}</h3>
              <p className="text-gray-600">Professional Archetype Analysis</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{archetype.description}</p>
          <div className="flex flex-wrap gap-2">
            {archetype.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 