'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { mockAssessmentTemplates } from '@/data/mockAssessmentTemplates';

export default function TakeAssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find the assessment template
  const assessment = mockAssessmentTemplates.find(
    (template) => template.id === params.id
  );

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Assessment Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The assessment you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push('/assessments')}
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90"
          >
            Return to Assessments
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (answers: { questionId: string; answer: string }[]) => {
    // In a real app, this would send the answers to an API
    console.log('Submitted answers:', answers);
    setIsSubmitted(true);

    // Simulate API call delay
    setTimeout(() => {
      router.push('/assessments');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Assessment Submitted Successfully
          </h1>
          <p className="text-gray-600">
            Thank you for completing the assessment. You will be redirected shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <AssessmentForm
        assessment={assessment}
        onSubmit={handleSubmit}
      />
    </main>
  );
} 