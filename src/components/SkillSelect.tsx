import { useState, useRef, useEffect } from 'react';
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline';

interface SkillSelectProps {
  label?: string;
  placeholder?: string;
  options: string[];
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillSelect: React.FC<SkillSelectProps> = ({
  label,
  placeholder = 'Type to search skills...',
  options,
  selectedSkills,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue) {
      const filtered = options
        .filter(option => 
          option.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedSkills.includes(option)
        );
      setFilteredOptions(filtered);
      setIsOpen(true);
    } else {
      setFilteredOptions([]);
      setIsOpen(false);
    }
  }, [inputValue, options, selectedSkills]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectOption = (option: string) => {
    onChange([...selectedSkills, option]);
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputValue && selectedSkills.length > 0) {
      handleRemoveSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-[#714b67]">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="min-h-[42px] p-1.5 bg-white border border-[#f3f4f6] rounded-lg focus-within:ring-2 focus-within:ring-[#714b67] focus-within:border-[#714b67] flex flex-wrap gap-1.5 items-center transition-all duration-200">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-1 bg-[#f3f4f6] text-[#714b67] rounded text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-gray-500 hover:text-[#714b67] transition-colors"
              >
                <XIcon className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[120px] bg-white outline-none text-sm text-[#714b67] placeholder-gray-400"
            placeholder={selectedSkills.length === 0 ? placeholder : ''}
          />
        </div>
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#f3f4f6] rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                className="w-full px-4 py-2 text-left text-sm text-[#714b67] hover:bg-[#f3f4f6] focus:bg-[#f3f4f6] focus:outline-none transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 