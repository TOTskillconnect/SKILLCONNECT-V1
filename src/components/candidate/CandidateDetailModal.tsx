'use client';

import { Dialog } from '@headlessui/react';
import { Candidate } from '@/types/candidate';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  XMarkIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface CandidateDetailModalProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
}

const SkillBadge = ({ name, rating }: { name: string; rating: number }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:border-accent/30 transition-all">
    <div className="flex items-center justify-between mb-2">
      <span className="font-medium text-gray-800">{name}</span>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-gray-200'}`}
          />
        ))}
      </div>
    </div>
  </div>
);

const AssessmentStatus = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'reviewed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ScoreIndicator = ({ score, label }: { score: number; label: string }) => {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-emerald-700 bg-emerald-50';
    if (score >= 3) return 'text-blue-700 bg-blue-50';
    return 'text-amber-700 bg-amber-50';
  };

  return (
    <div className={`p-4 rounded-lg ${getScoreColor(score)} flex items-center gap-3`}>
      <div className="text-2xl font-bold">{score}/5</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

const AIInsights = ({ candidate }: { candidate: Candidate }) => {
  const insights = {
    industry: {
      title: 'Industry Fit',
      matches: [
        {
          name: 'Technology',
          score: candidate.technicalSkills.length >= 3 ? 90 : 75,
          reason: 'Strong technical foundation and problem-solving capabilities'
        },
        {
          name: 'Finance',
          score: candidate.problemSolvingScore >= 4 ? 85 : 70,
          reason: 'Analytical mindset and attention to detail'
        }
      ]
    },
    role: {
      title: 'Role Alignment',
      matches: [
        {
          name: 'Software Engineer',
          score: 88,
          reason: 'Technical expertise matches role requirements'
        },
        {
          name: 'Tech Lead',
          score: candidate.leadershipPotential >= 4 ? 85 : 70,
          reason: 'Shows leadership potential and mentoring capabilities'
        }
      ]
    },
    culture: {
      title: 'Cultural Fit',
      matches: [
        {
          name: 'Innovation-Driven',
          score: candidate.culturalValues.includes('Innovation') ? 92 : 75,
          reason: 'Demonstrates creative problem-solving approach'
        },
        {
          name: 'Collaborative',
          score: candidate.collaborationScore >= 4 ? 90 : 75,
          reason: 'Strong team player with excellent communication'
        }
      ]
    }
  };

  const renderInsightSection = (
    title: string,
    matches: { name: string; score: number; reason: string }[]
  ) => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="space-y-2">
        {matches.map((match, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-800">{match.name}</span>
              <span className={`text-sm font-medium ${
                match.score >= 85 ? 'text-emerald-600' :
                match.score >= 75 ? 'text-blue-600' : 'text-amber-600'
              }`}>
                {match.score}% Match
              </span>
            </div>
            <p className="text-sm text-gray-600">{match.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-accent">
        <LightBulbIcon className="w-5 h-5" />
        <h3 className="font-semibold">AI Career Insights</h3>
      </div>
      
      <div className="space-y-6">
        {renderInsightSection('Industry Fit', insights.industry.matches)}
        {renderInsightSection('Role Alignment', insights.role.matches)}
        {renderInsightSection('Cultural Fit', insights.culture.matches)}
      </div>
    </div>
  );
};

export function CandidateDetailModal({ candidate, isOpen, onClose }: CandidateDetailModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b z-10 px-8 py-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={candidate.profileImage || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"}
                      alt={`${candidate.firstName} ${candidate.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    candidate.stage ? 'bg-emerald-400' : 'bg-gray-300'
                  }`} />
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {candidate.firstName} {candidate.lastName}
                  </Dialog.Title>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <span className="text-lg">{candidate.role}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{candidate.location}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <BriefcaseIcon className="w-4 h-4" />
                      <span>{candidate.yearsOfExperience} years</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-8">
                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <EnvelopeIcon className="w-5 h-5" />
                      <a href={`mailto:${candidate.email}`} className="hover:text-accent">
                        {candidate.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <PhoneIcon className="w-5 h-5" />
                      <a href={`tel:${candidate.phone}`} className="hover:text-accent">
                        {candidate.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills & Expertise</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-4">Technical Skills</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {candidate.technicalSkills.map(skill => (
                          <SkillBadge key={skill.name} name={skill.name} rating={skill.score} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-4">Soft Skills</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {candidate.softSkills.map(skill => (
                          <SkillBadge key={skill.name} name={skill.name} rating={skill.score} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Summary</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{candidate.resumeSummary}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Overall Fit */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Overall Fit</h2>
                    <ChartBarIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl font-bold text-accent">
                      {Math.round((candidate.technicalSkills.reduce((acc, skill) => acc + skill.score, 0) / 
                        candidate.technicalSkills.length) * 20)}%
                    </div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                </div>

                {/* Behavioral Traits */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Behavioral Traits</h2>
                  <div className="space-y-4">
                    {candidate.behavioralTraits.map(trait => (
                      <div key={trait.name} className="flex items-center justify-between">
                        <span className="text-gray-700">{trait.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${i < trait.score ? 'text-accent fill-accent' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Values */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Cultural Values</h2>
                  <div className="space-y-4">
                    {candidate.culturalValues.map(value => (
                      <div key={value.name} className="flex items-center justify-between">
                        <span className="text-gray-700">{value.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${i < value.score ? 'text-accent fill-accent' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 