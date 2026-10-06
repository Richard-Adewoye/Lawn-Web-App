'use client';

import { useState, useEffect } from 'react';

export interface TrackerStatus {
  step: 'en-route' | 'on-site' | 'completed';
  technician: string;
  vehicle: string;
  etaMinutes: number;
  progressPercent: number;
  currentAddress: string;
  lawnCutHeight: string;
  weatherCondition: string;
}

export function useScheduleTracker() {
  const [status, setStatus] = useState<TrackerStatus>({
    step: 'on-site',
    technician: 'Dave & Kyle (Crew #2)',
    vehicle: 'LawnBuster Ford F-250 #04',
    etaMinutes: 0,
    progressPercent: 68,
    currentAddress: '42 Lakeshore Drive, Sylvan Lake',
    lawnCutHeight: '2.75" Mulch Cut',
    weatherCondition: 'Sunny 21°C · Dry Turf',
  });

  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setStatus((prev) => {
        const nextProgress = prev.progressPercent + 2;
        if (nextProgress >= 100) {
          return {
            ...prev,
            step: 'completed',
            progressPercent: 100,
            etaMinutes: 0,
          };
        }
        return {
          ...prev,
          progressPercent: nextProgress,
        };
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  const resetTracker = () => {
    setStatus({
      step: 'en-route',
      technician: 'Dave & Kyle (Crew #2)',
      vehicle: 'LawnBuster Ford F-250 #04',
      etaMinutes: 12,
      progressPercent: 20,
      currentAddress: '42 Lakeshore Drive, Sylvan Lake',
      lawnCutHeight: '2.75" Mulch Cut',
      weatherCondition: 'Sunny 21°C · Dry Turf',
    });
    setIsSimulating(true);
  };

  return {
    status,
    isSimulating,
    toggleSimulation,
    resetTracker,
  };
}
