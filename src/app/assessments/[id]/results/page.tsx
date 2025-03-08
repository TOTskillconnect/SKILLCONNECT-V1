'use client';

import { useRouter } from 'next/navigation';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';

// Mock result data (in a real app, this would come from an API)
const mockResult = {
  assessmentId: 'tech-1',
  candidateId: '1',
  score: 88,
  feedback: `Overall, the candidate demonstrated strong technical knowledge and problem-solving abilities. Their responses showed a good understanding of React concepts and modern frontend development practices.

Key strengths:
- Excellent grasp of React hooks and their use cases
- Strong understanding of performance optimization
- Clear communication of technical concepts

Areas for improvement:
- Could elaborate more on error handling strategies
- Some advanced TypeScript concepts need strengthening`,
  completedAt: '2024-02-25T14:30:00Z',
  detailedScores: [
    {
      category: 'React Fundamentals',
      score: 45,
      maxScore: 50,
      feedback: 'Excellent understanding of React hooks and component lifecycle.'
    },
    {
      category: 'TypeScript Knowledge',
      score: 18,
      maxScore: 25,
      feedback: 'Good basic knowledge, but some advanced concepts need review.'
    },
    {
      category: 'Problem Solving',
      score: 15,
      maxScore: 15,
      feedback: 'Outstanding problem-solving approach with clear explanations.'
    },
    {
      category: 'Best Practices',
      score: 10,
      maxScore: 10,
      feedback: 'Demonstrated strong awareness of frontend development best practices.'
    }
  ]
};

export default function AssessmentResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.push('/assessments');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Assessments
          </button>
        </div>

        <AssessmentResults
          result={mockResult}
          onClose={handleClose}
        />
      </div>
    </main>
  );
} 