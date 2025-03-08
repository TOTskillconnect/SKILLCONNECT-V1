import { useState } from 'react';
import { AssessmentTemplate } from '@/types/assessment';
import { Shortlist } from '@/components/shortlist/ShortlistModal';
import { AssignCandidatesModal } from './AssignCandidatesModal';
import { mockCandidates } from '@/data/mockCandidates';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: AssessmentTemplate;
  onAssign: (data: AssignmentData) => void;
  shortlists?: Shortlist[];
}

export interface AssignmentData {
  templateId: string;
  candidateIds: string[];
  dueDate: string;
  instructions: string;
  notifyImmediately: boolean;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  isOpen,
  onClose,
  template,
  onAssign,
  shortlists = []
}) => {
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notifyImmediately, setNotifyImmediately] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign({
      templateId: template.id,
      candidateIds: selectedCandidateIds,
      dueDate,
      instructions,
      notifyImmediately,
    });
    onClose();
  };

  // Calculate minimum date (today) and maximum date (30 days from now)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Assign Assessment</h2>
              <p className="text-sm text-gray-500 mt-1">{template.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">Duration:</span>
              <span>{template.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Type:</span>
              <span>{template.type}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Candidate Selection */}
          <AssignCandidatesModal
            candidates={mockCandidates}
            shortlists={shortlists}
            onSelect={setSelectedCandidateIds}
          />

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              max={maxDateStr}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add any specific instructions or notes for the candidates..."
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
            />
          </div>

          {/* Notification Option */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notify"
              checked={notifyImmediately}
              onChange={(e) => setNotifyImmediately(e.target.checked)}
              className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <label htmlFor="notify" className="text-sm text-gray-700">
              Notify candidates immediately
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedCandidateIds.length === 0 || !dueDate}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 