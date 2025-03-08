'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  value: string;
  description: string;
}

export function SortableItem({ id, value, description }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg border p-4 cursor-grab
        ${isDragging ? 'shadow-lg border-accent' : 'shadow-sm hover:border-accent/50'}
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-lg
          ${isDragging ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}
        `}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{value}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
} 