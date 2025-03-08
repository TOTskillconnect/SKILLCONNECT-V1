'use client';

import { useState } from 'react';
import { AssessmentMenu } from '@/components/assessment/AssessmentMenu';
import { AssignedAssessments } from '@/components/assessment/AssignedAssessments';
import { mockAssessmentTemplates } from '@/data/mockAssessmentTemplates';
import { assessmentTypes } from '@/data/assessmentTypes';
import { AssessmentStatus } from '@/types/assessment';
import { 
  PlusIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { mockCandidates } from '@/data/mockCandidates';
import { AssignCandidatesModal } from '@/components/assessment/AssignCandidatesModal';

interface AssignmentData {
  candidateIds: string[];
}

interface CustomAssessmentData {
  title: string;
  type: string;
  duration: number;
  candidateIds: string[];
}

// Mock shortlists data
const mockShortlists = [
  {
    id: '1',
    name: 'Frontend Developers',
    candidateIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Backend Developers',
    candidateIds: ['4', '5', '6']
  }
];

export default function AssessmentConsolePage() {
  const [activeTab, setActiveTab] = useState<'create' | 'assigned'>('create');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [customAssessmentData, setCustomAssessmentData] = useState<CustomAssessmentData>({
    title: '',
    type: '',
    duration: 30,
    candidateIds: [],
  });

  // Mock data for assigned assessments
  const mockAssignedAssessments = [
    {
      id: '1',
      templateId: 'fin-1',
      templateTitle: 'Financial Analysis & Reporting',
      candidateId: 'c1',
      candidateName: 'John Smith',
      assignedAt: '2024-03-20T10:00:00Z',
      status: 'pending' as AssessmentStatus,
      dueDate: '2024-03-27T10:00:00Z',
      emailSent: true
    },
    {
      id: '2',
      templateId: 'mkt-1',
      templateTitle: 'Digital Marketing Strategy',
      candidateId: 'c2',
      candidateName: 'Sarah Johnson',
      assignedAt: '2024-03-19T15:30:00Z',
      status: 'in_progress' as AssessmentStatus,
      dueDate: '2024-03-26T15:30:00Z',
      emailSent: true
    }
  ];

  const handleCreateAssessment = () => {
    console.log('Custom assessment data:', customAssessmentData);
    setShowWizard(false);
    setWizardStep(1);
    setCustomAssessmentData({
      title: '',
      type: '',
      duration: 30,
      candidateIds: [],
    });
  };

  const handleAssignAssessment = (data: AssignmentData) => {
    console.log('Assignment data:', data);
    alert(`Assessment assigned to ${data.candidateIds.length} candidates`);
  };

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#714b67] mb-2">Assessment Console</h1>
          <p className="text-[#714b67]/80">
            Create, manage, and track assessments for candidates
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-[#f3f4f6]">
          <nav className="flex space-x-8" aria-label="Assessment Console Tabs">
            <button
              onClick={() => setActiveTab('create')}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'create'
                  ? 'border-[#714b67] text-[#714b67]'
                  : 'border-transparent text-[#714b67]/60 hover:text-[#714b67] hover:border-[#714b67]/20'}
              `}
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Create & Templates
            </button>
            <button
              onClick={() => setActiveTab('assigned')}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'assigned'
                  ? 'border-[#714b67] text-[#714b67]'
                  : 'border-transparent text-[#714b67]/60 hover:text-[#714b67] hover:border-[#714b67]/20'}
              `}
            >
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
              Assigned Assessments
            </button>
          </nav>
        </div>

        {/* Create & Templates Tab */}
        {activeTab === 'create' && (
          <div className="space-y-8">
            {/* Create Custom Assessment Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#fbb130] rounded-lg hover:bg-[#fbb130]/90 transition-colors shadow-sm hover:shadow-md"
              >
                <PlusIcon className="w-5 h-5" />
                Create Custom Assessment
              </button>
            </div>

            {/* Assessment Templates */}
            <AssessmentMenu 
              templates={mockAssessmentTemplates} 
              onAssign={handleAssignAssessment}
            />
          </div>
        )}

        {/* Assigned Assessments Tab */}
        {activeTab === 'assigned' && (
          <AssignedAssessments assessments={mockAssignedAssessments} />
        )}

        {/* Custom Assessment Wizard Modal */}
        {showWizard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#ffffff] rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-[#f3f4f6]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#714b67]">Create Custom Assessment</h2>
                    <p className="text-sm text-[#714b67]/70 mt-1">Step {wizardStep} of 3</p>
                  </div>
                  <button
                    onClick={() => setShowWizard(false)}
                    className="p-2 text-[#714b67]/60 hover:text-[#714b67] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#f3f4f6] rounded-full h-2">
                  <div
                    className="bg-[#fbb130] h-2 rounded-full transition-all"
                    style={{ width: `${(wizardStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-6 space-y-6">
                {wizardStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-[#714b67] mb-2">
                        Assessment Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={customAssessmentData.title}
                        onChange={(e) =>
                          setCustomAssessmentData({ ...customAssessmentData, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white"
                        placeholder="Enter assessment title"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-[#714b67] mb-2">
                        Assessment Type
                      </label>
                      <select
                        id="type"
                        value={customAssessmentData.type}
                        onChange={(e) =>
                          setCustomAssessmentData({ ...customAssessmentData, type: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="job-knowledge">Job Knowledge</option>
                        <option value="behavioral">Behavioral</option>
                        <option value="roleplay">Roleplay</option>
                        <option value="situational">Situational</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-[#714b67] mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        value={customAssessmentData.duration}
                        onChange={(e) =>
                          setCustomAssessmentData({
                            ...customAssessmentData,
                            duration: parseInt(e.target.value) || 30,
                          })
                        }
                        min="15"
                        max="180"
                        step="15"
                        className="w-full px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white"
                        required
                      />
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <AssignCandidatesModal
                    candidates={mockCandidates}
                    shortlists={mockShortlists}
                    onSelect={(candidateIds) =>
                      setCustomAssessmentData({ ...customAssessmentData, candidateIds })
                    }
                  />
                )}

                {wizardStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#714b67]">Review Assessment Details</h3>
                    <div className="bg-[#f3f4f6] p-4 rounded-lg space-y-2">
                      <p className="text-[#714b67]">
                        <span className="font-medium">Title:</span> {customAssessmentData.title}
                      </p>
                      <p className="text-[#714b67]">
                        <span className="font-medium">Type:</span> {customAssessmentData.type}
                      </p>
                      <p className="text-[#714b67]">
                        <span className="font-medium">Duration:</span> {customAssessmentData.duration} minutes
                      </p>
                      <p className="text-[#714b67]">
                        <span className="font-medium">Selected Candidates:</span>{' '}
                        {customAssessmentData.candidateIds.length}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  {wizardStep > 1 && (
                    <button
                      onClick={() => setWizardStep((prev) => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev))}
                      className="px-4 py-2 text-sm font-medium text-[#714b67] bg-[#f3f4f6] rounded-lg hover:bg-[#f3f4f6]/80"
                    >
                      Previous
                    </button>
                  )}
                  <div className="ml-auto">
                    <button
                      onClick={() => {
                        if (wizardStep === 3) {
                          handleCreateAssessment();
                        } else {
                          setWizardStep((prev) => (prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev));
                        }
                      }}
                      disabled={
                        (wizardStep === 1 && (!customAssessmentData.title || !customAssessmentData.type)) ||
                        (wizardStep === 2 && customAssessmentData.candidateIds.length === 0)
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-[#714b67] rounded-lg hover:bg-[#714b67]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {wizardStep === 3 ? 'Create Assessment' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 