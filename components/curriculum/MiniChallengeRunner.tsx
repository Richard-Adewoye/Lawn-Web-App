'use client';

import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Code2,
  Trophy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MiniChallenge } from '@/types/curriculum';

interface MiniChallengeRunnerProps {
  challenge: MiniChallenge;
  onChallengePassed: (challengeId: string) => void;
  isPassed: boolean;
}

export function MiniChallengeRunner({
  challenge,
  onChallengePassed,
  isPassed,
}: MiniChallengeRunnerProps) {
  const [userCode, setUserCode] = useState(challenge.starterCode);
  const [testResults, setTestResults] = useState<
    { description: string; passed: boolean; message: string }[] | null
  >(null);
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleRunTests = () => {
    const results = challenge.testCases.map((tc) => {
      const outcome = tc.validate(userCode);
      return {
        description: tc.description,
        passed: outcome.passed,
        message: outcome.message,
      };
    });

    setTestResults(results);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      onChallengePassed(challenge.id);
    }
  };

  const handleReset = () => {
    setUserCode(challenge.starterCode);
    setTestResults(null);
    setShowSolution(false);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg space-y-4">
      {/* Challenge Header */}
      <div className="px-5 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">{challenge.title}</h4>
            <span className="text-[10px] text-neutral-400">
              Interactive Hands-on Code Verification
            </span>
          </div>
        </div>

        {isPassed && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-full animate-in zoom-in-95">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed (+100 XP)</span>
          </div>
        )}
      </div>

      <div className="px-5 space-y-4">
        {/* Instructions */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed">
          <strong className="text-amber-400 block mb-1">Challenge Instructions:</strong>
          {challenge.instructions}
        </div>

        {/* Code Editor */}
        <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
          <div className="px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>solution.tsx</span>
            </div>
            <button
              onClick={handleReset}
              className="hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            rows={10}
            spellCheck={false}
            className="w-full p-4 bg-neutral-950 text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-emerald-900 selection:text-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunTests}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run Tests & Verify</span>
            </button>

            <button
              onClick={() =>
                setActiveHintIndex((prev) => (prev + 1) % challenge.hints.length)
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Hint ({activeHintIndex + 1}/{challenge.hints.length})</span>
            </button>
          </div>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-xs font-semibold text-neutral-400 hover:text-white underline cursor-pointer"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution Code'}
          </button>
        </div>

        {/* Current Hint Display */}
        <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-300/90">
          <strong>💡 Hint {activeHintIndex + 1}:</strong> {challenge.hints[activeHintIndex]}
        </div>

        {/* Solution Drawer */}
        {showSolution && (
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 text-xs animate-in fade-in">
            <strong className="text-emerald-400 block">Expert Solution Walkthrough:</strong>
            <p className="text-neutral-400 text-[11px]">{challenge.explanation}</p>
            <pre className="p-3 rounded-lg bg-neutral-900 font-mono text-emerald-300 text-[11px] overflow-x-auto">
              <code>{challenge.solutionCode}</code>
            </pre>
          </div>
        )}

        {/* Test Case Results */}
        {testResults && (
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
              Automated Test Results:
            </span>
            {testResults.map((result, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border flex items-start gap-2.5 text-xs ${
                  result.passed
                    ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                    : 'bg-red-950/40 border-red-700/60 text-red-200'
                }`}
              >
                {result.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block">{result.description}</span>
                  {!result.passed && (
                    <span className="text-[11px] opacity-80 mt-0.5 block">
                      {result.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-neutral-950/60 border-t border-neutral-800/80 text-[11px] text-neutral-500 px-5">
        Verification runs against React parsing rules, AST patterns, and prop contracts.
      </div>
    </div>
  );
}
