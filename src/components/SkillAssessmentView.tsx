import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Award,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  HelpCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/mockData';
import { AssessmentQuestion, ProficiencyLevel } from '../types';

export const SkillAssessmentView: React.FC = () => {
  const {
    targetRole,
    currentAnalysis,
    recordAssessmentResult,
    assessmentSubmissions,
    setActiveTab
  } = useApp();

  const availableSkills = ['SQL', 'Spring Boot', 'Docker', 'AWS', 'System Design', 'React.js'];

  const [selectedSkill, setSelectedSkill] = useState<string>('SQL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Basic' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Filter questions for the selected skill and difficulty
  const questions: AssessmentQuestion[] = ASSESSMENT_QUESTIONS.filter(
    q => q.skill.toLowerCase() === selectedSkill.toLowerCase()
  );

  // Fallback if no questions in bank
  const activeQuestions = questions.length > 0 ? questions : [
    {
      id: 'mock-1',
      skill: selectedSkill,
      difficulty: selectedDifficulty,
      question: `Which of the following is considered a best practice when working with ${selectedSkill}?`,
      options: [
        'Hardcode all environment secrets directly in the source code.',
        `Adhere to modular design, proper error handling, and clean documentation for ${selectedSkill}.`,
        'Disable all automated tests to increase delivery speed.',
        'Never use version control systems.'
      ],
      correctAnswerIndex: 1,
      explanation: `Robust engineering in ${selectedSkill} requires adherence to security, isolation, and automated testing.`
    }
  ];

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }));
  };

  const handleFinishQuiz = () => {
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / activeQuestions.length) * 100);
    setQuizScore(scorePct);
    setIsSubmitted(true);

    let level: ProficiencyLevel = 'Beginner';
    if (scorePct >= 80) level = 'Proficient';
    else if (scorePct >= 50) level = 'Intermediate';

    recordAssessmentResult({
      skill: selectedSkill,
      difficulty: selectedDifficulty,
      score: scorePct,
      totalQuestions: activeQuestions.length,
      correctCount: correct,
      proficiencyResult: level,
      passed: scorePct >= 60
    });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">AI Skill Assessment</h2>
        <p className="text-xs text-slate-500">
          Verify your practical competency through skill-specific technical evaluations and earn verified credential badges.
        </p>
      </div>

      {/* Skill & Difficulty Configuration Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Skill:</label>
          <div className="flex flex-wrap gap-1.5">
            {availableSkills.map(skill => {
              const isSelected = skill === selectedSkill;
              return (
                <button
                  key={skill}
                  onClick={() => {
                    setSelectedSkill(skill);
                    handleResetQuiz();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value as 'Basic' | 'Intermediate' | 'Advanced');
              handleResetQuiz();
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            <option value="Basic">Basic (Foundational)</option>
            <option value="Intermediate">Intermediate (Industry standard)</option>
            <option value="Advanced">Advanced (Architectural)</option>
          </select>
        </div>
      </div>

      {/* Main Quiz Area */}
      {!isSubmitted ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                · {currentQ.skill} ({currentQ.difficulty})
              </span>
            </div>

            <span className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} answered
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto">
                {currentQ.codeSnippet}
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 text-indigo-950 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 border border-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="py-2 px-4 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                  className="py-2 px-5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                  Submit & Evaluate
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Review Panel matching Chapter 3.3.9 */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          {/* Result Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Assessment Results
              </span>
              <h3 className="text-2xl font-black">
                {quizScore >= 60 ? 'Skill Assessment Passed!' : 'Needs Further Practice'}
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                {quizScore >= 60
                  ? `Congratulations! Your knowledge in ${selectedSkill} has been verified and your profile readiness score has been updated.`
                  : `You scored ${quizScore}%. Review the explanations below and practice the recommended tasks in your roadmap.`}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-3xl font-black text-emerald-400">{quizScore}%</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">Score</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-sm font-bold text-indigo-300">
                  {quizScore >= 80 ? 'Proficient' : quizScore >= 50 ? 'Intermediate' : 'Beginner'}
                </div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">Level</div>
              </div>
            </div>
          </div>

          {/* Question Breakdown Review */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Detailed Answer Review & Explanations:</h4>
            {activeQuestions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-900">
                      Q{idx + 1}. {q.question}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1 mb-3">
                    <div>Your answer: <span className="font-semibold">{q.options[userAnswer] || 'Not answered'}</span></div>
                    {!isCorrect && (
                      <div className="text-emerald-700 font-semibold">
                        Correct answer: {q.options[q.correctAnswerIndex]}
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200 text-xs text-slate-600">
                    <span className="font-bold text-slate-700">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handleResetQuiz}
              className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('learning-roadmap')}
                className="py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Return to Roadmap</span>
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>View Updated Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prior Assessment History */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Completed Skill Verifications ({assessmentSubmissions.length})
        </h4>

        <div className="divide-y divide-slate-100">
          {assessmentSubmissions.map(sub => (
            <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900">{sub.skill}</span>
                  <span className="text-slate-400 ml-2">({sub.difficulty})</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-700">{sub.proficiencyResult}</span>
                <span className="font-extrabold text-indigo-600">{sub.score}%</span>
                <span className="text-slate-400">{sub.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
