'use client';

import { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PuzzlePieceIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import { JobFitModule } from '@/components/assessment/JobFitModule';

interface AssessmentHubProps {
  candidateId: string;
  role: string;
}

const modules = [
  {
    id: 'role-fit',
    name: 'Role Fit',
    icon: ChatBubbleLeftRightIcon,
    description: 'Interactive job simulation through chat-based scenarios'
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: PuzzlePieceIcon,
    description: 'Gamified assessment of key behavioral traits'
  },
  {
    id: 'roleplay',
    name: 'Role Play',
    icon: UserGroupIcon,
    description: 'Dynamic conversation scenarios with simulated stakeholders'
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: AcademicCapIcon,
    description: 'Adaptive assessment of role-specific knowledge'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: ChartBarIcon,
    description: 'Performance insights and candidate archetype'
  }
];

export function AssessmentHub({ candidateId, role }: AssessmentHubProps) {
  const [selectedModule, setSelectedModule] = useState(modules[0].id);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Integrated Assessment System
          </h1>
          <p className="text-gray-600">
            Complete the following modules to showcase your skills and experience
          </p>
        </div>

        {/* Module Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Assessment Modules">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${selectedModule === module.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <module.icon className="w-5 h-5" />
                  {module.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Module Description */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex items-center gap-3">
              {modules.find(m => m.id === selectedModule)?.icon && (
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {React.createElement(
                    modules.find(m => m.id === selectedModule)?.icon as any,
                    { className: "w-6 h-6 text-accent" }
                  )}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {modules.find(m => m.id === selectedModule)?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {modules.find(m => m.id === selectedModule)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="p-6">
            {selectedModule === 'role-fit' && (
              <JobFitModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'behavioral' && (
              <BehavioralModule candidateId={candidateId} />
            )}
            {selectedModule === 'roleplay' && (
              <RolePlayModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'technical' && (
              <TechnicalModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'analytics' && (
              <AnalyticsModule candidateId={candidateId} />
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Assessment Progress</h3>
            <span className="text-sm font-medium text-gray-600">2 of 5 completed</span>
          </div>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  module.id === selectedModule ? 'bg-accent/10' : 'bg-gray-100'
                }`}>
                  <module.icon className={`w-5 h-5 ${
                    module.id === selectedModule ? 'text-accent' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{module.name}</span>
                    <span className="text-xs text-gray-500">Not started</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for each module
function BehavioralModule({ candidateId }: { candidateId: string }) {
  return <div>Behavioral Module Content</div>;
}

function RolePlayModule({ candidateId, role }: { candidateId: string; role: string }) {
  return <div>Role Play Module Content</div>;
}

function TechnicalModule({ candidateId, role }: { candidateId: string; role: string }) {
  return <div>Technical Module Content</div>;
}

function AnalyticsModule({ candidateId }: { candidateId: string }) {
  return <div>Analytics Module Content</div>;
} 