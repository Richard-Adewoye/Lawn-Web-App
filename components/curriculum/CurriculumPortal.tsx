'use client';

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Code2,
  Trophy,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Layers,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PROGRESSIVE_CURRICULUM } from '@/data/progressiveCurriculum';
import { InteractivePlayground } from './InteractivePlayground';
import { MiniChallengeRunner } from './MiniChallengeRunner';
import { CurriculumPhase, CurriculumModule } from '@/types/curriculum';

interface CurriculumPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectComponent?: (componentName: string) => void;
}

export function CurriculumPortal({ isOpen, onClose, onInspectComponent }: CurriculumPortalProps) {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(PROGRESSIVE_CURRICULUM[0].id);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    PROGRESSIVE_CURRICULUM[0].modules[0].id
  );
  const [activeSubTab, setActiveSubTab] = useState<'theory' | 'playground' | 'challenge'>('theory');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentPhase =
    PROGRESSIVE_CURRICULUM.find((p) => p.id === selectedPhaseId) || PROGRESSIVE_CURRICULUM[0];

  const currentModule =
    currentPhase.modules.find((m) => m.id === selectedModuleId) || currentPhase.modules[0];

  const handleChallengePassed = (challengeId: string) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges((prev) => [...prev, challengeId]);
    }
  };

  const totalModulesCount = PROGRESSIVE_CURRICULUM.reduce((acc, p) => acc + p.modules.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-neutral-950 text-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-neutral-800 flex flex-col">
        {/* Portal Header */}
        <div className="p-4 sm:p-6 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#bef264] text-[#0f2319] flex items-center justify-center font-black shadow-md">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  React Progressive Curriculum Academy
                </h2>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Beginner → Architect
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Principal Frontend Engineer Pedagogy · Interactive Code Playgrounds & Automated Test Challenges
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Badge */}
            <div className="hidden md:flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-full border border-neutral-800 text-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-neutral-300">
                Solved: <strong className="text-amber-400">{completedChallenges.length}</strong> / 5 Challenges
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close academy portal"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Distinct Phases Navigation Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PROGRESSIVE_CURRICULUM.map((phase) => {
            const isSelected = phase.id === selectedPhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => {
                  setSelectedPhaseId(phase.id);
                  setSelectedModuleId(phase.modules[0].id);
                  setActiveSubTab('theory');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800/80'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
                <span>Phase {phase.phaseNumber}: {phase.badge}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({phase.modules.length} modules)
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Workspace Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sidebar: Modules in Current Phase */}
          <div className="lg:col-span-4 border-r border-neutral-800 bg-neutral-950/70 p-4 overflow-y-auto space-y-3">
            <div className="mb-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                {currentPhase.title}
              </span>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                {currentPhase.description}
              </p>
            </div>

            <div className="space-y-2">
              {currentPhase.modules.map((mod, idx) => {
                const isSelected = mod.id === selectedModuleId;
                const isChallengeDone = completedChallenges.includes(mod.challenge.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSelectedModuleId(mod.id);
                      setActiveSubTab('theory');
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-neutral-900 border-emerald-500 text-white shadow-md'
                        : 'bg-neutral-900/40 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                          Module {idx + 1}
                        </span>
                        {isChallengeDone && (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Solved
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">{mod.title}</div>
                      <div className="text-[10px] text-neutral-500">~{mod.estimatedMinutes} mins</div>
                    </div>

                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-neutral-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Target Audience Notice */}
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/60 text-[11px] text-neutral-400">
              <strong className="text-neutral-300 block mb-0.5">Target Audience:</strong>
              {currentPhase.targetAudience}
            </div>
          </div>

          {/* Right Main Content Panel: Theory / Playground / Challenge */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden bg-neutral-950">
            {/* Sub-tab Navigation */}
            <div className="p-4 border-b border-neutral-800 bg-neutral-900/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSubTab('theory')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'theory'
                      ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Theory & Core Principles</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('playground')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'playground'
                      ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. Interactive Playground</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('challenge')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'challenge'
                      ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span>3. Mini-Challenge</span>
                  {completedChallenges.includes(currentModule.challenge.id) && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </button>
              </div>

              {/* Real World Component Application Reference */}
              {currentModule.appliedInApp && (
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400">
                  <span>Applied in:</span>
                  <span className="font-mono text-emerald-300 font-bold">
                    {currentModule.appliedInApp.componentName}
                  </span>
                </div>
              )}
            </div>

            {/* Sub-tab Body Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* 1. Theory View */}
              {activeSubTab === 'theory' && (
                <div className="space-y-6 max-w-3xl">
                  {/* Summary */}
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight mb-2">
                      {currentModule.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {currentModule.theory.summary}
                    </p>
                  </div>

                  {/* Core Principles */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      Core Principles & Mental Models
                    </h4>

                    <div className="space-y-3">
                      {currentModule.theory.corePrinciples.map((principle, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2"
                        >
                          <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-950 text-emerald-400 flex items-center justify-center font-mono text-[10px]">
                              {idx + 1}
                            </span>
                            {principle.headline}
                          </h5>
                          <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                            {principle.body}
                          </p>
                          {principle.pitfall && (
                            <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-[11px] text-red-300 flex items-start gap-2">
                              <span className="font-bold text-red-400">⚠️ Common Pitfall:</span>
                              <span>{principle.pitfall}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Examples */}
                  {currentModule.theory.codeExamples.map((ex, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-amber-400" />
                        {ex.title}
                      </h4>
                      <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
                        <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                          <code>{ex.code}</code>
                        </pre>
                        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400">
                          {ex.explanation}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Call to Next Step */}
                  <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                    <span className="text-xs text-neutral-400">
                      Ready to interact with this concept live?
                    </span>
                    <button
                      onClick={() => setActiveSubTab('playground')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Open Interactive Playground</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Interactive Playground View */}
              {activeSubTab === 'playground' && (
                <div className="space-y-6">
                  <InteractivePlayground config={currentModule.playground} />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-neutral-400">
                      Understand the playground? Put your knowledge to the test!
                    </span>
                    <button
                      onClick={() => setActiveSubTab('challenge')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Start Hands-On Challenge</span>
                      <Trophy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Mini Challenge View */}
              {activeSubTab === 'challenge' && (
                <div className="space-y-6">
                  <MiniChallengeRunner
                    challenge={currentModule.challenge}
                    onChallengePassed={handleChallengePassed}
                    isPassed={completedChallenges.includes(currentModule.challenge.id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
