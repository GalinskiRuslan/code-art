"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCENE_COUNT = 3;
const TRANSITION_MS = 1100;
const WHEEL_THRESHOLD = 40;

export type SceneNavigation = {
  sceneIndex: number;
  displaySceneIndex: number;
  isTransitioning: boolean;
  transitionProgress: number;
  fromScene: number;
  toScene: number;
  goToScene: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
};

export function useSceneNavigation(): SceneNavigation {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [transition, setTransition] = useState<{
    from: number;
    to: number;
    progress: number;
  } | null>(null);
  const sceneIndexRef = useRef(sceneIndex);
  const wheelLockRef = useRef(false);
  const touchpadAccumRef = useRef(0);
  const transitionRef = useRef<{
    from: number;
    to: number;
    progress: number;
  } | null>(null);

  useEffect(() => {
    sceneIndexRef.current = sceneIndex;
  }, [sceneIndex]);

  const goToScene = useCallback((nextIndex: number) => {
    const clamped = Math.min(Math.max(nextIndex, 0), SCENE_COUNT - 1);
    const currentSceneIndex = sceneIndexRef.current;

    if (transitionRef.current || clamped === currentSceneIndex) {
      return;
    }

    setTransition({
      from: currentSceneIndex,
      to: clamped,
      progress: 0,
    });
  }, []);

  const goNext = useCallback(() => {
    goToScene(sceneIndexRef.current + 1);
  }, [goToScene]);

  const goPrev = useCallback(() => {
    goToScene(sceneIndexRef.current - 1);
  }, [goToScene]);

  useEffect(() => {
    transitionRef.current = transition;
  }, [transition]);

  const transitionFrom = transition?.from;
  const transitionTo = transition?.to;

  useEffect(() => {
    if (transitionFrom === undefined || transitionTo === undefined) return;

    let frameId = 0;
    const startedAt = performance.now();
    const from = transitionFrom;
    const to = transitionTo;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / TRANSITION_MS, 1);

      setTransition((current) => {
        if (!current || current.from !== from || current.to !== to) {
          return current;
        }

        return {
          ...current,
          progress,
        };
      });

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      const currentTransition = transitionRef.current;

      if (currentTransition && currentTransition.from === from && currentTransition.to === to) {
        setSceneIndex(to);
        setTransition(null);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [transitionFrom, transitionTo]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (wheelLockRef.current || transitionRef.current) {
        return;
      }

      touchpadAccumRef.current += event.deltaY;

      if (Math.abs(touchpadAccumRef.current) < WHEEL_THRESHOLD) {
        return;
      }

      wheelLockRef.current = true;

      if (touchpadAccumRef.current > 0) {
        goNext();
      } else {
        goPrev();
      }

      touchpadAccumRef.current = 0;

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 220);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (transitionRef.current) return;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev]);

  return {
    sceneIndex,
    displaySceneIndex: transition ? transition.to : sceneIndex,
    isTransitioning: Boolean(transition),
    transitionProgress: transition?.progress ?? 1,
    fromScene: transition?.from ?? sceneIndex,
    toScene: transition?.to ?? sceneIndex,
    goToScene,
    goNext,
    goPrev,
  };
}
