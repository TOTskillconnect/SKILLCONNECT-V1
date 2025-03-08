import { useState, useRef, useEffect } from 'react';
import { Shortlist } from './ShortlistModal';

interface ShortlistButtonProps {
  candidateId: string;
  shortlists: Shortlist[];
  onAddToShortlist: (shortlistId: string, candidateId: string) => void;
  onRemoveFromShortlist: (shortlistId: string, candidateId: string) => void;
}

export const ShortlistButton: React.FC<ShortlistButtonProps> = ({
  candidateId,
  shortlists,
  onAddToShortlist,
  onRemoveFromShortlist,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleShortlist = (shortlistId: string) => {
    const shortlist = shortlists.find(s => s.id === shortlistId);
    if (shortlist) {
      if (shortlist.candidateIds.includes(candidateId)) {
        onRemoveFromShortlist(shortlistId, candidateId);
      } else {
        onAddToShortlist(shortlistId, candidateId);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2">Add to Shortlist</div>
            {shortlists.length === 0 ? (
              <div className="text-sm text-gray-500 py-2">No shortlists available</div>
            ) : (
              <div className="space-y-1">
                {shortlists.map((shortlist) => (
                  <button
                    key={shortlist.id}
                    onClick={() => handleToggleShortlist(shortlist.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={shortlist.candidateIds.includes(candidateId)}
                      readOnly
                      className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <span>{shortlist.name}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {shortlist.candidateIds.length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 