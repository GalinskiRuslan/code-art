"use client";

import { useMemo } from "react";

import type { SceneNavigation } from "./useSceneNavigation";

export type SceneState = {
  sceneIndex: number;
  displaySceneIndex: number;
  transitionProgress: number;
  fromScene: number;
  toScene: number;
  heroProgress: number;
  labProgress: number;
  finaleProgress: number;
  isTransitioning: boolean;
  activeScene: "hero" | "lab" | "finale";
};

export function useSceneState(navigation: SceneNavigation): SceneState {
  return useMemo(() => {
    const weights = [0, 0, 0];

    if (navigation.isTransitioning) {
      weights[navigation.fromScene] = 1 - navigation.transitionProgress;
      weights[navigation.toScene] = navigation.transitionProgress;
    } else {
      weights[navigation.sceneIndex] = 1;
    }

    const activeScene =
      navigation.displaySceneIndex === 0
        ? "hero"
        : navigation.displaySceneIndex === 1
          ? "lab"
          : "finale";

    return {
      sceneIndex: navigation.sceneIndex,
      displaySceneIndex: navigation.displaySceneIndex,
      transitionProgress: navigation.transitionProgress,
      fromScene: navigation.fromScene,
      toScene: navigation.toScene,
      heroProgress: weights[0],
      labProgress: weights[1],
      finaleProgress: weights[2],
      isTransitioning: navigation.isTransitioning,
      activeScene,
    };
  }, [navigation]);
}
