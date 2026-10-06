'use client';

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Code2,
  CheckCircle2,
  HelpCircle,
  FolderTree,
  Sparkles,
  Layers,
  ChevronRight,
  Flame,
  Zap,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { EDUCATIONAL_CURRICULUM } from '@/data/content';
import { EducationalModule } from '@/types';

interface ReactEducatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeInspector: boolean;
  onToggleInspector: () => void;
}

export function ReactEducatorPanel({
  isOpen,
  onClose,
  activeInspector,
  onToggleInspector,
}: ReactEducatorPanelProps) {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(EDUCATIONAL_CURRICULUM[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'curriculum' | 'architecture' | 'quiz'>('curriculum');

  if (!isOpen) return null;

  const currentModule =
    EDUCATIONAL_CURRICULUM.find((m) => m.id === selectedModuleId) || EDUCATIONAL_CURRICULUM[0];

  const handleSelectQuizOption = (moduleId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [moduleId]: optionIdx }));
    setShowExplanation((prev) => ({ ...prev, [moduleId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl sm:max-w-3xl bg-neutral-950 text-white h-full shadow-2xl flex flex-col border-l border-neutral-800 animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  React Masterclass Companion
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  Beginner → Architect
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Principal Engineer Architecture Guide & Interactive Curriculum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Inspector Mode Button */}
            <button
              onClick={onToggleInspector}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                activeInspector
                  ? 'bg-amber-400 text-neutral-950 border-amber-300'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Inspector: {activeInspector ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close masterclass panel"
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Modules</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Architecture & File Tree</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Checks</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {/* Module Selector Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EDUCATIONAL_CURRICULUM.map((module) => {
                  const isSelected = module.id === selectedModuleId;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setSelectedModuleId(module.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                        <span className="text-emerald-400">{module.level}</span>
                        {userAnswers[module.id] !== undefined && (
                          <span className="text-amber-400">★ Completed</span>
                        )}
                      </div>
                      <div className="text-xs font-semibold truncate text-white">{module.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Module Details */}
              <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
                      Level: {currentModule.level}
                    </span>
                    <span className="text-xs text-neutral-500">
                      Applied in: <strong className="text-neutral-300">{currentModule.appliedInComponent}</strong>
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{currentModule.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    {currentModule.description}
                  </p>
                </div>

                {/* Core Architectural Concepts */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Key Engineering Concepts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentModule.concepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 flex items-start gap-2"
                      >
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Snippet Walkthrough */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    Production Pattern & Code Architecture
                  </h4>
                  <div className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                    <div className="bg-neutral-900/80 px-4 py-1.5 border-b border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                      <span>TypeScript / React Implementation</span>
                      <span className="text-emerald-400 text-[10px]">Production Grade</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{currentModule.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Principal Engineer Deep-Dive */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-xs leading-relaxed space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Principal Engineer Architecture Note:
                  </div>
                  <p className="text-neutral-300">{currentModule.deepDiveExplanation}</p>
                </div>

                {/* Module Quiz */}
                <div className="pt-3 border-t border-neutral-800">
                  <div className="text-xs font-bold text-neutral-300 mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Quick Knowledge Check:
                  </div>
                  <p className="text-xs text-white mb-3 font-medium">
                    {currentModule.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {currentModule.quiz.options.map((option, optIdx) => {
                      const isChosen = userAnswers[currentModule.id] === optIdx;
                      const isCorrect = optIdx === currentModule.quiz.correctIndex;
                      const hasAnswered = userAnswers[currentModule.id] !== undefined;

                      let btnStyle = 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700';
                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-red-950 border-red-500 text-red-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(currentModule.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono text-neutral-500">{optIdx + 1}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation[currentModule.id] && (
                    <div className="mt-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 animate-in fade-in">
                      <strong className="text-emerald-400 block mb-0.5">Explanation:</strong>
                      {currentModule.quiz.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-emerald-400" />
                  Application Architecture Tree
                </h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, and clean state separation.
                </p>

                <div className="font-mono text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-neutral-300 space-y-1.5 overflow-x-auto">
                  <div className="text-emerald-400 font-bold">/ (Workspace Root)</div>
                  <div>├── app/</div>
                  <div>│   ├── layout.tsx         <span className="text-neutral-500">{'# Server Component: Root HTML, SEO & Google Fonts'}</span></div>
                  <div>│   ├── page.tsx           <span className="text-neutral-500">{'# Server Component: Page coordinator'}</span></div>
                  <div>│   └── globals.css        <span className="text-neutral-500">{'# Tailwind CSS v4 styling & typography rules'}</span></div>
                  <div>├── components/</div>
                  <div>│   ├── LawnBusterApp.tsx  <span className="text-neutral-500">{'# Client Coordinator with state & modal management'}</span></div>
                  <div>│   ├── Navbar.tsx         <span className="text-neutral-500">{'# Brand logo, nav pill, phone badge & Free Quote CTA'}</span></div>
                  <div>│   ├── Hero.tsx           <span className="text-neutral-500">{'# Dark green showcase card, worker background, 2K+ card'}</span></div>
                  <div>│   ├── Partners.tsx       <span className="text-neutral-500">{'# Commercial SVG logos (Chinooks Edge, Westerner, etc.)'}</span></div>
                  <div>│   ├── AboutSection.tsx   <span className="text-neutral-500">{'# Mower photo card, social links, narrative & stats'}</span></div>
                  <div>│   ├── ServicesSection.tsx<span className="text-neutral-500">{'# Horizontal slider, Power Raking, Fertilizing, Snow'}</span></div>
                  <div>│   ├── ProcessSection.tsx <span className="text-neutral-500">{'# Bento grid steps: Free Assessment, GPS Radar, Guarantee'}</span></div>
                  <div>│   ├── QuoteModal.tsx     <span className="text-neutral-500">{'# Instant lot calculator with 5% AB GST derived state'}</span></div>
                  <div>│   ├── ServiceDetailModal.tsx <span className="text-neutral-500">{'# Service breakdowns, timings & equipment'}</span></div>
                  <div>│   ├── VideoModal.tsx     <span className="text-neutral-500">{'# Yard transformation showcase clip'}</span></div>
                  <div>│   ├── ReactEducatorPanel.tsx <span className="text-neutral-500">{'# Technical Educator Masterclass & Code Inspector'}</span></div>
                  <div>│   └── Footer.tsx         <span className="text-neutral-500">{'# Local Alberta coverage, seasonal hours & links'}</span></div>
                  <div>├── hooks/</div>
                  <div>│   ├── useQuoteEstimator.ts <span className="text-neutral-500">{'# Headless formula calculations for yard pricing'}</span></div>
                  <div>│   └── useScheduleTracker.ts<span className="text-neutral-500">{'# Real-time simulated GPS technician dispatch'}</span></div>
                  <div>├── data/</div>
                  <div>│   └── content.ts         <span className="text-neutral-500">{'# Services database & 6-Module React curriculum'}</span></div>
                  <div>└── types/</div>
                  <div>    └── index.ts           <span className="text-neutral-500">{'# Type contracts for services, forms & modules'}</span></div>
                </div>
              </div>

              {/* Data Flow Blueprint */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Unidirectional Data Flow & State Lifecycle
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <strong className="text-emerald-400 block mb-1">1. Static Truth</strong>
                    <span className="text-neutral-400">
                      Typed arrays in `content.ts` supply read-only catalogs without network lag or layout shift.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <strong className="text-emerald-400 block mb-1">2. Custom Hooks</strong>
                    <span className="text-neutral-400">
                      `useQuoteEstimator` & `useScheduleTracker` encapsulate mathematical formulas and timer subscriptions.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <strong className="text-emerald-400 block mb-1">3. Presentation Leaves</strong>
                    <span className="text-neutral-400">
                      Components render pure UI and forward clicks to parent handlers via callback props.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">React Mastery Assessment</h3>
                  <p className="text-xs text-neutral-400">Test your comprehension across all 6 modules.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Progress</span>
                  <span className="text-base font-black text-emerald-400">
                    {Object.keys(userAnswers).length} / {EDUCATIONAL_CURRICULUM.length} Completed
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {EDUCATIONAL_CURRICULUM.map((module, i) => (
                  <div key={module.id} className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">Question {i + 1} ({module.level})</span>
                      {userAnswers[module.id] !== undefined && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Answered
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white">{module.quiz.question}</p>

                    <div className="space-y-1.5">
                      {module.quiz.options.map((opt, optIdx) => {
                        const isChosen = userAnswers[module.id] === optIdx;
                        const isCorrect = optIdx === module.quiz.correctIndex;
                        const hasAnswered = userAnswers[module.id] !== undefined;

                        let style = 'bg-neutral-950 border-neutral-800 text-neutral-300';
                        if (hasAnswered) {
                          if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          else if (isChosen) style = 'bg-red-950 border-red-500 text-red-200';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(module.id, optIdx)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-start gap-2 cursor-pointer ${style}`}
                          >
                            <span className="font-mono text-neutral-500">{optIdx + 1}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
