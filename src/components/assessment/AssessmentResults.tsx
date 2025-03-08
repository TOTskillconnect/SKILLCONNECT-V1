import { AssessmentResult } from '@/types/assessment';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onClose?: () => void;
}

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  label: string;
  colorClass: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, maxScore, label, colorClass }) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-medium text-gray-900">{score}/{maxScore}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ result, onClose }) => {
  const getScoreColor = (score: number) => {
    const percentage = score;
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Assessment Results</h2>
          <p className="text-sm text-gray-500">
            Completed on {new Date(result.completedAt).toLocaleDateString()}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Overall Score */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Overall Score</h3>
          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(result.score)}`}>
            {getScoreLabel(result.score)}
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-gray-900">{result.score}%</span>
          <span className="text-gray-500 mb-1">overall performance</span>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Score Breakdown</h3>
        <div className="space-y-4">
          {result.detailedScores.map((score, index) => (
            <ScoreGauge
              key={index}
              score={score.score}
              maxScore={score.maxScore}
              label={score.category}
              colorClass={getScoreColor((score.score / score.maxScore) * 100)}
            />
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Feedback</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{result.feedback}</p>
          </div>
          {result.detailedScores.map((score, index) => (
            score.feedback && (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-gray-700">{score.category}</h4>
                <p className="text-gray-600 text-sm">{score.feedback}</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Close
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}; 