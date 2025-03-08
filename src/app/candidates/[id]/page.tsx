import { notFound } from 'next/navigation';
import { mockCandidates } from '@/data/mockCandidates';
import { CandidateProfile } from '@/components/candidate/CandidateProfile';

export default async function CandidateDetailPage({ params }: { params: { id: string } }) {
  // Ensure we're working with string IDs
  const candidate = mockCandidates.find(c => c.id === params.id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <CandidateProfile candidate={candidate} />
    </div>
  );
} 