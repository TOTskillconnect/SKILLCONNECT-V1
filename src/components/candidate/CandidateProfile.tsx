'use client';

import { useRouter } from 'next/navigation';
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
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SkillBadge } from '@/components/common/SkillBadge';

interface CandidateProfileProps {
  candidate: Candidate;
}

const SkillRating = ({ name, rating }: { name: string; rating: number }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{name}</span>
      <span className="text-sm text-gray-500">{rating}/5</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{ width: `${(rating / 5) * 100}%` }}
      />
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
    <div className={`p-4 rounded-lg ${getScoreColor(score)}`}>
      <div className="text-2xl font-bold mb-1">{score}/5</div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

export function CandidateProfile({ candidate }: CandidateProfileProps) {
  const router = useRouter();

  if (!candidate) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Talent Pool
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {candidate.firstName} {candidate.lastName}
                </h1>
                <p className="text-lg text-gray-600">{candidate.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full 
                  ${candidate.availability ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-700'}`}>
                  {candidate.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="w-5 h-5" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BriefcaseIcon className="w-5 h-5" />
                <span>{candidate.experience} years experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon className="w-5 h-5" />
                <a href={`mailto:${candidate.email}`} className="hover:text-accent">
                  {candidate.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="w-5 h-5" />
                <a href={`tel:${candidate.phone}`} className="hover:text-accent">
                  {candidate.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Technical Skills</h3>
                <div className="space-y-3">
                  {candidate.technicalSkills.map(skill => (
                    <SkillRating key={skill.name} name={skill.name} rating={skill.rating} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Soft Skills</h3>
                <div className="space-y-3">
                  {candidate.softSkills.map(skill => (
                    <SkillRating key={skill.name} name={skill.name} rating={skill.rating} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assessments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment History</h2>
            
            <div className="space-y-4">
              {candidate.assessments.map(assessment => (
                <div key={assessment.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AcademicCapIcon className="w-5 h-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                    </div>
                    {assessment.feedback && (
                      <p className="text-sm text-gray-600 mt-2">{assessment.feedback}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <AssessmentStatus status={assessment.status} />
                    {assessment.score && (
                      <span className="text-sm font-medium text-gray-900">
                        Score: {assessment.score}%
                      </span>
                    )}
                    {assessment.completedAt && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        {new Date(assessment.completedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overall Fit */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Fit</h2>
            <div className="flex items-center justify-between mb-6">
              <div className="text-4xl font-bold text-accent">{candidate.overallFitScore}%</div>
              <ChartBarIcon className="w-8 h-8 text-accent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ScoreIndicator score={candidate.leadershipPotential} label="Leadership" />
              <ScoreIndicator score={candidate.problemSolvingScore} label="Problem Solving" />
              <ScoreIndicator score={candidate.collaborationScore} label="Collaboration" />
            </div>
          </div>

          {/* Cultural Values */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cultural Values</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.culturalValues.map(value => (
                <span
                  key={value}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Summary</h2>
            <p className="text-gray-600">{candidate.resumeSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 