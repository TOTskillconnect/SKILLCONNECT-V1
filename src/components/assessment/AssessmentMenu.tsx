import { useState } from 'react';
import { AssessmentTemplate, AssessmentType } from '@/types/assessment';
import { AssignmentModal, AssignmentData } from './AssignmentModal';
import { ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface AssessmentMenuProps {
  templates: AssessmentTemplate[];
  onAssign: (data: AssignmentData) => void;
  selectedRole?: string;
}

const assessmentTypeLabels: Record<AssessmentType, string> = {
  technical: 'Technical Assessment',
  roleplay: 'Role-Play Scenario',
  sjt: 'Situational Judgment',
  personality: 'Personality Assessment',
  collaboration: 'Collaboration Exercise'
};

const assessmentTypeDescriptions: Record<AssessmentType, string> = {
  technical: 'Evaluate technical skills and problem-solving abilities',
  roleplay: 'Assess communication and stakeholder management skills',
  sjt: 'Test decision-making in real-world scenarios',
  personality: 'Understand work style and cultural fit',
  collaboration: 'Evaluate teamwork and pair programming capabilities'
};

export const AssessmentMenu: React.FC<AssessmentMenuProps> = ({
  templates,
  onAssign,
  selectedRole
}) => {
  const [selectedType, setSelectedType] = useState<AssessmentType | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<AssessmentTemplate | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesType = !selectedType || template.type === selectedType;
    const matchesSearch = !searchQuery || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !selectedRole || template.targetRole.includes(selectedRole);
    return matchesType && matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Assessment Library</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
          <div className="flex items-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AssessmentType)}
              className="px-4 py-2 border border-[#f3f4f6] rounded-lg focus:ring-2 focus:ring-[#714b67]/20 focus:border-[#714b67] bg-white text-[#714b67]"
            >
              <option value="">All Types</option>
              {Object.entries(assessmentTypeLabels).map(([type, label]) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group block transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#714b67]/20 rounded-xl cursor-pointer"
          >
            <div className="p-6 bg-white border border-[#f3f4f6] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1 group-hover:translate-x-1 transition-transform">
                  <h3 className="text-lg font-semibold text-[#714b67] mb-1">
                    {template.title}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#1ad3bb]/10 text-[#1ad3bb]">
                    {assessmentTypeLabels[template.type]}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1ad3bb] rounded-lg hover:bg-[#1ad3bb]/90 transition-colors shadow-sm hover:shadow-md"
                >
                  Assign
                </button>
              </div>

              <div className="h-px bg-[#f3f4f6] my-4" />

              <p className="text-sm text-[#714b67]/80 mb-4">
                {template.description}
              </p>

              <div className="h-px bg-[#f3f4f6] my-4" />

              <div className="flex items-center gap-4 text-sm text-[#714b67]/70">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {template.duration} minutes
                </div>
                <div className="flex items-center gap-1">
                  <DocumentTextIcon className="w-4 h-4" />
                  {template.questionCount} questions
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <AssignmentModal
          isOpen={true}
          onClose={() => setSelectedTemplate(null)}
          template={selectedTemplate}
          onAssign={onAssign}
        />
      )}
    </div>
  );
}; 