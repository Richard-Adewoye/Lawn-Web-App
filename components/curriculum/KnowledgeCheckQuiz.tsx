'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { KnowledgeCheckQuiz as IQuiz, KnowledgeCheckQuestion } from '@/types/curriculum';

interface KnowledgeCheckQuizProps {
  quiz?: IQuiz;
  moduleId: string;
  moduleTitle: string;
  onQuizCompleted: (quizId: string, score: number, total: number) => void;
  savedScore?: { score: number; total: number; passed: boolean };
  isDarkMode?: boolean;
}

// Fallback high-yield questions for any module
const MODULE_QUIZ_FALLBACKS: Record<string, KnowledgeCheckQuestion[]> = {
  default: [
    {
      id: 'q-default-1',
      question: 'Why does React enforce unidirectional data flow from parent to child components?',
      options: [
        'To speed up CSS styling calculations in the browser rendering engine',
        'To make state mutations predictable and ensure a single traceable source of truth',
        'Because JavaScript functions cannot accept arguments',
        'To force applications to declare everything in global state',
      ],
      correctIndex: 1,
      explanation:
        'Unidirectional data flow ensures that state transitions are predictable and trace back to a single component origin, preventing hard-to-debug circular update cascades.',
    },
    {
      id: 'q-default-2',
      question: 'When should you choose a local component state (useState) over a React Context?',
      options: [
        'When the state is only relevant to that component or its immediate children',
        'When the data needs to be accessed by 20 disconnected components across routes',
        'Never; all data must always be stored in Context',
        'Only when the component is rendered on the server',
      ],
      correctIndex: 0,
      explanation:
        'Colocating state as close as possible to where it is used avoids unnecessary re-renders of the root application tree.',
    },
  ],
  'p1-m1-jsx': [
    {
      id: 'q-jsx-1',
      question: 'What does JSX compile to under the hood before running in the browser?',
      options: [
        'Raw HTML template strings evaluated by innerHTML',
        'React.createElement JavaScript function calls',
        'WebAssembly binary instructions',
        'CSS-in-JS style rules',
      ],
      correctIndex: 1,
      explanation:
        'JSX is syntactic sugar. Transpilers like Babel or SWC compile JSX tags directly into React.createElement (or jsxRuntime) calls.',
    },
    {
      id: 'q-jsx-2',
      question: 'Which of the following expressions is VALID inside JSX curly braces { }?',
      options: [
        'if (isSpring) { return "Ready"; }',
        'for (let i = 0; i < 5; i++) { ... }',
        'isSpring ? "Available for Spring" : "Summer Waitlist"',
        'let price = 89;',
      ],
      correctIndex: 2,
      explanation:
        'Only JavaScript expressions (which evaluate to a single value, such as a ternary or function call) can be placed inside { }; statements like if or for are invalid.',
    },
  ],
  'p1-m2-components-props': [
    {
      id: 'q-props-1',
      question: 'Are React props mutable inside the receiving child component?',
      options: [
        'Yes, you can directly reassign props.price = 99 to update the price',
        'No, props are strictly read-only and pure with respect to the component',
        'Only if the prop is an array or object',
        'Yes, but only inside useEffect',
      ],
      correctIndex: 1,
      explanation:
        'React components must be pure functions with respect to their props. Directly mutating props breaks change-detection and leads to desynchronized state.',
    },
    {
      id: 'q-props-2',
      question: 'What is the primary benefit of the special "children" prop in React?',
      options: [
        'It speeds up JavaScript Garbage Collection',
        'It enables generic slot composition so parents can project arbitrary JSX into a container',
        'It automatically installs third-party npm packages',
        'It prevents the component from re-rendering',
      ],
      correctIndex: 1,
      explanation:
        'The children prop enables flexible component composition, allowing wrappers like Card, Modal, or Layout to surround arbitrary nested content.',
    },
  ],
  'p1-m3-state': [
    {
      id: 'q-state-1',
      question: 'If you call setCount(count + 1) three consecutive times in an event handler, why does count only increase by 1?',
      options: [
        'React limits state changes to 1 per second',
        'All three calls close over the exact same initial state snapshot before the re-render batches',
        'It is a bug in the JavaScript V8 engine',
        'Because useState only works once per component',
      ],
      correctIndex: 1,
      explanation:
        'State in a render is a snapshot. When you call setCount(count + 1) 3x, all three calls evaluate the same snapshot value (e.g. 0 + 1). Use the functional updater setCount(prev => prev + 1) to queue sequential transitions.',
    },
  ],
  'p2-m1-useeffect': [
    {
      id: 'q-effects-1',
      question: 'When does the cleanup function returned from useEffect execute?',
      options: [
        'Only when the browser window closes',
        'Before the effect re-runs with new dependencies, and when the component unmounts',
        'Immediately before the component renders JSX',
        'Never; cleanup is optional and ignored by React',
      ],
      correctIndex: 1,
      explanation:
        'React calls your cleanup function before applying the next effect run, and right before removing the component from the DOM, ensuring intervals and subscriptions are cancelled cleanly.',
    },
  ],
  'p4-m1-data-fetching': [
    {
      id: 'q-fetch-1',
      question: 'What problem does AbortController solve during rapid user queries?',
      options: [
        'It increases internet connection bandwidth',
        'It cancels obsolete in-flight HTTP requests to prevent asynchronous race conditions',
        'It compresses JSON payloads automatically',
        'It turns HTTP into WebSockets',
      ],
      correctIndex: 1,
      explanation:
        'AbortController cancels superseded in-flight network requests so older slower responses do not overwrite newer user search queries.',
    },
  ],
};

