'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-[#714b67] mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 text-sm font-medium text-white bg-[#714b67] rounded-lg hover:bg-[#714b67]/90 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 