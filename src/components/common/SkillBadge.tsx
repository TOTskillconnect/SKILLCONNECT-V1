import { StarIcon } from '@heroicons/react/24/solid';

interface SkillBadgeProps {
  name: string;
  rating: number;
}

export function SkillBadge({ name, rating }: SkillBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-green-100 text-green-800';
    if (score >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(rating)}`}>
        {name}
      </span>
      <div className="flex items-center">
        <StarIcon className="h-4 w-4 text-yellow-400" />
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
} 