export function KnowledgeCheckQuiz({
  quiz,
  moduleId,
  moduleTitle,
  onQuizCompleted,
  savedScore,
  isDarkMode = true,
}: KnowledgeCheckQuizProps) {
  const questions: KnowledgeCheckQuestion[] =
    quiz?.questions ||
    MODULE_QUIZ_FALLBACKS[moduleId] ||
    MODULE_QUIZ_FALLBACKS.default;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(Boolean(savedScore));
  const [activeScore, setActiveScore] = useState<number>(savedScore?.score || 0);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCheckAnswers = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setActiveScore(correctCount);
    setIsSubmitted(true);
    onQuizCompleted(quiz?.id || `quiz-${moduleId}`, correctCount, questions.length);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const percentage = Math.round((activeScore / questions.length) * 100);
  const isPassed = activeScore >= Math.ceil(questions.length * 0.7);

  return (
    <div
      className={`p-5 sm:p-7 rounded-2xl border space-y-6 ${
        isDarkMode
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
          : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
      }`}
    >
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black">
              Knowledge Check: {quiz?.title || `Module Mastery Quiz`}
            </h3>
            <span className="text-xs text-neutral-400">
              {questions.length} Concepts · Tests Understanding &amp; Mental Models
            </span>
          </div>
        </div>

        {isSubmitted && (
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              isPassed
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Score: {activeScore} / {questions.length} ({percentage}%) · {isPassed ? 'Passed! (+80 XP)' : 'Review & Retake'}
            </span>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-neutral-950/60 border-neutral-800/90' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-neutral-800 text-neutral-300">
                  Q{qIndex + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-100 flex-1 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optionStyle = isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-950/50 border-red-500 text-red-200';
                    }
                  } else if (isSelected) {
                    optionStyle = isDarkMode
                      ? 'bg-emerald-950/40 border-emerald-500 text-white font-semibold'
                      : 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>

                      {isSubmitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner (Shows after submission) */}
              {isSubmitted && (
                <div
                  className={`p-3 rounded-xl text-xs space-y-1 ${
                    isCorrect
                      ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200'
                      : 'bg-amber-950/40 border border-amber-800/60 text-amber-200'
                  }`}
                >
                  <strong className="block text-[11px] font-bold">
                    {isCorrect ? '✓ Correct Answer!' : 'Explanation:'}
                  </strong>
                  <p className="text-[11px] leading-relaxed text-neutral-300">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Footer Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800">
        <span className="text-xs text-neutral-400">
          {Object.keys(selectedAnswers).length} of {questions.length} questions answered
        </span>

        <div className="flex items-center gap-2">
          {isSubmitted ? (
            <button
              onClick={handleRetake}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleCheckAnswers}
              disabled={!allAnswered}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Check Answers &amp; Grade</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
