"use client";

import styles from "./Interactive.module.css";

type PlaybackControlsProps = {
  currentStep: number;
  stepCount: number;
  isPlaying: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onTogglePlay: () => void;
  playDisabled?: boolean;
  labels?: string[];
};

export function PlaybackControls({
  currentStep,
  stepCount,
  isPlaying,
  onNext,
  onPrevious,
  onTogglePlay,
  playDisabled = false,
  labels,
}: PlaybackControlsProps) {
  const stepLabel = labels?.[currentStep];

  return (
    <div className={styles.playback}>
      <div className={styles.playbackButtons}>
        <button
          className={styles.button}
          disabled={currentStep <= 0}
          onClick={onPrevious}
          type="button"
        >
          Back
        </button>
        <button
          className={styles.button}
          disabled={playDisabled}
          onClick={onTogglePlay}
          type="button"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className={styles.button}
          disabled={currentStep >= stepCount - 1}
          onClick={onNext}
          type="button"
        >
          Next
        </button>
      </div>
      <p className={styles.status}>
        Step {currentStep + 1} of {stepCount}
        {stepLabel ? `: ${stepLabel}` : ""}
      </p>
    </div>
  );
}
