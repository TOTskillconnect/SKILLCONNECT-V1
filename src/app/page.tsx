'use client';

import { useState, useCallback, useMemo } from 'react';
import { CandidateCard } from '@/components/CandidateCard';
import { SearchFilters } from '@/components/SearchFilters';
import { mockCandidates } from '@/data/mockCandidates';
import { ShortlistModal, Shortlist } from '@/components/shortlist/ShortlistModal';
import { HireContextModal } from '@/components/HireContextModal';
import { HIRE_CONTEXT_CATEGORIES, SelectedHireContext } from '@/types/hireContext';
import { Candidate, BehavioralTrait, CulturalValue } from '@/types/candidate';

interface ImportanceLevel {
  name: string;
  importance: 'required' | 'preferred' | 'bonus';
}

interface FilterState {
  searchTerm: string;
  location: string;
  industry: string;
  role: string;
  minExperience: string;
  technicalSkills: string[];
  softSkills: string[];
  behavioralTraits: ImportanceLevel[];
  culturalValues: ImportanceLevel[];
  hireContexts: SelectedHireContext[];
}

export default function TalentPool() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    industry: '',
    role: '',
    minExperience: '',
    technicalSkills: [],
    softSkills: [],
    behavioralTraits: [],
    culturalValues: [],
    hireContexts: [],
  });

  const [shortlists, setShortlists] = useState<Shortlist[]>([]);
  const [isShortlistModalOpen, setIsShortlistModalOpen] = useState(false);
  const [isHireContextModalOpen, setIsHireContextModalOpen] = useState(false);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
      // Search term filter
      if (
        filters.searchTerm &&
        !`${candidate.firstName} ${candidate.lastName} ${candidate.role} ${candidate.resumeSummary}`
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !candidate.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industry &&
        !candidate.industry.toLowerCase().includes(filters.industry.toLowerCase())
      ) {
        return false;
      }

      // Role filter
      if (
        filters.role &&
        !candidate.role.toLowerCase().includes(filters.role.toLowerCase())
      ) {
        return false;
      }

      // Experience filter
      if (
        filters.minExperience &&
        candidate.yearsOfExperience < parseInt(filters.minExperience)
      ) {
        return false;
      }

      // Technical skills filter
      if (
        filters.technicalSkills.length > 0 &&
        !filters.technicalSkills.every((skill) =>
          candidate.technicalSkills.some((s) => s.name === skill)
        )
      ) {
        return false;
      }

      // Soft skills filter
      if (
        filters.softSkills.length > 0 &&
        !filters.softSkills.every((skill) =>
          candidate.softSkills.some((s) => s.name === skill)
        )
      ) {
        return false;
      }

      // Behavioral traits filter
      if (filters.behavioralTraits.length > 0) {
        const requiredTraits = filters.behavioralTraits
          .filter((trait) => trait.importance === 'required')
          .map((trait) => trait.name);
        
        if (!requiredTraits.every((trait) => {
          const score = candidate.behavioralTraits.find(t => t.name === trait)?.score || 0;
          return score >= 4;
        })) {
          return false;
        }
      }

      // Cultural values filter
      if (filters.culturalValues.length > 0) {
        const requiredValues = filters.culturalValues
          .filter((value) => value.importance === 'required')
          .map((value) => value.name);
        
        if (!requiredValues.every((value) => 
          candidate.culturalValues.some(v => v.name === value && v.score >= 4)
        )) {
          return false;
        }
      }

      // Hire context filter
      if (filters.hireContexts.length > 0 && candidate.hireContextPreferences) {
        const requiredContexts = filters.hireContexts
          .filter(context => context.priority === 'required')
          .map(context => context.optionId);

        const preferredContexts = filters.hireContexts
          .filter(context => context.priority === 'preferred')
          .map(context => context.optionId);

        const bonusContexts = filters.hireContexts
          .filter(context => context.priority === 'bonus')
          .map(context => context.optionId);

        // Check required contexts
        if (requiredContexts.length > 0) {
          const hasRequiredContexts = requiredContexts.every(contextId =>
            candidate.hireContextPreferences.some(pref =>
              pref.preferredContexts.includes(contextId) && pref.experienceLevel >= 4
            )
          );
          if (!hasRequiredContexts) return false;
        }

        // Calculate match score for preferred and bonus contexts
        const matchScore = candidate.hireContextPreferences.reduce((score, pref) => {
          const preferredMatches = pref.preferredContexts.filter(id => preferredContexts.includes(id));
          const bonusMatches = pref.preferredContexts.filter(id => bonusContexts.includes(id));
          return score + (preferredMatches.length * 2) + bonusMatches.length;
        }, 0);

        // If there are preferred contexts, require at least one match
        if (preferredContexts.length > 0 && matchScore === 0) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleSearch = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleHireContextSave = useCallback((contexts: SelectedHireContext[]) => {
    setFilters(prev => ({ ...prev, hireContexts: contexts }));
  }, []);

  const handleCreateShortlist = (name: string) => {
    const newShortlist: Shortlist = {
      id: `sl-${Date.now()}`,
      name,
      candidateIds: [],
      hireContexts: filters.hireContexts,
    };
    setShortlists((prev) => [...prev, newShortlist]);
  };

  const handleRenameShortlist = (id: string, name: string) => {
    setShortlists((prev) =>
      prev.map((shortlist) =>
        shortlist.id === id ? { ...shortlist, name } : shortlist
      )
    );
  };

  const handleAddToShortlist = (shortlistId: string, candidateId: string) => {
    setShortlists((prev) =>
      prev.map((shortlist) =>
        shortlist.id === shortlistId
          ? {
              ...shortlist,
              candidateIds: [...shortlist.candidateIds, candidateId],
            }
          : shortlist
      )
    );
  };

  const handleRemoveFromShortlist = (shortlistId: string, candidateId: string) => {
    setShortlists((prev) =>
      prev.map((shortlist) =>
        shortlist.id === shortlistId
          ? {
              ...shortlist,
              candidateIds: shortlist.candidateIds.filter((id) => id !== candidateId),
            }
          : shortlist
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#714b67] mb-2">Talent Pool</h1>
            <p className="text-[#714b67]">
              Find and filter candidates based on skills, experience, and assessments
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsHireContextModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#714b67] rounded-lg hover:bg-[#714b67]/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Set Hiring Context
            </button>
            <button
              onClick={() => setIsShortlistModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#fbb130] rounded-lg hover:bg-[#fbb130]/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Manage Shortlists
            </button>
          </div>
        </div>

        {filters.hireContexts.length > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Hiring Context</h3>
            <div className="flex flex-wrap gap-2">
              {filters.hireContexts.map(context => {
                const option = HIRE_CONTEXT_CATEGORIES
                  .flatMap(cat => cat.options)
                  .find(opt => opt.id === context.optionId);
                
                if (!option) return null;

                return (
                  <div
                    key={context.optionId}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      context.priority === 'required'
                        ? 'bg-red-100 text-red-800'
                        : context.priority === 'preferred'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-[#f3f4f6]">
            <SearchFilters onSearch={handleSearch} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-[#f3f4f6]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#714b67]">
                  {filteredCandidates.length} Candidates Found
                </h2>
                {filters.hireContexts.length > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-[#1ad3bb] bg-opacity-10 text-[#714b67] rounded-full">
                    Hiring Context Applied
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    shortlists={shortlists}
                    onAddToShortlist={handleAddToShortlist}
                    onRemoveFromShortlist={handleRemoveFromShortlist}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShortlistModal
        isOpen={isShortlistModalOpen}
        onClose={() => setIsShortlistModalOpen(false)}
        shortlists={shortlists}
        onCreate={handleCreateShortlist}
        onRename={handleRenameShortlist}
      />

      <HireContextModal
        isOpen={isHireContextModalOpen}
        onClose={() => setIsHireContextModalOpen(false)}
        onSave={handleHireContextSave}
        initialContexts={filters.hireContexts}
      />
    </main>
  );
} 