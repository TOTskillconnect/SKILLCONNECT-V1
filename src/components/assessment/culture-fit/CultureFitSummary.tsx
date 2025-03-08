'use client';

import { CultureProfile } from '@/types/cultureFit';
import { companyValues } from '@/data/mockCultureFitData';
import {
  LightBulbIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CultureFitSummaryProps {
  profile: CultureProfile;
}

const iconMap = {
  innovation: LightBulbIcon,
  collaboration: UserGroupIcon,
  integrity: ShieldCheckIcon,
  excellence: SparklesIcon,
  accountability: ChartBarIcon
};

const strengthLabels = {
  collaboration: 'Team Player',
  communication: 'Clear Communicator',
  adaptability: 'Adaptable',
  leadership: 'Natural Leader'
};

export function CultureFitSummary({ profile }: CultureFitSummaryProps) {
  const topValues = Object.entries(profile.valueAlignment)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const topCulturalTraits = Object.entries(profile.culturalPreferences)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const teamStrengths = Object.entries(profile.teamDynamics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-full">
            <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cultural Fit Profile</h2>
            <p className="text-gray-600">Your unique cultural alignment and work style</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Value Alignment */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Value Alignment</h3>
          <div className="space-y-4">
            {topValues.map(([valueId, score], index) => {
              const value = companyValues.find(v => v.id === valueId);
              const Icon = iconMap[valueId as keyof typeof iconMap];
              return (
                <div key={valueId} className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{value?.title}</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(score * 100)}% match
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cultural Preferences */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cultural Approach</h3>
          <div className="space-y-4">
            {topCulturalTraits.map(([trait, score]) => (
              <div key={trait} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 capitalize">{trait}</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(score * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  You show a strong preference for {trait.toLowerCase()}-driven approaches
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Dynamics */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Dynamic Strengths</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {teamStrengths.map(([trait, score]) => (
              <div key={trait} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {strengthLabels[trait as keyof typeof strengthLabels]}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round(score * 100)}%
                    </span>
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