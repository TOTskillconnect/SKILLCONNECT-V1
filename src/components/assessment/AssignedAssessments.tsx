import { useState } from 'react';
import { AssessmentStatus } from '@/types/assessment';
import {
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface AssignedAssessment {
  id: string;
  templateId: string;
  templateTitle: string;
  candidateId: string;
  candidateName: string;
  assignedAt: string;
  status: AssessmentStatus;
  dueDate: string;
  emailSent: boolean;
}

interface AssignedAssessmentsProps {
  assessments: AssignedAssessment[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const statusIcons = {
  pending: ClockIcon,
  in_progress: PlayIcon,
  completed: CheckCircleIcon,
  reviewed: DocumentMagnifyingGlassIcon,
};

const statusColors = {
  pending: 'text-amber-500 bg-amber-50',
  in_progress: 'text-blue-500 bg-blue-50',
  completed: 'text-green-500 bg-green-50',
  reviewed: 'text-purple-500 bg-purple-50',
};

export function AssignedAssessments({ assessments }: AssignedAssessmentsProps) {
  const [statusFilter, setStatusFilter] = useState<AssessmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssessments = assessments.filter(assessment => {
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    const matchesSearch = 
      assessment.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.templateTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const resendEmail = (assessmentId: string) => {
    // In MVP, just log the action
    console.log('Resending email for assessment:', assessmentId);
    alert('Email notification resent successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AssessmentStatus | 'all')}
            className="px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white text-[#714b67]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search by candidate or assessment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white text-[#714b67] w-64"
        />
      </div>

      {/* Assessment List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="group block transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#714b67]/20 rounded-xl cursor-pointer"
          >
            <div className="p-5 bg-white border border-[#f3f4f6] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1 group-hover:translate-x-1 transition-transform">
                  <h3 className="text-lg font-semibold text-[#714b67] mb-1">
                    {assessment.templateTitle}
                  </h3>
                  <p className="text-sm text-[#714b67]/70">
                    Assigned to: {assessment.candidateName}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={assessment.status} />
                  {assessment.emailSent && (
                    <span className="text-xs text-[#1ad3bb] bg-[#1ad3bb]/10 px-2 py-1 rounded-full">
                      Email Sent
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-[#f3f4f6] my-4" />

              <div className="flex items-center gap-4 text-sm text-[#714b67]/60">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  Assigned: {formatDate(assessment.assignedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  Due: {formatDate(assessment.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const StatusBadge: React.FC<{ status: AssessmentStatus }> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-[#fbb130] text-white';
      case 'in_progress':
        return 'bg-[#1ad3bb] text-black';
      case 'completed':
        return 'bg-[#714b67] text-white';
      case 'reviewed':
        return 'bg-[#005e7a] text-white';
      default:
        return 'bg-[#f3f4f6] text-[#714b67]';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </span>
  );
}; 