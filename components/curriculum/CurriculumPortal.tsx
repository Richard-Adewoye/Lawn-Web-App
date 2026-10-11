'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  BookOpen,
  Code2,
  Trophy,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  ExternalLink,
  Sun,
  Moon,
  Search,
  Check,
  HelpCircle,
  Filter,
  CheckSquare,
  Square,
  Award,
} from 'lucide-react';
import { PROGRESSIVE_CURRICULUM } from '@/data/progressiveCurriculum';
import { InteractivePlayground } from './InteractivePlayground';
import { MiniChallengeRunner } from './MiniChallengeRunner';
import { LiveCodeSandbox } from './LiveCodeSandbox';
import { KnowledgeCheckQuiz } from './KnowledgeCheckQuiz';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { CurriculumPhase, CurriculumModule } from '@/types/curriculum';

interface CurriculumPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectComponent?: (componentName: string) => void;
}

let themeMemorySnapshot = 'dark';
let themeListeners: Array<() => void> = [];
let hasLoadedThemeFromStorage = false;

function subscribeTheme(listener: () => void) {
  themeListeners.push(listener);
  return () => {
    themeListeners = themeListeners.filter((l) => l !== listener);
  };
}

function getThemeClientSnapshot(): string {
  if (typeof window !== 'undefined' && !hasLoadedThemeFromStorage) {
    hasLoadedThemeFromStorage = true;
    try {
      const saved = localStorage.getItem('lawn_buster_academy_theme');
      if (saved) themeMemorySnapshot = saved;
    } catch {
      // ignore
    }
  }
  return themeMemorySnapshot;
}

function getThemeServerSnapshot(): string {
  return 'dark';
}

