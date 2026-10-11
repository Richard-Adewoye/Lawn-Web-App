'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';
import { UserProgressData } from '@/types/curriculum';
import { PROGRESSIVE_CURRICULUM } from '@/data/progressiveCurriculum';

const STORAGE_KEY = 'lawn_buster_curriculum_progress_v1';

const DEFAULT_PROGRESS: UserProgressData = {
  completedModules: [],
  completedChallenges: [],
  quizScores: {},
  lastPhaseId: PROGRESSIVE_CURRICULUM[0]?.id || 'phase-1-beginner',
  lastModuleId: PROGRESSIVE_CURRICULUM[0]?.modules[0]?.id || 'p1-m1-jsx',
  totalXp: 0,
};

let memoryProgress: UserProgressData = DEFAULT_PROGRESS;
let listeners: Array<() => void> = [];
let isLoadedFromStorage = false;

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function getClientSnapshot(): UserProgressData {
  if (typeof window !== 'undefined' && !isLoadedFromStorage) {
    isLoadedFromStorage = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        memoryProgress = {
          ...DEFAULT_PROGRESS,
          ...JSON.parse(saved),
        };
      }
    } catch {
      // ignore
    }
  }
  return memoryProgress;
}

function getServerSnapshot(): UserProgressData {
  return DEFAULT_PROGRESS;
}

function updateProgress(updater: (prev: UserProgressData) => UserProgressData) {
  memoryProgress = updater(memoryProgress);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryProgress));
    } catch {
      // ignore
    }
  }
  notify();
}

export function useCurriculumProgress() {
  const progress = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  // Toggle module completed
  const toggleModuleComplete = useCallback((moduleId: string) => {
    updateProgress((prev) => {
      const alreadyDone = prev.completedModules.includes(moduleId);
      const nextCompleted = alreadyDone
        ? prev.completedModules.filter((id) => id !== moduleId)
        : [...prev.completedModules, moduleId];

      const nextXp = alreadyDone
        ? Math.max(0, prev.totalXp - 50)
        : prev.totalXp + 50;

      return {
        ...prev,
        completedModules: nextCompleted,
        totalXp: nextXp,
      };
    });
  }, []);

  // Mark challenge solved
  const markChallengeSolved = useCallback((challengeId: string) => {
    updateProgress((prev) => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
        totalXp: prev.totalXp + 100,
      };
    });
  }, []);

  // Record quiz score
  const saveQuizScore = useCallback((quizId: string, score: number, total: number) => {
    updateProgress((prev) => {
      const passed = score >= Math.ceil(total * 0.7);
      const prevQuiz = prev.quizScores[quizId];
      const xpDelta = !prevQuiz?.passed && passed ? 80 : 20;

      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [quizId]: { score, total, passed },
        },
        totalXp: prev.totalXp + xpDelta,
      };
    });
  }, []);

  // Save last visited location so user can resume seamlessly
  const setLastLocation = useCallback((phaseId: string, moduleId: string) => {
    updateProgress((prev) => {
      if (prev.lastPhaseId === phaseId && prev.lastModuleId === moduleId) return prev;
      return {
        ...prev,
        lastPhaseId: phaseId,
        lastModuleId: moduleId,
      };
    });
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    updateProgress(() => DEFAULT_PROGRESS);
  }, []);

  // Compute stats
  const totalModulesCount = useMemo(
    () => PROGRESSIVE_CURRICULUM.reduce((sum, phase) => sum + phase.modules.length, 0),
    []
  );

  const completedModulesCount = progress.completedModules.length;

  const overallPercentage = useMemo(() => {
    if (totalModulesCount === 0) return 0;
    return Math.min(100, Math.round((completedModulesCount / totalModulesCount) * 100));
  }, [completedModulesCount, totalModulesCount]);

  const phaseProgressMap = useMemo(() => {
    const map: Record<
      string,
      { completed: number; total: number; percentage: number; isCompleted: boolean }
    > = {};

    PROGRESSIVE_CURRICULUM.forEach((phase) => {
      const total = phase.modules.length;
      const completed = phase.modules.filter((m) =>
        progress.completedModules.includes(m.id)
      ).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      map[phase.id] = {
        completed,
        total,
        percentage,
        isCompleted: total > 0 && completed === total,
      };
    });

    return map;
  }, [progress.completedModules]);

  return {
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
  };
}
