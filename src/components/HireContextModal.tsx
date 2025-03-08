import React, { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { HIRE_CONTEXT_CATEGORIES, SelectedHireContext, Priority } from '@/types/hireContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface HireContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contexts: SelectedHireContext[]) => void;
  initialContexts?: SelectedHireContext[];
}

export function HireContextModal({ isOpen, onClose, onSave, initialContexts = [] }: HireContextModalProps) {
  const [selectedContexts, setSelectedContexts] = useState<SelectedHireContext[]>(initialContexts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    return HIRE_CONTEXT_CATEGORIES.map(category => ({
      ...category,
      options: category.options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.options.length > 0);
  }, [searchTerm]);

  const handleContextToggle = (optionId: string) => {
    setSelectedContexts(prev => {
      const exists = prev.find(ctx => ctx.optionId === optionId);
      if (exists) {
        return prev.filter(ctx => ctx.optionId !== optionId);
      }
      return [...prev, { optionId, priority: 'required' }];
    });
  };

  const handlePriorityChange = (optionId: string, priority: Priority) => {
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Set Hiring Context
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search contexts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {category.label}
                  </h3>
                  <div className="space-y-3">
                    {category.options.map((option) => {
                      const isSelected = selectedContexts.some(
                        (ctx) => ctx.optionId === option.id
                      );
                      const context = selectedContexts.find(
                        (ctx) => ctx.optionId === option.id
                      );

                      return (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#880E4F] text-white'
                              : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => handleContextToggle(option.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-primary-text">
                                {option.label}
                              </h4>
                              <p className="mt-1 text-sm text-secondary-text">
                                {option.description}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="ml-4">
                                <select
                                  value={context.priority}
                                  onChange={(e) =>
                                    handlePriorityChange(option.id, e.target.value as Priority)
                                  }
                                  className="text-sm border-form-border rounded-md focus:ring-accent focus:border-accent bg-white"
                                >
                                  <option value="required">Required</option>
                                  <option value="preferred">Preferred</option>
                                  <option value="bonus">Bonus</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-secondary-text bg-white rounded-lg hover:text-primary-text"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-[#880E4F] rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Context
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 