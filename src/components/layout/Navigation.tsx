'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-form-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-accent-secondary">
                SkillConnect
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/analytics"
                className="border-transparent text-primary-text hover:border-accent hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Analytics
              </Link>
              <Link
                href="/talent-pool"
                className="border-accent-secondary text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Talent Pool
              </Link>
              <Link
                href="/assessments"
                className="border-transparent text-primary-text hover:border-accent hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Assessment Console
              </Link>
              <Link
                href="/assessments/hub"
                className="border-transparent text-primary-text hover:border-accent hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Assessment Hub
              </Link>
              <Link
                href="/pipeline"
                className="border-transparent text-primary-text hover:border-accent hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Pipeline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 