export function CurriculumPortal({ isOpen, onClose, onInspectComponent }: CurriculumPortalProps) {
  const {
    progress,
    toggleModuleComplete,
    markChallengeSolved,
    saveQuizScore,
    setLastLocation,
    resetProgress,
    totalModulesCount,
    completedModulesCount,
    overallPercentage,
    phaseProgressMap,
  } = useCurriculumProgress();

  // Active navigation selection
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(
    progress.lastPhaseId || PROGRESSIVE_CURRICULUM[0].id
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    progress.lastModuleId || PROGRESSIVE_CURRICULUM[0].modules[0].id
  );

  // Subtabs: theory | lab | sandbox | quiz | challenge
  const [activeSubTab, setActiveSubTab] = useState<
    'theory' | 'lab' | 'sandbox' | 'quiz' | 'challenge'
  >('theory');

  // Search & Navigator filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  // Light / Dark mode via useSyncExternalStore
  const currentTheme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeClientSnapshot,
    getThemeServerSnapshot
  );
  const isDarkMode = currentTheme === 'dark';

  const toggleTheme = () => {
    const next = isDarkMode ? 'light' : 'dark';
    themeMemorySnapshot = next;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lawn_buster_academy_theme', next);
      } catch {
        // ignore
      }
    }
    themeListeners.forEach((l) => l());
  };

  // Confirmation modal for progress reset
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const currentPhase =
    PROGRESSIVE_CURRICULUM.find((p) => p.id === selectedPhaseId) || PROGRESSIVE_CURRICULUM[0];

  const currentModule =
    currentPhase.modules.find((m) => m.id === selectedModuleId) ||
    currentPhase.modules[0] ||
    PROGRESSIVE_CURRICULUM[0].modules[0];

  const isCurrentModuleComplete = progress.completedModules.includes(currentModule.id);
  const isCurrentChallengeSolved = progress.completedChallenges.includes(currentModule.challenge.id);
  const currentQuizScore = progress.quizScores[`quiz-${currentModule.id}`];

  // Filtered module list for the navigator
  const filteredModules = currentPhase.modules.filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.theory.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const isDone = progress.completedModules.includes(mod.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && isDone) ||
      (statusFilter === 'in-progress' && !isDone);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-7xl h-[94vh] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border flex flex-col transition-colors duration-200 ${
          isDarkMode
            ? 'bg-neutral-950 text-neutral-100 border-neutral-800'
            : 'bg-neutral-50 text-neutral-900 border-neutral-200'
        }`}
      >
        {/* 1. Header Bar: Brand, Overall Progress, Theme Toggle & Controls */}
        <div
          className={`px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
            isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
          }`}
        >
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#bef264] text-[#0f2319] flex items-center justify-center font-black shadow-md shrink-0">
              <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  React Progressive Academy
                </h2>
                <span className="hidden md:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  Beginner → Architect
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Principal Frontend Pedagogy · 4 Phases · 19 Modules · Live Code Sandbox
              </p>
            </div>
          </div>

          {/* Progress Tracker & Controls */}
          <div className="flex items-center gap-3">
            {/* Overall Progress Pill */}
            <div
              className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-300'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <div className="text-[11px] font-medium">
                <span>Progress: </span>
                <strong className="text-emerald-500">
                  {completedModulesCount}/{totalModulesCount}
                </strong>
                <span className="text-neutral-400"> ({overallPercentage}%)</span>
              </div>
              <div className="w-16 h-1.5 bg-neutral-700/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-500 font-bold rounded">
                {progress.totalXp} XP
              </span>
            </div>

            {/* Light / Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-amber-300'
                  : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Reset Progress Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              title="Reset Local Progress"
              className={`p-2 rounded-xl border text-[11px] font-semibold transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-800 border-neutral-700 text-neutral-400'
                  : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close Portal Button */}
            <button
              onClick={onClose}
              aria-label="Close Academy Portal"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Top Phase Navigation Tabs */}
        <div
          className={`px-4 sm:px-6 py-2 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
            isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          {PROGRESSIVE_CURRICULUM.map((phase) => {
            const isSelected = phase.id === selectedPhaseId;
            const phaseStats = phaseProgressMap[phase.id];

            return (
              <button
                key={phase.id}
                onClick={() => {
                  setSelectedPhaseId(phase.id);
                  setSelectedModuleId(phase.modules[0].id);
                  setLastLocation(phase.id, phase.modules[0].id);
                  setActiveSubTab('theory');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                    : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected
                      ? 'bg-white'
                      : phaseStats?.isCompleted
                      ? 'bg-emerald-400'
                      : 'bg-neutral-500'
                  }`}
                />
                <span>Phase {phase.phaseNumber}: {phase.badge}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({phaseStats?.completed || 0}/{phase.modules.length})
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Workspace Grid: Navigator Sidebar (Left) & Workspace Canvas (Right) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Module Navigator Tree */}
          <div
            className={`lg:col-span-4 border-r p-4 overflow-y-auto space-y-3.5 flex flex-col ${
              isDarkMode
                ? 'border-neutral-800 bg-neutral-950/80 text-neutral-200'
                : 'border-neutral-200 bg-white text-neutral-800'
            }`}
          >
            {/* Phase Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {currentPhase.title}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-500">
                  {phaseProgressMap[currentPhase.id]?.percentage || 0}% Completed
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                {currentPhase.description}
              </p>
            </div>

            {/* Navigator Search & Filter Bar */}
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
                  isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter modules in this phase..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none w-full text-xs"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  All ({currentPhase.modules.length})
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Completed ({phaseProgressMap[currentPhase.id]?.completed || 0})
                </button>
                <button
                  onClick={() => setStatusFilter('in-progress')}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    statusFilter === 'in-progress'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  In Progress (
                  {currentPhase.modules.length - (phaseProgressMap[currentPhase.id]?.completed || 0)}
                  )
                </button>
              </div>
            </div>

            {/* Modules Tree List */}
            <div className="space-y-2 flex-1">
              {filteredModules.map((mod, idx) => {
                const isSelected = mod.id === selectedModuleId;
                const isDone = progress.completedModules.includes(mod.id);
                const isChallengeDone = progress.completedChallenges.includes(mod.challenge.id);
                const quizScore = progress.quizScores[`quiz-${mod.id}`];

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border transition-all flex flex-col ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-neutral-900 border-emerald-500 text-white shadow-md'
                          : 'bg-emerald-50/60 border-emerald-600 text-neutral-900 shadow-sm'
                        : isDarkMode
                        ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="p-3 flex items-start justify-between gap-2">
                      {/* Checkbox to Mark Completed */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleComplete(mod.id);
                        }}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                        className="mt-0.5 text-neutral-400 hover:text-emerald-500 cursor-pointer shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      {/* Clickable Module Item */}
                      <div
                        onClick={() => {
                          setSelectedModuleId(mod.id);
                          setLastLocation(selectedPhaseId, mod.id);
                          setActiveSubTab('theory');
                        }}
                        className="flex-1 cursor-pointer space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-700'
                            }`}
                          >
                            Module {idx + 1}
                          </span>
                          {isChallengeDone && (
                            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                              ★ Challenge Solved
                            </span>
                          )}
                          {quizScore?.passed && (
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                              ✓ Quiz Passed
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold leading-tight">{mod.title}</div>
                        <div className="text-[10px] text-neutral-500">~{mod.estimatedMinutes} mins</div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-2 ${
                          isSelected ? 'text-emerald-500' : 'text-neutral-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {filteredModules.length === 0 && (
                <div className="text-center py-6 text-xs text-neutral-400">
                  No modules match your search filter.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Workspace Canvas */}
          <div
            className={`lg:col-span-8 flex flex-col overflow-hidden ${
              isDarkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'
            }`}
          >
            {/* Module Canvas Header & Subtab Bar */}
            <div
              className={`p-3.5 sm:p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
                isDarkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              {/* 5 Subtab Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveSubTab('theory')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'theory'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>1. Theory</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('lab')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'lab'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>2. Lab Simulator</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('sandbox')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'sandbox'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>3. Live Code Sandbox</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('quiz')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'quiz'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>4. Knowledge Check</span>
                  {currentQuizScore?.passed && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>

                <button
                  onClick={() => setActiveSubTab('challenge')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubTab === 'challenge'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>5. Mini-Challenge</span>
                  {isCurrentChallengeSolved && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </button>
              </div>

              {/* Quick "Mark Module Complete" Button */}
              <button
                onClick={() => toggleModuleComplete(currentModule.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isCurrentModuleComplete
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                    : isDarkMode
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {isCurrentModuleComplete ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    <span>Mark as Done</span>
                  </>
                )}
              </button>
            </div>

            {/* Subtab Canvas Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* SUBTAB 1: THEORY & MENTAL MODELS */}
              {activeSubTab === 'theory' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Module Title & Summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-500">
                      <span>Phase {currentPhase.phaseNumber}</span>
                      <span>·</span>
                      <span>{currentPhase.badge}</span>
                      <span>·</span>
                      <span>{currentModule.estimatedMinutes} mins</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                      {currentModule.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {currentModule.theory.summary}
                    </p>
                  </div>

                  {/* Core Principles */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-500" />
                      Core Principles &amp; Mental Models
                    </h4>

                    <div className="space-y-3">
                      {currentModule.theory.corePrinciples.map((principle, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border space-y-2 ${
                            isDarkMode
                              ? 'bg-neutral-900 border-neutral-800'
                              : 'bg-white border-neutral-200 shadow-sm'
                          }`}
                        >
                          <h5 className="text-xs sm:text-sm font-bold flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-mono text-[10px]">
                              {idx + 1}
                            </span>
                            {principle.headline}
                          </h5>
                          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                            {principle.body}
                          </p>
                          {principle.pitfall && (
                            <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-800/40 text-[11px] text-red-500 dark:text-red-300 flex items-start gap-2">
                              <span className="font-bold">⚠️ Pitfall:</span>
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
                        <Code2 className="w-4 h-4 text-amber-500" />
                        {ex.title}
                      </h4>
                      <div
                        className={`rounded-2xl overflow-hidden border ${
                          isDarkMode ? 'border-neutral-800 bg-[#0d1117]' : 'border-neutral-200 bg-neutral-900 text-white'
                        }`}
                      >
                        <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                          <code>{ex.code}</code>
                        </pre>
                        <div
                          className={`p-3 border-t text-xs ${
                            isDarkMode
                              ? 'bg-neutral-950 border-neutral-800 text-neutral-400'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          {ex.explanation}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Call to Next Step */}
                  <div
                    className={`pt-4 flex flex-wrap items-center justify-between gap-3 border-t ${
                      isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                    }`}
                  >
                    <span className="text-xs text-neutral-500">
                      Mastered the theory? Step into the hands-on lab or edit code live in the sandbox!
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveSubTab('lab')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>2. Open Lab Simulator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveSubTab('sandbox')}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>3. Live Code Sandbox</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: INTERACTIVE LAB SIMULATOR (19 Specialized Labs) */}
              {activeSubTab === 'lab' && (
                <div className="space-y-6">
                  <InteractivePlayground config={currentModule.playground} />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-neutral-400">
                      Want to edit the raw JSX yourself and preview the output live?
                    </span>
                    <button
                      onClick={() => setActiveSubTab('sandbox')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Open Live Code Sandbox</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SUBTAB 3: LIVE CODE SANDBOX (In-Browser Live JSX Editor & Previewer) */}
              {activeSubTab === 'sandbox' && (
                <div className="space-y-6">
                  <LiveCodeSandbox isDarkMode={isDarkMode} />
                </div>
              )}

              {/* SUBTAB 4: KNOWLEDGE CHECK QUIZ */}
              {activeSubTab === 'quiz' && (
                <div className="space-y-6">
                  <KnowledgeCheckQuiz
                    quiz={currentModule.quiz}
                    moduleId={currentModule.id}
                    moduleTitle={currentModule.title}
                    onQuizCompleted={(quizId, score, total) => saveQuizScore(quizId, score, total)}
                    savedScore={currentQuizScore}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}

              {/* SUBTAB 5: MINI-CHALLENGE (Automated Unit Test Runner) */}
              {activeSubTab === 'challenge' && (
                <div className="space-y-6">
                  <MiniChallengeRunner
                    challenge={currentModule.challenge}
                    onChallengePassed={(challengeId) => markChallengeSolved(challengeId)}
                    isPassed={isCurrentChallengeSolved}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Resetting Progress */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className={`p-6 rounded-2xl max-w-sm w-full border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            <h4 className="text-sm font-black">Reset Local Progress?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This will clear your completed modules, solved challenges, and quiz scores from localStorage. You can restart the curriculum fresh from Module 1.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
