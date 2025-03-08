'use client';
import { useState } from 'react';
import { mockCandidates } from '@/data/mockCandidates';
import { Candidate } from '@/types/candidate';
import { PipelineColumn } from '@/components/pipeline/PipelineColumn';

type Stage = 'shortlisted' | 'screening' | 'validating' | 'interview' | 'offer';

interface PipelineColumn {
  id: Stage;
  title: string;
  candidates: Candidate[];
}

export default function PipelinePage() {
  // Initialize pipeline columns with candidates from mock data
  const [columns, setColumns] = useState<PipelineColumn[]>([
    {
      id: 'shortlisted',
      title: 'Shortlisted',
      candidates: mockCandidates.filter(c => c.stage === 'shortlisted')
    },
    {
      id: 'screening',
      title: 'Screening',
      candidates: mockCandidates.filter(c => c.stage === 'screening')
    },
    {
      id: 'validating',
      title: 'Validating Role Fit',
      candidates: mockCandidates.filter(c => c.stage === 'validating')
    },
    {
      id: 'interview',
      title: 'Interview',
      candidates: mockCandidates.filter(c => c.stage === 'interview')
    },
    {
      id: 'offer',
      title: 'Offer',
      candidates: mockCandidates.filter(c => c.stage === 'offer')
    }
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toStage: Stage) => {
    e.preventDefault();
    
    const candidateId = e.dataTransfer.getData('candidateId');
    const fromStage = e.dataTransfer.getData('fromStage') as Stage;
    
    if (fromStage === toStage) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find the candidate in the from column
      const fromColumn = newColumns.find(col => col.id === fromStage);
      const toColumn = newColumns.find(col => col.id === toStage);
      
      if (!fromColumn || !toColumn) return prevColumns;
      
      // Find the candidate and remove from the old column
      const candidateIndex = fromColumn.candidates.findIndex(c => c.id === candidateId);
      if (candidateIndex === -1) return prevColumns;
      
      const [candidate] = fromColumn.candidates.splice(candidateIndex, 1);
      
      // Add to the new column
      toColumn.candidates.push({
        ...candidate,
        stage: toStage
      });
      
      return newColumns;
    });
  };

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <div className="max-w-[90rem] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#714b67] mb-2">Pipeline</h1>
          <p className="text-[#714b67]/80">
            Drag and drop candidates to update their status in the hiring pipeline.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {columns.map(column => (
            <PipelineColumn
              key={column.id}
              id={column.id}
              title={column.title}
              candidates={column.candidates}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 