'use client';

import { useState, useEffect } from 'react';
import { Question, AssessmentProgress } from '@/types/jobKnowledge';
import { getQuestionsByRole, skillAssessments, SkillAssessment } from '@/data/mockJobKnowledgeQuestions';
import { Timer } from '@/components/common/Timer';
import { AcademicCapIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface JobKnowledgeModuleProps {
  candidateId: string;
  role: string;
}

type AssessmentState = 'selection' | 'assessment' | 'complete';

export function JobKnowledgeModule({ candidateId, role }: JobKnowledgeModuleProps) {
  const [state, setState] = useState<AssessmentState>('selection');
  const [selectedAssessment, setSelectedAssessment] = useState<SkillAssessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<AssessmentProgress>({
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    competencyScores: {}
  });
  const [startTime, setStartTime] = useState<number | null>(null);

  const currentQuestion = questions[progress.currentQuestionIndex];

  const handleAssessmentSelect = (assessment: SkillAssessment) => {
    setSelectedAssessment(assessment);
    setQuestions(getQuestionsByRole(assessment.role));
    setState('assessment');
  };

  const handleAnswer = (answer: string) => {
    if (!startTime || !currentQuestion) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = currentQuestion.type === 'technical_scenario' 
      ? currentQuestion.options.find(opt => opt.id === answer)?.isCorrect
      : true;

    const updatedCompetencyScores = { ...progress.competencyScores };
    currentQuestion.competencies.forEach(competency => {
      updatedCompetencyScores[competency] = (updatedCompetencyScores[competency] || 0) + 
        (isCorrect ? currentQuestion.points / currentQuestion.competencies.length : 0);
    });

    const totalPossiblePoints = questions
      .slice(0, progress.currentQuestionIndex + 1)
      .reduce((sum, q) => sum + q.points, 0);

    const currentTotalScore = progress.score + (isCorrect ? currentQuestion.points : 0);

    setProgress(prev => ({
      ...prev,
      answers: [...prev.answers, { questionId: currentQuestion.id, answer, timeSpent }],
      score: currentTotalScore,
      competencyScores: updatedCompetencyScores,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));

    setStartTime(null);

    if (progress.currentQuestionIndex === questions.length - 1) {
      setState('complete');
    }
  };

  const handleTimeUp = () => {
    if (currentQuestion?.type === 'technical_scenario') {
      handleAnswer('');
    } else {
      handleAnswer('Time up - incomplete');
    }
  };

  useEffect(() => {
    if (currentQuestion && !startTime && state === 'assessment') {
      setStartTime(Date.now());
    }
  }, [currentQuestion, startTime, state]);

  if (state === 'selection') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Assessments</h2>
          <p className="text-gray-600 mb-6">
            Select an assessment to evaluate your technical skills and knowledge.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {skillAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer"
                onClick={() => handleAssessmentSelect(assessment)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{assessment.title}</h3>
                    <p className="text-gray-600 mb-4">{assessment.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {assessment.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            assessment.id === 'frontend-dev'
                              ? 'bg-[#fbb130] text-white'
                              : assessment.id === 'financial-control'
                              ? 'bg-[#1ad3bb] text-black'
                              : 'bg-[#714b67] text-white'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <AcademicCapIcon className="w-4 h-4" />
                    <span>{assessment.questionCount} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{assessment.timeEstimate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (state === 'complete') {
    const totalPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);
    const percentageScore = Math.round((progress.score / totalPossiblePoints) * 100);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-full">
              <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Assessment Complete</h2>
              <p className="text-gray-600">{selectedAssessment?.title}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Overall Score</span>
              <span className="text-3xl font-bold text-gray-900">
                {percentageScore}%
              </span>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Competency Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(progress.competencyScores).map(([competency, score]) => (
                  <div key={competency}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">{competency}</span>
                      <span className="text-sm text-gray-900">{Math.round(score)} points</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${(score / totalPossiblePoints) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress and Timer */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Question {progress.currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${((progress.currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <Timer
          timeLeft={currentQuestion?.timeLimit || 0}
          onComplete={handleTimeUp}
          className="text-sm font-medium text-gray-600"
        />
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {currentQuestion?.type === 'coding_challenge' ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">{currentQuestion.prompt}</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <span className="text-sm font-medium text-gray-600">Code Editor</span>
              </div>
              <textarea
                className="w-full h-48 p-4 font-mono text-sm focus:outline-none resize-none"
                defaultValue={currentQuestion.starterCode}
                onChange={(e) => handleAnswer(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Test Cases</h3>
              <div className="space-y-2">
                {currentQuestion.testCases.map((testCase, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <div className="font-medium text-gray-700">Test Case {index + 1}:</div>
                    <div className="pl-4">
                      <div>Input: {testCase.input}</div>
                      <div>Expected: {testCase.expectedOutput}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">{currentQuestion?.scenario}</h2>
            <div className="space-y-2">
              {currentQuestion?.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Competencies */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Testing competencies:</span>
          {currentQuestion?.competencies.map((competency, index) => (
            <span
              key={competency}
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                selectedAssessment?.id === 'frontend-dev'
                  ? 'bg-[#fbb130] text-white'
                  : selectedAssessment?.id === 'financial-control'
                  ? 'bg-[#1ad3bb] text-black'
                  : 'bg-[#714b67] text-white'
              }`}
            >
              {competency}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 