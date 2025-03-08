import { useState } from 'react';
import { Candidate, Assessment } from '@/types/candidate';
import { CheckBadgeIcon, AcademicCapIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { CandidateDetailModal } from '../candidate/CandidateDetailModal';

interface PipelineCandidateCardProps {
  candidate: Candidate;
  columnId: string;
}

export const CandidateCard: React.FC<PipelineCandidateCardProps> = ({
  candidate,
  columnId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('candidateId', candidate.id);
    e.dataTransfer.setData('fromStage', columnId);
  };

  const getCardStyle = (columnId: string) => {
    const baseStyle = 'p-4 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-move';
    switch (columnId) {
      case 'shortlisted':
        return `${baseStyle} border-[#714b67]/30 hover:border-[#714b67]/50 bg-[#f3f4f6] hover:bg-[#f3f4f6]/90`;
      case 'screening':
        return `${baseStyle} border-[#1ad3bb]/30 hover:border-[#1ad3bb]/50 bg-[#f3f4f6] hover:bg-[#f3f4f6]/90`;
      case 'validating':
        return `${baseStyle} border-[#fbb130]/30 hover:border-[#fbb130]/50 bg-[#f3f4f6] hover:bg-[#f3f4f6]/90`;
      case 'interview':
        return `${baseStyle} border-[#714b67]/30 hover:border-[#714b67]/50 bg-[#f3f4f6] hover:bg-[#f3f4f6]/90`;
      case 'offer':
        return `${baseStyle} border-[#1ad3bb]/30 hover:border-[#1ad3bb]/50 bg-[#f3f4f6] hover:bg-[#f3f4f6]/90`;
      default:
        return `${baseStyle} border-[#714b67]/20 bg-[#ffffff]`;
    }
  };

  const getStageIndicator = (columnId: string) => {
    const baseStyle = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
    switch (columnId) {
      case 'shortlisted':
        return {
          icon: <CheckBadgeIcon className="w-4 h-4 mr-1" />,
          text: 'Shortlisted',
          style: `${baseStyle} bg-[#714b67]/10 text-[#714b67]`
        };
      case 'screening': {
        const completedAssessments = candidate.assessments?.filter((a: Assessment) => a.status === 'completed')?.length ?? 0;
        const totalAssessments = candidate.assessments?.length ?? 0;
        return {
          icon: <AcademicCapIcon className="w-4 h-4 mr-1" />,
          text: `${completedAssessments}/${totalAssessments} Completed`,
          style: `${baseStyle} bg-[#1ad3bb]/10 text-[#1ad3bb]`
        };
      }
      case 'validating':
        return {
          icon: <ChartBarIcon className="w-4 h-4 mr-1" />,
          text: `${calculateFitScore()}% Match`,
          style: `${baseStyle} bg-[#fbb130]/10 text-[#fbb130]`
        };
      case 'interview':
        return {
          icon: <UserGroupIcon className="w-4 h-4 mr-1" />,
          text: 'Interview Ready',
          style: `${baseStyle} bg-[#714b67]/10 text-[#714b67]`
        };
      case 'offer':
        return {
          icon: <CheckBadgeIcon className="w-4 h-4 mr-1" />,
          text: 'Ready to Hire',
          style: `${baseStyle} bg-[#1ad3bb]/10 text-[#1ad3bb]`
        };
      default:
        return null;
    }
  };

  const calculateFitScore = () => {
    const technicalScore = candidate.technicalSkills.reduce((acc, skill) => acc + skill.score, 0) / 
      candidate.technicalSkills.length;
    const softScore = candidate.softSkills.reduce((acc, skill) => acc + skill.score, 0) / 
      candidate.softSkills.length;
    const behavioralScore = candidate.behavioralTraits.reduce((acc, trait) => acc + trait.score, 0) / 
      candidate.behavioralTraits.length;
    const culturalScore = candidate.culturalValues.reduce((acc, value) => acc + value.score, 0) / 
      candidate.culturalValues.length;
    
    return Math.round((technicalScore + softScore + behavioralScore + culturalScore) * 5);
  };

  const indicator = getStageIndicator(columnId);

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={() => setIsModalOpen(true)}
        className={getCardStyle(columnId)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-[#714b67] group-hover:text-[#714b67]/90 transition-colors">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p className="text-sm text-[#714b67]/70">{candidate.role}</p>
            </div>
            {indicator && (
              <span className={indicator.style}>
                {indicator.icon}
                {indicator.text}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {candidate.technicalSkills.slice(0, 3).map((skill: { name: string }) => (
              <span
                key={skill.name}
                className="px-2 py-1 text-xs rounded-full bg-[#f3f4f6] text-[#714b67]"
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-[#714b67]/70">
            <span>{candidate.location}</span>
            <span>{candidate.yearsOfExperience}y exp</span>
          </div>
        </div>
      </div>

      <CandidateDetailModal
        candidate={candidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}; 