'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { CompanyValue } from '@/types/cultureFit';

interface ValueSortChallengeProps {
  values: CompanyValue[];
  onComplete: (rankings: string[]) => void;
}

const companyValues = [
  {
    id: 'innovation',
    value: 'Innovation',
    description: 'Continuously seeking new and better ways to solve problems'
  },
  {
    id: 'collaboration',
    value: 'Collaboration',
    description: 'Working together effectively to achieve shared goals'
  },
  {
    id: 'excellence',
    value: 'Excellence',
    description: 'Striving for the highest quality in everything we do'
  },
  {
    id: 'integrity',
    value: 'Integrity',
    description: 'Being honest, ethical, and transparent in all actions'
  },
  {
    id: 'customer-focus',
    value: 'Customer Focus',
    description: 'Putting customers at the center of every decision'
  }
];

const idealOrder = ['innovation', 'excellence', 'customer-focus', 'collaboration', 'integrity'];

export function ValueSortChallenge({ values, onComplete }: ValueSortChallengeProps) {
  const [items, setItems] = useState(values.map(v => v.id));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(items);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#714b67] mb-4">
        Sort Company Values by Importance
      </h2>
      <p className="text-[#714b67]/70 mb-6">
        Drag and drop the values to rank them from most important (top) to least important (bottom).
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((id) => {
              const value = values.find(v => v.id === id)!;
              return (
                <SortableItem
                  key={id}
                  id={id}
                  value={value.title}
                  description={value.description}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitted}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isSubmitted
              ? 'bg-[#714b67]/50 text-white cursor-not-allowed'
              : 'bg-[#714b67] text-white hover:bg-[#714b67]/90'
          }`}
        >
          {isSubmitted ? 'Submitted' : 'Submit Ranking'}
        </button>
      </div>
    </div>
  );
} 