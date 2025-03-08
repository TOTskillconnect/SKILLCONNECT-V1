import { Candidate } from '@/types/candidate';
import { CandidateCard } from './PipelineCandidateCard';
import { CheckCircleIcon, ClipboardIcon, UserGroupIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/outline';

interface PipelineColumnProps {
  id: string;
  title: string;
  candidates: Candidate[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({
  id,
  title,
  candidates,
  onDragOver,
  onDrop,
}) => {
  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case 'shortlisted':
        return 'bg-[#f3f4f6] border-[#714b67]/10';
      case 'screening':
        return 'bg-[#f3f4f6] border-[#714b67]/10';
      case 'validating':
        return 'bg-[#f3f4f6] border-[#714b67]/10';
      case 'interview':
        return 'bg-[#f3f4f6] border-[#714b67]/10';
      case 'offer':
        return 'bg-[#f3f4f6] border-[#714b67]/10';
      default:
        return 'bg-[#ffffff] border-[#714b67]/10';
    }
  };

  const getColumnHeaderColor = (columnId: string) => {
    switch (columnId) {
      case 'shortlisted':
        return 'text-[#714b67]';
      case 'screening':
        return 'text-[#714b67]';
      case 'validating':
        return 'text-[#714b67]';
      case 'interview':
        return 'text-[#714b67]';
      case 'offer':
        return 'text-[#714b67]';
      default:
        return 'text-[#714b67]/60';
    }
  };

  const getStageIcon = (columnId: string) => {
    const className = "w-5 h-5";
    switch (columnId) {
      case 'shortlisted':
        return <StarIcon className={className} />;
      case 'screening':
        return <ClipboardIcon className={className} />;
      case 'validating':
        return <ChartBarIcon className={className} />;
      case 'interview':
        return <UserGroupIcon className={className} />;
      case 'offer':
        return <CheckCircleIcon className={className} />;
      default:
        return null;
    }
  };

  const getStageDescription = (columnId: string) => {
    switch (columnId) {
      case 'shortlisted':
        return 'Candidates selected for initial evaluation';
      case 'screening':
        return 'Technical and soft skills assessment';
      case 'validating':
        return 'Evaluating role and culture fit';
      case 'interview':
        return 'Ready for team interviews';
      case 'offer':
        return 'Final stage - ready to hire';
      default:
        return '';
    }
  };

  return (
    <div
      className={`rounded-lg p-4 border ${getColumnColor(id)} transition-colors`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={getColumnHeaderColor(id)}>
              {getStageIcon(id)}
            </span>
            <h2 className={`text-lg font-semibold ${getColumnHeaderColor(id)}`}>{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 bg-[#ffffff] rounded text-sm font-medium ${getColumnHeaderColor(id)} border border-[#714b67]/10 shadow-sm`}>
              {candidates.length}
            </span>
          </div>
        </div>
        <p className="text-sm text-[#714b67]/80">{getStageDescription(id)}</p>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {candidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            columnId={id}
          />
        ))}
        {candidates.length === 0 && (
          <div className={`h-32 flex items-center justify-center border-2 border-dashed rounded-lg ${getColumnColor(id).replace('bg-', 'border-')}`}>
            <div className="text-center">
              <span className={`block mb-1 ${getColumnHeaderColor(id)}`}>
                {getStageIcon(id)}
              </span>
              <span className="text-sm text-[#714b67]/60">
                Drop candidate here
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 