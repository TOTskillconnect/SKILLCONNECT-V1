'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface ValueSortChallengeProps {
  onComplete: (score: number) => void;
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

export function ValueSortChallenge({ onComplete }: ValueSortChallengeProps) {
  const [items, setItems] = useState(companyValues);
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
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    const currentOrder = items.map(item => item.id);
    let score = 0;
    
    // Calculate score based on position matches and proximity
    currentOrder.forEach((value, index) => {
      const idealIndex = idealOrder.indexOf(value);
      const distance = Math.abs(index - idealIndex);
      
      if (distance === 0) {
        score += 20; // Perfect position match
      } else if (distance === 1) {
        score += 15; // Off by one position
      } else if (distance === 2) {
        score += 10; // Off by two positions
      } else {
        score += 5; // More distant position
      }
    });

    setIsSubmitted(true);
    onComplete(score);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Value Alignment Assessment</h2>
        <p className="text-gray-600 mb-6">
          Arrange these company values in order of importance, based on your understanding of our organization's culture.
          Drag and drop the values to reorder them.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  description={item.description}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
} 