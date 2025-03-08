'use client';

import { useRouter } from 'next/navigation';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-[#714b67]" />
        </div>
        <h1 className="text-4xl font-bold text-[#714b67] mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full px-6 py-3 text-sm font-medium text-[#714b67] bg-white border border-[#714b67] rounded-lg hover:bg-[#714b67]/5 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-3 text-sm font-medium text-white bg-[#714b67] rounded-lg hover:bg-[#714b67]/90 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
} 