import { useState } from 'react';
import { Candidate, SkillRating, BehavioralTrait, CulturalValue } from '@/types/candidate';
import { Shortlist } from './shortlist/ShortlistModal';
import { ShortlistButton } from './shortlist/ShortlistButton';
import { CandidateDetailModal } from './candidate/CandidateDetailModal';

interface CandidateCardProps {
  candidate: Candidate;
  shortlists: Shortlist[];
  onAddToShortlist: (shortlistId: string, candidateId: string) => void;
  onRemoveFromShortlist: (shortlistId: string, candidateId: string) => void;
}

interface MatchIndicatorProps {
  label: string;
  type: 'required' | 'preferred' | 'bonus';
}

const MatchIndicator: React.FC<MatchIndicatorProps> = ({ label, type }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'required':
        return 'bg-[#005e7a] text-white';
      case 'preferred':
        return 'bg-[#fbb945] text-black';
      case 'bonus':
        return 'bg-[#1ad3bb] text-black';
      default:
        return 'bg-[#f3f4f6] text-gray-600';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${getTypeStyles()}`}>
      {label}
    </span>
  );
};

const SkillBadge: React.FC<{ name: string; rating: number }> = ({ name, rating }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f4f6] hover:bg-[#f3f4f6]/80 transition-colors group">
    <span className="text-xs font-medium text-[#714b67]">{name}</span>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`w-1 h-1 rounded-full mx-0.5 transition-all group-hover:scale-110
            ${i < rating ? 'bg-[#714b67]' : 'bg-gray-400'}`}
        />
      ))}
    </div>
  </div>
);

const FitScore: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-[#005e7a] text-white';
    if (score >= 75) return 'bg-[#fbb945] text-black';
    if (score >= 60) return 'bg-[#1ad3bb] text-black';
    return 'bg-red-600 text-white';
  };

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(score)}`}>
      {score}% Match
    </div>
  );
};

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  shortlists,
  onAddToShortlist,
  onRemoveFromShortlist,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate overall fit score
  const calculateOverallFitScore = () => {
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

  // Sort skills by rating and get top 2
  const topTechnicalSkills = [...candidate.technicalSkills]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const topSoftSkills = [...candidate.softSkills]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const getBehavioralTraitMatches = () => {
    return candidate.softSkills
      .filter((skill: SkillRating) => skill.score >= 4)
      .slice(0, 2)
      .map((skill: SkillRating) => ({
        name: skill.name,
        type: skill.score === 5 ? 'required' as const : 'preferred' as const
      }));
  };

  const getCulturalValueMatches = () => {
    return candidate.culturalValues
      .slice(0, 2)
      .map((value: CulturalValue) => ({
        name: value.name,
        type: 'bonus' as const
      }));
  };

  return (
    <>
      <div 
        className="group block transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#714b67]/20 rounded-xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-5 bg-white border border-[#f3f4f6] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="space-y-1 group-hover:translate-x-1 transition-transform">
                <h3 className="text-lg font-semibold text-[#714b67]">
                  {candidate.firstName} {candidate.lastName}
                </h3>
                <p className="text-sm font-medium text-[#714b67]">{candidate.role}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{candidate.yearsOfExperience} years experience</span>
                  <span>•</span>
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
              <ShortlistButton
                candidateId={candidate.id}
                shortlists={shortlists}
                onAddToShortlist={onAddToShortlist}
                onRemoveFromShortlist={onRemoveFromShortlist}
              />
              <FitScore score={calculateOverallFitScore()} />
            </div>
          </div>

          <div className="h-px bg-[#f3f4f6] my-4" />

          {/* Combined Skills Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...topTechnicalSkills, ...topSoftSkills].map((skill) => (
              <SkillBadge key={skill.name} name={skill.name} rating={skill.score} />
            ))}
          </div>

          <div className="h-px bg-[#f3f4f6] my-4" />

          {/* Behavioral Traits */}
          <div className="space-y-2 mb-4">
            <h4 className="text-xs font-semibold text-[#714b67] uppercase tracking-wider">Key Traits</h4>
            <div className="flex flex-wrap gap-2">
              {getBehavioralTraitMatches().map(trait => (
                <MatchIndicator
                  key={trait.name}
                  label={trait.name}
                  type={trait.type}
                />
              ))}
            </div>
          </div>

          <div className="h-px bg-[#f3f4f6] my-4" />

          {/* Cultural Values */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[#714b67] uppercase tracking-wider">Cultural Alignment</h4>
            <div className="flex flex-wrap gap-2">
              {getCulturalValueMatches().map(value => (
                <MatchIndicator
                  key={value.name}
                  label={value.name}
                  type={value.type}
                />
              ))}
            </div>
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