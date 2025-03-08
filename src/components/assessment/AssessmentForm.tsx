import { useState, useEffect } from 'react';
import { Question, CandidateAssessment } from '@/types/assessment';

interface AssessmentFormProps {
  assessment: {
    id: string;
    title: string;
    description: string;
    duration: number;
    questions: Question[];
  };
  onSubmit: (answers: { questionId: string; answer: string }[]) => void;
}

interface QuestionComponentProps {
  question: Question;
  answer: string;
  onChange: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<QuestionComponentProps> = ({ question, answer, onChange }) => (
  <div className="space-y-3">
    {question.options?.map((option) => (
      <label key={option} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
        <input
          type="radio"
          name={question.id}
          value={option}
          checked={answer === option}
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 text-accent border-gray-300 focus:ring-accent"
        />
        <span className="text-gray-700">{option}</span>
      </label>
    ))}
  </div>
);

const TextQuestion: React.FC<QuestionComponentProps> = ({ question, answer, onChange }) => (
  <textarea
    value={answer}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Type your answer here..."
    className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
  />
);

const ScenarioQuestion: React.FC<QuestionComponentProps> = ({ question, answer, onChange }) => (
  <div className="space-y-4">
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-700">{question.text}</p>
    </div>
    <textarea
      value={answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe how you would handle this scenario..."
      className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
    />
  </div>
);

const CodingQuestion: React.FC<QuestionComponentProps> = ({ question, answer, onChange }) => (
  <div className="space-y-4">
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-700">{question.text}</p>
    </div>
    <textarea
      value={answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your code here..."
      className="w-full h-64 p-3 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
    />
  </div>
);

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ assessment, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.duration * 60); // Convert minutes to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [assessment.questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    onSubmit(answersArray);
  };

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  const renderQuestion = (question: Question) => {
    const commonProps = {
      question,
      answer: answers[question.id] || '',
      onChange: handleAnswerChange,
    };

    switch (question.type) {
      case 'multiple_choice':
        return <MultipleChoiceQuestion {...commonProps} />;
      case 'text':
        return <TextQuestion {...commonProps} />;
      case 'scenario':
        return <ScenarioQuestion {...commonProps} />;
      case 'coding':
        return <CodingQuestion {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{assessment.title}</h1>
        <p className="text-gray-600 mb-4">{assessment.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {assessment.questions.length}
          </div>
          <div className="text-sm font-medium text-gray-700">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        </div>
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.text}
        </h2>
        {renderQuestion(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentQuestionIndex === assessment.questions.length - 1 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}; 