import { Fragment, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ContextOption {
  id: string;
  label: string;
  description: string;
  selected: boolean;
}

interface ContextGroup {
  id: string;
  title: string;
  options: ContextOption[];
}

const contextGroups: ContextGroup[] = [
  {
    id: 'team-structure',
    title: 'Team & Structure',
    options: [
      { id: 'team-size', label: 'Team Size & Structure', description: 'Small agile team vs. large, structured teams', selected: false },
      { id: 'dept-structure', label: 'Department Structure & Reporting Lines', description: 'Flat organization vs. hierarchical teams', selected: false },
      { id: 'leadership-style', label: 'Leadership & Management Style', description: 'Hands-on mentorship vs. self-directed roles', selected: false },
      { id: 'collaboration-style', label: 'Collaboration Style', description: 'Independent contributor vs. cross-functional teamwork', selected: false },
    ],
  },
  {
    id: 'project-dynamics',
    title: 'Project & Work Dynamics',
    options: [
      { id: 'project-type', label: 'Project Type & Scope', description: 'Short-term contract, long-term development, experimental R&D', selected: false },
      { id: 'greenfield-legacy', label: 'Greenfield vs. Legacy Work', description: 'Building from scratch vs. maintaining/upgrading existing systems', selected: false },
      { id: 'work-pace', label: 'Pace of Work', description: 'Iterative, fail-fast approach vs. careful, methodical execution', selected: false },
      { id: 'ambiguity', label: 'Degree of Ambiguity', description: 'High uncertainty, evolving responsibilities vs. well-defined tasks', selected: false },
      { id: 'communication', label: 'Communication Style', description: 'Async-heavy, documented approach vs. frequent live discussions', selected: false },
    ],
  },
  {
    id: 'company-culture',
    title: 'Company Culture & Growth',
    options: [
      { id: 'company-culture', label: 'Company Culture & Work Dynamics', description: 'Fast-paced startup vs. structured enterprise', selected: false },
      { id: 'decision-making', label: 'Decision-Making Style', description: 'Autonomy-driven vs. process-heavy, consensus-driven', selected: false },
      { id: 'growth-stage', label: 'Growth Stage of the Company', description: 'Early-stage startup, scale-up, enterprise', selected: false },
      { id: 'innovation', label: 'Innovation vs. Stability', description: 'High innovation, experimental roles vs. maintaining reliable systems', selected: false },
    ],
  },
  {
    id: 'technical-customer',
    title: 'Technical & Customer Factors',
    options: [
      { id: 'tech-stack', label: 'Technical Stack & Flexibility', description: 'Fixed tech stack vs. evolving technology choices', selected: false },
      { id: 'customer-interaction', label: 'Level of Customer Interaction', description: 'Internal-facing vs. client-facing roles', selected: false },
      { id: 'compliance', label: 'Compliance & Industry Regulations', description: 'Regulated industries like fintech, healthcare vs. more flexible environments', selected: false },
      { id: 'dependencies', label: 'Cross-Functional Dependencies', description: 'Working within a specialized team vs. cross-department collaboration', selected: false },
    ],
  },
  {
    id: 'development-career',
    title: 'Development & Career',
    options: [
      { id: 'onboarding', label: 'Onboarding & Training Expectations', description: 'Structured onboarding vs. learn-on-the-go', selected: false },
      { id: 'career-growth', label: 'Long-Term Career Growth Potential', description: 'Clear career path vs. dynamic role evolution', selected: false },
    ],
  },
];

export interface SelectedHireContext {
  optionId: string;
  priority: 'required' | 'preferred' | 'bonus';
}

interface HireContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contexts: SelectedHireContext[]) => void;
  initialContexts?: SelectedHireContext[];
}

export const HireContextModal: React.FC<HireContextModalProps> = ({ isOpen, onClose, onSave, initialContexts = [] }) => {
  const [selectedContexts, setSelectedContexts] = useState<SelectedHireContext[]>(initialContexts);
  const [customContext, setCustomContext] = useState('');

  const handleContextToggle = (optionId: string) => {
    setSelectedContexts(prev => {
      const exists = prev.find(ctx => ctx.optionId === optionId);
      if (exists) {
        return prev.filter(ctx => ctx.optionId !== optionId);
      }
      return [...prev, { optionId, priority: 'required' }];
    });
  };

  const handlePriorityChange = (optionId: string, priority: 'required' | 'preferred' | 'bonus') => {
    setSelectedContexts(prev =>
      prev.map(ctx =>
        ctx.optionId === optionId ? { ...ctx, priority } : ctx
      )
    );
  };

  const handleSave = () => {
    onSave(selectedContexts);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#FAF6F8] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                {/* Header */}
                <div className="bg-white px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                      Set Hiring Context
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {contextGroups.map((group) => (
                      <Disclosure key={group.id} defaultOpen={true}>
                        {({ open }) => (
                          <div className="rounded-lg bg-white shadow-sm border border-gray-100">
                            <Disclosure.Button className="flex w-full justify-between rounded-t-lg bg-gradient-to-r from-[#880E4F] to-[#560932] px-4 py-3 text-left text-sm font-medium text-white hover:from-[#6D0B3F] hover:to-[#45072A] focus:outline-none focus-visible:ring focus-visible:ring-[#880E4F] focus-visible:ring-opacity-75 transition-all duration-200">
                              <span>{group.title}</span>
                              <ChevronUpIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-white transition-transform duration-200`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 py-3">
                              <div className="space-y-3">
                                {group.options.map((option) => {
                                  const context = selectedContexts.find(ctx => ctx.optionId === option.id);
                                  const isSelected = Boolean(context);

                                  return (
                                    <div
                                      key={option.id}
                                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F3E6ED] transition-colors group"
                                    >
                                      <div className="flex items-center h-5">
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => handleContextToggle(option.id)}
                                          className="h-4 w-4 rounded border-gray-300 text-[#880E4F] focus:ring-[#880E4F] transition-colors"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-medium text-gray-900 group-hover:text-[#880E4F] transition-colors">
                                            {option.label}
                                          </span>
                                          {isSelected && (
                                            <select
                                              value={context?.priority || 'required'}
                                              onChange={(e) => handlePriorityChange(option.id, e.target.value as 'required' | 'preferred' | 'bonus')}
                                              className="ml-4 text-sm border-gray-200 rounded-md focus:ring-[#880E4F] focus:border-[#880E4F] bg-white transition-colors"
                                            >
                                              <option value="required">Required</option>
                                              <option value="preferred">Preferred</option>
                                              <option value="bonus">Bonus</option>
                                            </select>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                          {option.description}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ))}

                    {/* Custom Context Section */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                      <label htmlFor="custom-context" className="block text-sm font-medium text-gray-900 mb-2">
                        Custom Context
                      </label>
                      <textarea
                        id="custom-context"
                        rows={4}
                        className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-[#880E4F] focus:ring-[#880E4F] text-sm transition-colors resize-none"
                        placeholder="Add any additional context or specific requirements using keywords and phrases..."
                        value={customContext}
                        onChange={(e) => setCustomContext(e.target.value)}
                      />
                    </div>

                    <p className="text-xs text-gray-500 italic">
                      These nuances help ensure recruiters can match candidates not just on skills but on the working environment, expectations, and cultural alignment.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-white px-6 py-4 border-t border-gray-100">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#880E4F] transition-colors"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#880E4F] to-[#560932] rounded-lg hover:from-[#6D0B3F] hover:to-[#45072A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#880E4F] transition-all"
                      onClick={handleSave}
                    >
                      Apply Context
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}; 