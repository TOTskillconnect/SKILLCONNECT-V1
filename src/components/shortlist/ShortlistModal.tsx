import { useState } from 'react';
import { Candidate } from '@/types/candidate';
import { SelectedHireContext } from '@/types/hireContext';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ShortlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortlists: Shortlist[];
  candidates: Candidate[];
  onCreateShortlist: (name: string) => void;
  onRenameShortlist: (id: string, name: string) => void;
  onRemoveFromShortlist: (shortlistId: string, candidateId: string) => void;
}

export interface Shortlist {
  id: string;
  name: string;
  candidateIds: string[];
  hireContexts?: SelectedHireContext[];
}

export const ShortlistModal: React.FC<ShortlistModalProps> = ({
  isOpen,
  onClose,
  shortlists,
  candidates,
  onCreateShortlist,
  onRenameShortlist,
  onRemoveFromShortlist,
}) => {
  const [newShortlistName, setNewShortlistName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [expandedShortlist, setExpandedShortlist] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateShortlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShortlistName.trim()) {
      onCreateShortlist(newShortlistName.trim());
      setNewShortlistName('');
    }
  };

  const handleStartRename = (shortlist: Shortlist) => {
    setEditingId(shortlist.id);
    setEditingName(shortlist.name);
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && editingName.trim()) {
      onRenameShortlist(editingId, editingName.trim());
      setEditingId(null);
      setEditingName('');
    }
  };

  const toggleShortlist = (shortlistId: string) => {
    setExpandedShortlist(expandedShortlist === shortlistId ? null : shortlistId);
  };

  const getCandidatesInShortlist = (shortlistId: string) => {
    const shortlist = shortlists.find(s => s.id === shortlistId);
    if (!shortlist) return [];
    return candidates.filter(c => shortlist.candidateIds.includes(c.id));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Manage Shortlists
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateShortlist} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New shortlist name..."
                  value={newShortlistName}
                  onChange={(e) => setNewShortlistName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#880E4F] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Create
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {shortlists.map((shortlist) => (
                <div
                  key={shortlist.id}
                  className="p-4 bg-white rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{shortlist.name}</h4>
                      <p className="text-sm text-gray-500">
                        {shortlist.candidateIds.length} candidates
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartRename(shortlist)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleShortlist(shortlist.id)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <svg className={`w-5 h-5 transition-transform ${expandedShortlist === shortlist.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Candidates List */}
                  {expandedShortlist === shortlist.id && (
                    <div className="border-t divide-y">
                      {getCandidatesInShortlist(shortlist.id).map((candidate) => (
                        <div
                          key={candidate.id}
                          className="p-4 bg-white flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {candidate.firstName} {candidate.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {candidate.role} • {candidate.location}
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveFromShortlist(shortlist.id, candidate.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove from shortlist"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {shortlist.candidateIds.length === 0 && (
                        <div className="p-4 text-center text-gray-500 text-sm bg-white">
                          No candidates in this shortlist
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 