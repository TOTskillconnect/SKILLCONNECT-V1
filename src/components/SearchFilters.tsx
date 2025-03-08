import { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { SkillSelect } from './SkillSelect';
import { SelectedHireContext } from '@/types/hireContext';

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

interface SearchFiltersProps {
  onSearch: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const commonRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
];

const industries = [
  'Technology',
  'Software',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Consulting',
];

const behavioralTraits = [
  'Communication',
  'Collaboration',
  'Leadership',
  'Adaptability',
  'Decision Making',
  'Problem Solving',
  'Team Dynamics'
];

const culturalValues = [
  'Innovation First',
  'Customer Obsession',
  'Ownership Mindset',
  'Learn & Be Curious',
  'Think Big',
  'Bias for Action',
  'Earn Trust',
  'Dive Deep',
  'Have Backbone',
  'Deliver Results',
  'Embrace Change',
  'Inclusive Mindset',
  'Sustainability',
  'Work-Life Balance',
  'Continuous Learning',
  'Transparency',
  'Data-Driven',
  'Quality Focus',
  'Collaborative Spirit'
];

const technicalSkills = [
  'React',
  'TypeScript',
  'Python',
  'Node.js',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'SQL',
  'Java',
];

const softSkills = [
  'Communication',
  'Leadership',
  'Problem Solving',
  'Team Work',
  'Adaptability',
  'Time Management',
  'Critical Thinking',
  'Emotional Intelligence',
];

export const SearchFilters = ({ 
  onSearch,
  initialFilters
}: SearchFiltersProps): JSX.Element => {
  const defaultFilters: FilterState = {
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
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters || defaultFilters);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
      setSelectedTraits(initialFilters.behavioralTraits?.map(trait => trait.name) || []);
      setSelectedValues(initialFilters.culturalValues?.map(value => value.name) || []);
    }
  }, [initialFilters]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSkillsChange = (
    skills: string[],
    type: 'technicalSkills' | 'softSkills'
  ) => {
    const newFilters = {
      ...filters,
      [type]: skills,
    };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSliderChange = (name: string, value: number) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleBehavioralTraitSelect = (traits: string[]) => {
    setSelectedTraits(traits);
    const newTraits = traits.map(trait => ({
      name: trait,
      importance: filters.behavioralTraits?.find(bt => bt.name === trait)?.importance || 'preferred'
    }));
    const newFilters = { ...filters, behavioralTraits: newTraits };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleCulturalValueSelect = (values: string[]) => {
    setSelectedValues(values);
    const newValues = values.map(value => ({
      name: value,
      importance: filters.culturalValues?.find(cv => cv.name === value)?.importance || 'preferred'
    }));
    const newFilters = { ...filters, culturalValues: newValues };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleTraitImportanceChange = (traitName: string, importance: 'required' | 'preferred' | 'bonus') => {
    const newTraits = filters.behavioralTraits.map(trait =>
      trait.name === traitName ? { ...trait, importance } : trait
    );
    const newFilters = { ...filters, behavioralTraits: newTraits };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleValueImportanceChange = (valueName: string, importance: 'required' | 'preferred' | 'bonus') => {
    const newValues = filters.culturalValues.map(value =>
      value.name === valueName ? { ...value, importance } : value
    );
    const newFilters = { ...filters, culturalValues: newValues };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="space-y-6">
        {/* Basic Filters Section */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-[#714b67] mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              placeholder="Search candidates..."
              className="w-full px-4 py-2.5 bg-white border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67] transition-all duration-200"
            />
          </div>

          {/* Location Filter */}
          <div className="w-full">
            <label className="block text-sm font-medium text-[#714b67] mb-2">
              Location
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Filter by location..."
              className="w-full px-4 py-2.5 border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67] transition-all duration-200"
            />
          </div>

          {/* Industry Filter */}
          <div className="w-full">
            <label className="block text-sm font-medium text-[#714b67] mb-2">
              Industry
            </label>
            <div className="relative">
              <select
                value={filters.industry}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, industry: e.target.value }))
                }
                className="w-full appearance-none px-4 py-2.5 border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67] bg-white transition-all duration-200 pr-10"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Role Filter */}
          <div className="w-full">
            <label className="block text-sm font-medium text-[#714b67] mb-2">
              Role
            </label>
            <div className="relative">
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full appearance-none px-4 py-2.5 border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67] bg-white transition-all duration-200 pr-10"
              >
                <option value="">All Roles</option>
                {commonRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Experience Filter */}
          <div className="w-full">
            <label className="block text-sm font-medium text-[#714b67] mb-2">
              Minimum Experience
            </label>
            <div className="relative">
              <select
                value={filters.minExperience}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minExperience: e.target.value }))
                }
                className="w-full appearance-none px-4 py-2.5 border border-[#f3f4f6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714b67] bg-white transition-all duration-200 pr-10"
              >
                <option value="">Any Experience</option>
                {[1, 2, 3, 5, 7, 10].map((years) => (
                  <option key={years} value={years}>
                    {years}+ years
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#f3f4f6]" />

        {/* Technical Skills */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-[#714b67] mb-2">
            Technical Skills
          </label>
          <SkillSelect
            options={technicalSkills}
            selectedSkills={filters.technicalSkills}
            onChange={(skills) => handleSkillsChange(skills, 'technicalSkills')}
            placeholder="Select technical skills..."
          />
        </div>

        {/* Soft Skills */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-[#714b67] mb-2">
            Soft Skills
          </label>
          <SkillSelect
            options={softSkills}
            selectedSkills={filters.softSkills}
            onChange={(skills) => handleSkillsChange(skills, 'softSkills')}
            placeholder="Select soft skills..."
          />
        </div>

        {/* Behavioral Traits */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-[#714b67] mb-2">
            Behavioral Traits
          </label>
          <div className="space-y-4">
            <SkillSelect
              options={behavioralTraits}
              selectedSkills={selectedTraits}
              onChange={handleBehavioralTraitSelect}
              placeholder="Select behavioral traits..."
            />
            {filters.behavioralTraits.map((trait) => (
              <div key={trait.name} className="flex items-center gap-4 p-2 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm text-[#714b67]">{trait.name}</span>
                <select
                  value={trait.importance}
                  onChange={(e) =>
                    handleTraitImportanceChange(
                      trait.name,
                      e.target.value as 'required' | 'preferred' | 'bonus'
                    )
                  }
                  className="text-sm border border-[#f3f4f6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#714b67] bg-white transition-all duration-200"
                >
                  <option value="required">Required</option>
                  <option value="preferred">Preferred</option>
                  <option value="bonus">Bonus</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Values */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-[#714b67] mb-2">
            Cultural Values
          </label>
          <div className="space-y-4">
            <SkillSelect
              options={culturalValues}
              selectedSkills={selectedValues}
              onChange={handleCulturalValueSelect}
              placeholder="Select cultural values..."
            />
            {filters.culturalValues.map((value) => (
              <div key={value.name} className="flex items-center gap-4 p-2 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm text-[#714b67]">{value.name}</span>
                <select
                  value={value.importance}
                  onChange={(e) =>
                    handleValueImportanceChange(
                      value.name,
                      e.target.value as 'required' | 'preferred' | 'bonus'
                    )
                  }
                  className="text-sm border border-[#f3f4f6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#714b67] bg-white transition-all duration-200"
                >
                  <option value="required">Required</option>
                  <option value="preferred">Preferred</option>
                  <option value="bonus">Bonus</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 