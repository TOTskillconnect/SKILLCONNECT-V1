import { Candidate } from '@/types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Full Stack Developer',
    industry: 'Technology',
    yearsOfExperience: 5,
    resumeSummary: 'Experienced full-stack developer with a focus on React and Node.js',
    technicalSkills: [
      { name: 'React', score: 4.5 },
      { name: 'TypeScript', score: 4.2 },
      { name: 'Node.js', score: 4.0 },
    ],
    softSkills: [
      { name: 'Communication', score: 4.0 },
      { name: 'Problem Solving', score: 4.5 },
    ],
    behavioralTraits: [
      { name: 'Leadership', score: 4.2 },
      { name: 'Collaboration', score: 4.5 },
      { name: 'Problem Solving', score: 4.8 },
    ],
    culturalValues: [
      { name: 'Innovation First', score: 4.5 },
      { name: 'Customer Obsession', score: 4.2 },
      { name: 'Learn & Be Curious', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote', 'hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'shortlisted'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Seattle, WA',
    role: 'Frontend Developer',
    industry: 'E-commerce',
    yearsOfExperience: 3,
    resumeSummary: 'Frontend specialist with expertise in modern JavaScript frameworks and UI/UX design',
    technicalSkills: [
      { name: 'Vue.js', score: 4.8 },
      { name: 'JavaScript', score: 4.5 },
      { name: 'CSS', score: 4.3 },
    ],
    softSkills: [
      { name: 'Creativity', score: 4.7 },
      { name: 'Teamwork', score: 4.2 },
    ],
    behavioralTraits: [
      { name: 'Attention to Detail', score: 4.6 },
      { name: 'Initiative', score: 4.3 },
      { name: 'Adaptability', score: 4.4 },
    ],
    culturalValues: [
      { name: 'User Focus', score: 4.8 },
      { name: 'Continuous Learning', score: 4.5 },
      { name: 'Quality First', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['onsite', 'hybrid'],
        experienceLevel: 3,
      },
    ],
    stage: 'interview'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    email: 'michael.r@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    role: 'Backend Developer',
    industry: 'FinTech',
    yearsOfExperience: 7,
    resumeSummary: 'Seasoned backend developer specializing in scalable microservices and cloud architecture',
    technicalSkills: [
      { name: 'Java', score: 4.9 },
      { name: 'Spring Boot', score: 4.7 },
      { name: 'AWS', score: 4.4 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.8 },
      { name: 'Leadership', score: 4.3 },
    ],
    behavioralTraits: [
      { name: 'Analytical Thinking', score: 4.9 },
      { name: 'Decision Making', score: 4.6 },
      { name: 'Mentorship', score: 4.4 },
    ],
    culturalValues: [
      { name: 'Technical Excellence', score: 4.9 },
      { name: 'Innovation', score: 4.4 },
      { name: 'Team Growth', score: 4.5 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote'],
        experienceLevel: 5,
      },
    ],
    stage: 'offer'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Taylor',
    email: 'emily.t@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Boston, MA',
    role: 'DevOps Engineer',
    industry: 'Healthcare',
    yearsOfExperience: 4,
    resumeSummary: 'DevOps engineer focused on automation, CI/CD, and infrastructure as code',
    technicalSkills: [
      { name: 'Kubernetes', score: 4.6 },
      { name: 'Docker', score: 4.7 },
      { name: 'Terraform', score: 4.5 },
    ],
    softSkills: [
      { name: 'Communication', score: 4.4 },
      { name: 'Organization', score: 4.6 },
    ],
    behavioralTraits: [
      { name: 'Process Improvement', score: 4.7 },
      { name: 'Problem Solving', score: 4.5 },
      { name: 'Collaboration', score: 4.3 },
    ],
    culturalValues: [
      { name: 'Automation First', score: 4.8 },
      { name: 'Security Minded', score: 4.6 },
      { name: 'Continuous Improvement', score: 4.5 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'remote'],
        experienceLevel: 4,
      },
    ],
    stage: 'screening'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@example.com',
    phone: '+1 (555) 567-8901',
    location: 'New York, NY',
    role: 'Mobile Developer',
    industry: 'Media',
    yearsOfExperience: 6,
    resumeSummary: 'Mobile development expert with extensive experience in iOS and React Native',
    technicalSkills: [
      { name: 'Swift', score: 4.8 },
      { name: 'React Native', score: 4.6 },
      { name: 'iOS Development', score: 4.7 },
    ],
    softSkills: [
      { name: 'User Empathy', score: 4.5 },
      { name: 'Time Management', score: 4.4 },
    ],
    behavioralTraits: [
      { name: 'Innovation', score: 4.6 },
      { name: 'Quality Focus', score: 4.8 },
      { name: 'User Centered', score: 4.7 },
    ],
    culturalValues: [
      { name: 'Product Excellence', score: 4.7 },
      { name: 'User First', score: 4.8 },
      { name: 'Innovation', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['onsite'],
        experienceLevel: 4,
      },
    ],
    stage: 'validating'
  },
  // Additional candidates 6-25
  {
    id: '6',
    firstName: 'Rachel',
    lastName: 'Martinez',
    email: 'rachel.m@example.com',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
    role: 'Data Scientist',
    industry: 'Finance',
    yearsOfExperience: 4,
    resumeSummary: 'Data scientist specializing in machine learning and predictive analytics',
    technicalSkills: [
      { name: 'Python', score: 4.7 },
      { name: 'TensorFlow', score: 4.5 },
      { name: 'SQL', score: 4.6 },
    ],
    softSkills: [
      { name: 'Analytical Thinking', score: 4.8 },
      { name: 'Communication', score: 4.3 },
    ],
    behavioralTraits: [
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Attention to Detail', score: 4.6 },
      { name: 'Research Oriented', score: 4.8 },
    ],
    culturalValues: [
      { name: 'Data Driven', score: 4.9 },
      { name: 'Innovation', score: 4.5 },
      { name: 'Continuous Learning', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'shortlisted'
  },
  {
    id: '7',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.w@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
    role: 'Security Engineer',
    industry: 'Cybersecurity',
    yearsOfExperience: 8,
    resumeSummary: 'Cybersecurity expert with focus on application security and threat modeling',
    technicalSkills: [
      { name: 'Security Tools', score: 4.9 },
      { name: 'Penetration Testing', score: 4.7 },
      { name: 'Cloud Security', score: 4.6 },
    ],
    softSkills: [
      { name: 'Risk Assessment', score: 4.8 },
      { name: 'Documentation', score: 4.5 },
    ],
    behavioralTraits: [
      { name: 'Analytical Thinking', score: 4.8 },
      { name: 'Attention to Detail', score: 4.9 },
      { name: 'Proactive', score: 4.7 },
    ],
    culturalValues: [
      { name: 'Security First', score: 4.9 },
      { name: 'Integrity', score: 4.8 },
      { name: 'Continuous Learning', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'remote'],
        experienceLevel: 5,
      },
    ],
    stage: 'screening'
  },
  {
    id: '8',
    firstName: 'Sophia',
    lastName: 'Garcia',
    email: 'sophia.g@example.com',
    phone: '+1 (555) 890-1234',
    location: 'Miami, FL',
    role: 'UX Designer',
    industry: 'E-commerce',
    yearsOfExperience: 5,
    resumeSummary: 'UX designer with strong focus on user research and accessibility',
    technicalSkills: [
      { name: 'Figma', score: 4.8 },
      { name: 'User Research', score: 4.7 },
      { name: 'Prototyping', score: 4.6 },
    ],
    softSkills: [
      { name: 'Empathy', score: 4.9 },
      { name: 'Communication', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Creativity', score: 4.8 },
      { name: 'User Focus', score: 4.9 },
      { name: 'Collaboration', score: 4.7 },
    ],
    culturalValues: [
      { name: 'User Centered', score: 4.9 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Inclusivity', score: 4.8 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'interview'
  },
  {
    id: '9',
    firstName: 'William',
    lastName: 'Brown',
    email: 'william.b@example.com',
    phone: '+1 (555) 901-2345',
    location: 'Portland, OR',
    role: 'Product Manager',
    industry: 'Technology',
    yearsOfExperience: 6,
    resumeSummary: 'Product manager with track record of successful product launches',
    technicalSkills: [
      { name: 'Product Strategy', score: 4.8 },
      { name: 'Agile', score: 4.7 },
      { name: 'Data Analysis', score: 4.5 },
    ],
    softSkills: [
      { name: 'Leadership', score: 4.8 },
      { name: 'Strategic Thinking', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Decision Making', score: 4.8 },
      { name: 'Stakeholder Management', score: 4.7 },
      { name: 'Vision Setting', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Customer Focus', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Data Driven', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'onsite'],
        experienceLevel: 4,
      },
    ],
    stage: 'validating'
  },
  {
    id: '10',
    firstName: 'Emma',
    lastName: 'Lee',
    email: 'emma.l@example.com',
    phone: '+1 (555) 012-3456',
    location: 'Los Angeles, CA',
    role: 'QA Engineer',
    industry: 'Software',
    yearsOfExperience: 4,
    resumeSummary: 'QA engineer with expertise in automated testing and quality processes',
    technicalSkills: [
      { name: 'Selenium', score: 4.7 },
      { name: 'Test Automation', score: 4.6 },
      { name: 'CI/CD', score: 4.5 },
    ],
    softSkills: [
      { name: 'Attention to Detail', score: 4.8 },
      { name: 'Process Oriented', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Quality Focus', score: 4.9 },
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Methodical', score: 4.8 },
    ],
    culturalValues: [
      { name: 'Quality First', score: 4.9 },
      { name: 'Continuous Improvement', score: 4.7 },
      { name: 'Collaboration', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote'],
        experienceLevel: 4,
      },
    ],
    stage: 'offer'
  },
  {
    id: '11',
    firstName: 'Alexander',
    lastName: 'Patel',
    email: 'alex.p@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Atlanta, GA',
    role: 'Cloud Architect',
    industry: 'Technology',
    yearsOfExperience: 9,
    resumeSummary: 'Cloud architect with extensive experience in AWS and multi-cloud solutions',
    technicalSkills: [
      { name: 'AWS', score: 4.9 },
      { name: 'Azure', score: 4.7 },
      { name: 'Terraform', score: 4.8 },
    ],
    softSkills: [
      { name: 'System Design', score: 4.9 },
      { name: 'Technical Leadership', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Strategic Thinking', score: 4.8 },
      { name: 'Architecture Design', score: 4.9 },
      { name: 'Innovation', score: 4.7 },
    ],
    culturalValues: [
      { name: 'Technical Excellence', score: 4.9 },
      { name: 'Innovation', score: 4.8 },
      { name: 'Scalability', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote', 'hybrid'],
        experienceLevel: 5,
      },
    ],
    stage: 'interview'
  },
  {
    id: '12',
    firstName: 'Olivia',
    lastName: 'Anderson',
    email: 'olivia.a@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Seattle, WA',
    role: 'Machine Learning Engineer',
    industry: 'AI/ML',
    yearsOfExperience: 5,
    resumeSummary: 'ML engineer specializing in NLP and computer vision applications',
    technicalSkills: [
      { name: 'PyTorch', score: 4.8 },
      { name: 'NLP', score: 4.7 },
      { name: 'Computer Vision', score: 4.6 },
    ],
    softSkills: [
      { name: 'Research', score: 4.8 },
      { name: 'Problem Solving', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Innovation', score: 4.8 },
      { name: 'Learning Agility', score: 4.7 },
      { name: 'Analytical Thinking', score: 4.9 },
    ],
    culturalValues: [
      { name: 'Innovation', score: 4.9 },
      { name: 'Research Excellence', score: 4.8 },
      { name: 'Continuous Learning', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'screening'
  },
  {
    id: '13',
    firstName: 'Lucas',
    lastName: 'Thompson',
    email: 'lucas.t@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    role: 'Blockchain Developer',
    industry: 'Blockchain',
    yearsOfExperience: 4,
    resumeSummary: 'Blockchain developer with experience in smart contracts and DeFi applications',
    technicalSkills: [
      { name: 'Solidity', score: 4.8 },
      { name: 'Ethereum', score: 4.7 },
      { name: 'Web3.js', score: 4.6 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Security Mindset', score: 4.8 },
    ],
    behavioralTraits: [
      { name: 'Innovation', score: 4.7 },
      { name: 'Technical Learning', score: 4.8 },
      { name: 'Detail Oriented', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Innovation', score: 4.8 },
      { name: 'Decentralization', score: 4.7 },
      { name: 'Security', score: 4.9 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote'],
        experienceLevel: 4,
      },
    ],
    stage: 'shortlisted'
  },
  {
    id: '14',
    firstName: 'Isabella',
    lastName: 'Clark',
    email: 'isabella.c@example.com',
    phone: '+1 (555) 456-7890',
    location: 'San Diego, CA',
    role: 'Technical Lead',
    industry: 'E-commerce',
    yearsOfExperience: 8,
    resumeSummary: 'Technical lead with strong team management and architecture skills',
    technicalSkills: [
      { name: 'System Design', score: 4.9 },
      { name: 'Team Leadership', score: 4.8 },
      { name: 'Architecture', score: 4.7 },
    ],
    softSkills: [
      { name: 'Leadership', score: 4.9 },
      { name: 'Communication', score: 4.8 },
    ],
    behavioralTraits: [
      { name: 'Team Building', score: 4.8 },
      { name: 'Decision Making', score: 4.7 },
      { name: 'Mentorship', score: 4.9 },
    ],
    culturalValues: [
      { name: 'Team Growth', score: 4.9 },
      { name: 'Technical Excellence', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'onsite'],
        experienceLevel: 5,
      },
    ],
    stage: 'validating'
  },
  {
    id: '15',
    firstName: 'Ethan',
    lastName: 'Wright',
    email: 'ethan.w@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    role: 'Data Engineer',
    industry: 'Healthcare',
    yearsOfExperience: 5,
    resumeSummary: 'Data engineer specializing in ETL pipelines and data warehousing',
    technicalSkills: [
      { name: 'Apache Spark', score: 4.7 },
      { name: 'SQL', score: 4.8 },
      { name: 'Python', score: 4.6 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Data Modeling', score: 4.8 },
    ],
    behavioralTraits: [
      { name: 'Analytical Thinking', score: 4.8 },
      { name: 'Attention to Detail', score: 4.7 },
      { name: 'Process Oriented', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Data Quality', score: 4.8 },
      { name: 'Efficiency', score: 4.7 },
      { name: 'Collaboration', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'screening'
  },
  {
    id: '16',
    firstName: 'Ava',
    lastName: 'Martinez',
    email: 'ava.m@example.com',
    phone: '+1 (555) 678-9012',
    location: 'Miami, FL',
    role: 'Frontend Developer',
    industry: 'Media',
    yearsOfExperience: 3,
    resumeSummary: 'Frontend developer with strong UI/UX skills and modern framework expertise',
    technicalSkills: [
      { name: 'React', score: 4.7 },
      { name: 'TypeScript', score: 4.6 },
      { name: 'CSS', score: 4.8 },
    ],
    softSkills: [
      { name: 'Creativity', score: 4.8 },
      { name: 'Communication', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'User Focus', score: 4.8 },
      { name: 'Attention to Detail', score: 4.7 },
      { name: 'Collaboration', score: 4.6 },
    ],
    culturalValues: [
      { name: 'User Experience', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Quality', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 3,
      },
    ],
    stage: 'interview'
  },
  {
    id: '17',
    firstName: 'Daniel',
    lastName: 'Kim',
    email: 'daniel.k@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Chicago, IL',
    role: 'Backend Developer',
    industry: 'Finance',
    yearsOfExperience: 6,
    resumeSummary: 'Backend developer with strong focus on scalable microservices',
    technicalSkills: [
      { name: 'Go', score: 4.8 },
      { name: 'Microservices', score: 4.7 },
      { name: 'PostgreSQL', score: 4.6 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.8 },
      { name: 'System Design', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Analytical Thinking', score: 4.8 },
      { name: 'Performance Focus', score: 4.7 },
      { name: 'Scalability Mindset', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Technical Excellence', score: 4.8 },
      { name: 'Scalability', score: 4.7 },
      { name: 'Innovation', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote', 'hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'offer'
  },
  {
    id: '18',
    firstName: 'Sophia',
    lastName: 'Lee',
    email: 'sophia.l@example.com',
    phone: '+1 (555) 890-1234',
    location: 'Seattle, WA',
    role: 'Product Designer',
    industry: 'Technology',
    yearsOfExperience: 5,
    resumeSummary: 'Product designer with expertise in user research and design systems',
    technicalSkills: [
      { name: 'Figma', score: 4.9 },
      { name: 'Design Systems', score: 4.8 },
      { name: 'User Research', score: 4.7 },
    ],
    softSkills: [
      { name: 'User Empathy', score: 4.9 },
      { name: 'Communication', score: 4.8 },
    ],
    behavioralTraits: [
      { name: 'Creativity', score: 4.9 },
      { name: 'User Focus', score: 4.8 },
      { name: 'Collaboration', score: 4.7 },
    ],
    culturalValues: [
      { name: 'User Centered', score: 4.9 },
      { name: 'Innovation', score: 4.8 },
      { name: 'Quality', score: 4.7 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'validating'
  },
  {
    id: '19',
    firstName: 'William',
    lastName: 'Garcia',
    email: 'william.g@example.com',
    phone: '+1 (555) 901-2345',
    location: 'Austin, TX',
    role: 'DevOps Engineer',
    industry: 'Technology',
    yearsOfExperience: 4,
    resumeSummary: 'DevOps engineer focused on automation and infrastructure as code',
    technicalSkills: [
      { name: 'Kubernetes', score: 4.7 },
      { name: 'Terraform', score: 4.8 },
      { name: 'AWS', score: 4.6 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Automation', score: 4.8 },
    ],
    behavioralTraits: [
      { name: 'Process Improvement', score: 4.8 },
      { name: 'Automation Focus', score: 4.7 },
      { name: 'Reliability', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Automation', score: 4.8 },
      { name: 'Reliability', score: 4.7 },
      { name: 'Innovation', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['remote'],
        experienceLevel: 4,
      },
    ],
    stage: 'screening'
  },
  {
    id: '20',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.w@example.com',
    phone: '+1 (555) 012-3456',
    location: 'Portland, OR',
    role: 'Full Stack Developer',
    industry: 'E-commerce',
    yearsOfExperience: 4,
    resumeSummary: 'Full stack developer with experience in modern web technologies',
    technicalSkills: [
      { name: 'React', score: 4.7 },
      { name: 'Node.js', score: 4.6 },
      { name: 'MongoDB', score: 4.5 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Communication', score: 4.6 },
    ],
    behavioralTraits: [
      { name: 'Adaptability', score: 4.7 },
      { name: 'Learning Agility', score: 4.6 },
      { name: 'Collaboration', score: 4.5 },
    ],
    culturalValues: [
      { name: 'Innovation', score: 4.7 },
      { name: 'Team Work', score: 4.6 },
      { name: 'Quality', score: 4.5 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 3,
      },
    ],
    stage: 'shortlisted'
  },
  {
    id: '21',
    firstName: 'Benjamin',
    lastName: 'Taylor',
    email: 'ben.t@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Denver, CO',
    role: 'Security Engineer',
    industry: 'Cybersecurity',
    yearsOfExperience: 7,
    resumeSummary: 'Security engineer specializing in application security and penetration testing',
    technicalSkills: [
      { name: 'Application Security', score: 4.8 },
      { name: 'Penetration Testing', score: 4.7 },
      { name: 'Security Tools', score: 4.6 },
    ],
    softSkills: [
      { name: 'Risk Assessment', score: 4.8 },
      { name: 'Communication', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Security Mindset', score: 4.8 },
      { name: 'Attention to Detail', score: 4.7 },
      { name: 'Proactive', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Security First', score: 4.8 },
      { name: 'Integrity', score: 4.7 },
      { name: 'Quality', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'interview'
  },
  {
    id: '22',
    firstName: 'Mia',
    lastName: 'Anderson',
    email: 'mia.a@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    role: 'Data Scientist',
    industry: 'AI/ML',
    yearsOfExperience: 5,
    resumeSummary: 'Data scientist with focus on machine learning and predictive analytics',
    technicalSkills: [
      { name: 'Python', score: 4.8 },
      { name: 'Machine Learning', score: 4.7 },
      { name: 'Deep Learning', score: 4.6 },
    ],
    softSkills: [
      { name: 'Problem Solving', score: 4.8 },
      { name: 'Research', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Analytical Thinking', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Research Oriented', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Innovation', score: 4.8 },
      { name: 'Data Driven', score: 4.7 },
      { name: 'Research Excellence', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'validating'
  },
  {
    id: '23',
    firstName: 'Alexander',
    lastName: 'Brown',
    email: 'alex.b@example.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    role: 'Solutions Architect',
    industry: 'Technology',
    yearsOfExperience: 8,
    resumeSummary: 'Solutions architect with expertise in enterprise architecture and cloud solutions',
    technicalSkills: [
      { name: 'Enterprise Architecture', score: 4.9 },
      { name: 'Cloud Solutions', score: 4.8 },
      { name: 'System Design', score: 4.7 },
    ],
    softSkills: [
      { name: 'Leadership', score: 4.8 },
      { name: 'Communication', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Strategic Thinking', score: 4.8 },
      { name: 'Problem Solving', score: 4.7 },
      { name: 'Vision Setting', score: 4.6 },
    ],
    culturalValues: [
      { name: 'Innovation', score: 4.8 },
      { name: 'Excellence', score: 4.7 },
      { name: 'Leadership', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'onsite'],
        experienceLevel: 5,
      },
    ],
    stage: 'offer'
  },
  {
    id: '24',
    firstName: 'Victoria',
    lastName: 'Martinez',
    email: 'victoria.m@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Los Angeles, CA',
    role: 'UI/UX Designer',
    industry: 'Technology',
    yearsOfExperience: 6,
    resumeSummary: 'UI/UX designer with strong focus on user-centered design and accessibility',
    technicalSkills: [
      { name: 'UI Design', score: 4.8 },
      { name: 'UX Research', score: 4.7 },
      { name: 'Prototyping', score: 4.6 },
    ],
    softSkills: [
      { name: 'Creativity', score: 4.8 },
      { name: 'User Empathy', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'User Focus', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Collaboration', score: 4.6 },
    ],
    culturalValues: [
      { name: 'User Centered', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Quality', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid'],
        experienceLevel: 4,
      },
    ],
    stage: 'screening'
  },
  {
    id: '25',
    firstName: 'Christopher',
    lastName: 'Lee',
    email: 'chris.l@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    role: 'Technical Product Manager',
    industry: 'Technology',
    yearsOfExperience: 7,
    resumeSummary: 'Technical product manager with strong background in software development',
    technicalSkills: [
      { name: 'Product Management', score: 4.8 },
      { name: 'Agile', score: 4.7 },
      { name: 'Technical Architecture', score: 4.6 },
    ],
    softSkills: [
      { name: 'Leadership', score: 4.8 },
      { name: 'Communication', score: 4.7 },
    ],
    behavioralTraits: [
      { name: 'Strategic Thinking', score: 4.8 },
      { name: 'Decision Making', score: 4.7 },
      { name: 'Stakeholder Management', score: 4.6 },
    ],
    culturalValues: [
      { name: 'User Focus', score: 4.8 },
      { name: 'Innovation', score: 4.7 },
      { name: 'Quality', score: 4.6 },
    ],
    hireContextPreferences: [
      {
        categoryId: 'work-environment',
        preferredContexts: ['hybrid', 'onsite'],
        experienceLevel: 4,
      },
    ],
    stage: 'shortlisted'
  }
]; 