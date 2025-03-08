export interface HireContextOption {
  id: string;
  label: string;
  description: string;
}

export interface HireContextCategory {
  id: string;
  title: string;
  options: HireContextOption[];
}

export type Priority = 'required' | 'preferred' | 'bonus';

export interface SelectedHireContext {
  optionId: string;
  priority: Priority;
}

export const HIRE_CONTEXT_CATEGORIES: HireContextCategory[] = [
  {
    id: 'team-structure',
    title: 'Team & Structure',
    options: [
      { id: 'team-size', label: 'Team Size & Structure', description: 'Small agile team vs. large, structured teams' },
      { id: 'dept-structure', label: 'Department Structure & Reporting Lines', description: 'Flat organization vs. hierarchical teams' },
      { id: 'leadership-style', label: 'Leadership & Management Style', description: 'Hands-on mentorship vs. self-directed roles' },
      { id: 'collaboration-style', label: 'Collaboration Style', description: 'Independent contributor vs. cross-functional teamwork' },
    ],
  },
  {
    id: 'project-dynamics',
    title: 'Project & Work Dynamics',
    options: [
      { id: 'project-type', label: 'Project Type & Scope', description: 'Short-term contract, long-term development, experimental R&D' },
      { id: 'greenfield-legacy', label: 'Greenfield vs. Legacy Work', description: 'Building from scratch vs. maintaining/upgrading existing systems' },
      { id: 'work-pace', label: 'Pace of Work', description: 'Iterative, fail-fast approach vs. careful, methodical execution' },
      { id: 'ambiguity', label: 'Degree of Ambiguity', description: 'High uncertainty, evolving responsibilities vs. well-defined tasks' },
      { id: 'communication', label: 'Communication Style', description: 'Async-heavy, documented approach vs. frequent live discussions' },
    ],
  },
  {
    id: 'company-culture',
    title: 'Company Culture & Growth',
    options: [
      { id: 'company-culture', label: 'Company Culture & Work Dynamics', description: 'Fast-paced startup vs. structured enterprise' },
      { id: 'decision-making', label: 'Decision-Making Style', description: 'Autonomy-driven vs. process-heavy, consensus-driven' },
      { id: 'growth-stage', label: 'Growth Stage of the Company', description: 'Early-stage startup, scale-up, enterprise' },
      { id: 'innovation', label: 'Innovation vs. Stability', description: 'High innovation, experimental roles vs. maintaining reliable systems' },
    ],
  },
  {
    id: 'technical-customer',
    title: 'Technical & Customer Factors',
    options: [
      { id: 'tech-stack', label: 'Technical Stack & Flexibility', description: 'Fixed tech stack vs. evolving technology choices' },
      { id: 'customer-interaction', label: 'Level of Customer Interaction', description: 'Internal-facing vs. client-facing roles' },
      { id: 'compliance', label: 'Compliance & Industry Regulations', description: 'Regulated industries like fintech, healthcare vs. more flexible environments' },
      { id: 'dependencies', label: 'Cross-Functional Dependencies', description: 'Working within a specialized team vs. cross-department collaboration' },
    ],
  },
  {
    id: 'development-career',
    title: 'Development & Career',
    options: [
      { id: 'onboarding', label: 'Onboarding & Training Expectations', description: 'Structured onboarding vs. learn-on-the-go' },
      { id: 'career-growth', label: 'Long-Term Career Growth Potential', description: 'Clear career path vs. dynamic role evolution' },
    ],
  },
]; 