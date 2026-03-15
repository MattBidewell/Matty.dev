"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type UsePlaybackOptions = {
  stepCount: number;
  intervalMs?: number;
  initialStep?: number;
};

export function usePlayback({
  stepCount,
  intervalMs = 1500,
  initialStep = 0,
}: UsePlaybackOptions) {
  const prefersReducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastStep = Math.max(stepCount - 1, 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || currentStep >= lastStep) {
      if (currentStep >= lastStep) {
        setIsPlaying(false);
      }

      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentStep((step) => Math.min(step + 1, lastStep));
    }, intervalMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentStep, intervalMs, isPlaying, lastStep, prefersReducedMotion]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(Math.min(Math.max(step, 0), lastStep));
    },
    [lastStep]
  );

  const next = useCallback(() => {
    setCurrentStep((step) => Math.min(step + 1, lastStep));
  }, [lastStep]);

  const previous = useCallback(() => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }, []);

  const togglePlay = useCallback(() => {
    if (prefersReducedMotion) {
      return;
    }

    setIsPlaying((playing) => {
      if (playing) {
        return false;
      }

      if (currentStep >= lastStep) {
        setCurrentStep(0);
      }

      return true;
    });
  }, [currentStep, lastStep, prefersReducedMotion]);

  return {
    currentStep,
    goToStep,
    isPlaying,
    next,
    pause,
    prefersReducedMotion,
    previous,
    togglePlay,
  };
}
