import { useState, useEffect } from 'react';
import { Candidate } from '@/types/candidate';
import { Shortlist } from '@/components/shortlist/ShortlistModal';
import { MagnifyingGlassIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AssignCandidatesModalProps {
  candidates: Candidate[];
  shortlists: Shortlist[];
  onSelect: (selectedCandidateIds: string[]) => void;
  preSelectedCandidateIds?: string[];
}

interface SelectedCandidateGroup {
  source: 'individual' | string; // 'individual' or shortlist name
  candidateIds: string[];
}

export function AssignCandidatesModal({
  candidates,
  shortlists,
  onSelect,
  preSelectedCandidateIds = []
}: AssignCandidatesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<SelectedCandidateGroup[]>([]);
  const [selectedShortlists, setSelectedShortlists] = useState<string[]>([]);

  // Initialize with pre-selected candidates if any
  useEffect(() => {
    if (preSelectedCandidateIds.length > 0) {
      setSelectedGroups([{
        source: 'individual',
        candidateIds: preSelectedCandidateIds
      }]);
    }
  }, [preSelectedCandidateIds]);

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate => {
    const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) ||
           candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get all selected candidate IDs (removing duplicates)
  const allSelectedCandidateIds = Array.from(new Set(
    selectedGroups.flatMap(group => group.candidateIds)
  ));

  // Handle individual candidate selection
  const handleCandidateSelect = (candidateId: string) => {
    const individualGroup = selectedGroups.find(g => g.source === 'individual');
    
    if (individualGroup) {
      // Toggle selection in existing individual group
      const newCandidateIds = individualGroup.candidateIds.includes(candidateId)
        ? individualGroup.candidateIds.filter(id => id !== candidateId)
        : [...individualGroup.candidateIds, candidateId];

      setSelectedGroups(groups => groups.map(g =>
        g.source === 'individual'
          ? { ...g, candidateIds: newCandidateIds }
          : g
      ));
    } else {
      // Create new individual group
      setSelectedGroups(groups => [...groups, {
        source: 'individual',
        candidateIds: [candidateId]
      }]);
    }
  };

  // Handle shortlist selection
  const handleShortlistSelect = (shortlistId: string) => {
    const shortlist = shortlists.find(s => s.id === shortlistId);
    if (!shortlist) return;

    if (selectedShortlists.includes(shortlistId)) {
      // Remove shortlist
      setSelectedShortlists(prev => prev.filter(id => id !== shortlistId));
      setSelectedGroups(prev => prev.filter(g => g.source !== shortlist.name));
    } else {
      // Add shortlist
      setSelectedShortlists(prev => [...prev, shortlistId]);
      setSelectedGroups(prev => [...prev, {
        source: shortlist.name,
        candidateIds: shortlist.candidateIds
      }]);
    }
  };

  // Handle removing individual candidate
  const handleRemoveCandidate = (candidateId: string, source: string) => {
    setSelectedGroups(groups => groups.map(group => {
      if (group.source === source) {
        return {
          ...group,
          candidateIds: group.candidateIds.filter(id => id !== candidateId)
        };
      }
      return group;
    }).filter(group => group.candidateIds.length > 0));

    // If removing from a shortlist, update selectedShortlists
    if (source !== 'individual') {
      const shortlist = shortlists.find(s => s.name === source);
      if (shortlist) {
        setSelectedShortlists(prev => prev.filter(id => id !== shortlist.id));
      }
    }
  };

  // Update parent component with selected candidates
  useEffect(() => {
    onSelect(allSelectedCandidateIds);
  }, [allSelectedCandidateIds, onSelect]);

  return (
    <div className="flex gap-6">
      {/* Left side: Selection area */}
      <div className="flex-1 space-y-6">
        {/* Individual candidates section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Candidates</h3>
          
          {/* Search input */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          {/* Candidates list */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredCandidates.map((candidate) => (
              <label
                key={candidate.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={allSelectedCandidateIds.includes(candidate.id)}
                  onChange={() => handleCandidateSelect(candidate.id)}
                  className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {candidate.firstName} {candidate.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{candidate.role}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Shortlists section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select from Shortlists</h3>
          <div className="space-y-2">
            {shortlists.map((shortlist) => (
              <label
                key={shortlist.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedShortlists.includes(shortlist.id)}
                  onChange={() => handleShortlistSelect(shortlist.id)}
                  className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <div>
                  <div className="font-medium text-gray-900">{shortlist.name}</div>
                  <div className="text-sm text-gray-500">
                    {shortlist.candidateIds.length} candidates
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Summary panel */}
      <div className="w-80 bg-gray-50 rounded-lg p-4 border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Selected Candidates</h3>
          <span className="text-sm text-gray-500">
            {allSelectedCandidateIds.length} total
          </span>
        </div>

        {selectedGroups.map((group) => (
          <div key={group.source} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <UserGroupIcon className="w-4 h-4" />
              {group.source === 'individual' ? 'Individual Selection' : group.source}
              <span className="text-gray-500">({group.candidateIds.length})</span>
            </div>
            <div className="space-y-1">
              {group.candidateIds.map((candidateId) => {
                const candidate = candidates.find(c => c.id === candidateId);
                if (!candidate) return null;

                return (
                  <div
                    key={candidateId}
                    className="flex items-center justify-between py-1 px-2 text-sm bg-white rounded border"
                  >
                    <span className="text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </span>
                    <button
                      onClick={() => handleRemoveCandidate(candidateId, group.source)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {allSelectedCandidateIds.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No candidates selected
          </div>
        )}

        {/* Duplicate warning */}
        {selectedGroups.length > 1 && (
          <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
            Note: Duplicate candidates are automatically removed from the final selection.
          </div>
        )}
      </div>
    </div>
  );
} 