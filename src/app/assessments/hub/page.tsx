'use client';

import { useState } from 'react';
import React from 'react';
import { assessmentTypes } from '@/data/assessmentTypes';
import { JobFitModule } from '@/components/assessment/JobFitModule';
import { JobKnowledgeModule } from '@/components/assessment/JobKnowledgeModule';
import { RolePlayModule } from '@/components/assessment/roleplay/RolePlayModule';
import { BehavioralModule } from '@/components/assessment/behavioral/BehavioralModule';
import { AnalyticsModule } from '@/components/assessment/analytics/AnalyticsModule';
import { SituationalJudgmentModule } from '@/components/assessment/situational/SituationalJudgmentModule';

export default function AssessmentHubPage() {
  const [selectedModule, setSelectedModule] = useState(assessmentTypes[0].id);

  // For demo purposes - in a real app, these would come from the route or context
  const candidateId = "demo-candidate";
  const role = "Software Engineer";

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#714b67] mb-2">
            Assessment Hub
          </h1>
          <p className="text-[#714b67]/80">
            Complete your assigned assessments to showcase your skills and experience
          </p>
        </div>

        {/* Module Navigation */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm mb-6">
          <div className="border-b border-[#f3f4f6]">
            <nav className="flex space-x-8 px-6" aria-label="Assessment Modules">
              {assessmentTypes.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${selectedModule === module.id
                      ? 'border-[#714b67] text-[#714b67]'
                      : 'border-transparent text-[#714b67]/60 hover:text-[#714b67] hover:border-[#714b67]/50'}
                  `}
                >
                  <module.icon className="w-5 h-5" />
                  {module.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Module Description */}
          <div className="p-6 bg-[#ffffff] border-b border-[#f3f4f6]">
            <div className="flex items-center gap-3">
              {assessmentTypes.find(m => m.id === selectedModule)?.icon && (
                <div className="p-2 bg-[#f3f4f6] rounded-lg shadow-sm">
                  {React.createElement(
                    assessmentTypes.find(m => m.id === selectedModule)?.icon as any,
                    { className: "w-6 h-6 text-[#714b67]" }
                  )}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-[#714b67]">
                  {assessmentTypes.find(m => m.id === selectedModule)?.name}
                </h2>
                <p className="text-sm text-[#714b67]/80">
                  {assessmentTypes.find(m => m.id === selectedModule)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="p-6">
            {selectedModule === 'job-fit' && (
              <JobFitModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'behavioral' && (
              <BehavioralModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'roleplay' && (
              <RolePlayModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'job-knowledge' && (
              <JobKnowledgeModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'situational' && (
              <SituationalJudgmentModule candidateId={candidateId} role={role} />
            )}
            {selectedModule === 'analytics' && (
              <AnalyticsModule candidateId={candidateId} role={role} />
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#714b67]">Assessment Progress</h3>
            <span className="text-sm font-medium text-[#714b67]/60">{assessmentTypes.length} Modules</span>
          </div>
          <div className="space-y-4">
            {assessmentTypes.map((module) => (
              <div key={module.id} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  module.id === selectedModule ? 'bg-[#714b67]/10' : 'bg-[#f3f4f6]'
                }`}>
                  <module.icon className={`w-5 h-5 ${
                    module.id === selectedModule ? 'text-[#714b67]' : 'text-[#714b67]/60'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#714b67]">{module.name}</span>
                    <span className="text-xs text-[#714b67]/60">Not started</span>
                  </div>
                  <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#fbb130] w-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 