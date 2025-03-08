'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Candidate Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The candidate you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90"
        >
          Return to Talent Pool
        </button>
      </div>
    </div>
  );
} 