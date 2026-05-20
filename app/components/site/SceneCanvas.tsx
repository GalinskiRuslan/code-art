"use client";

import { Html, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";

import type { SceneState } from "../../hooks/useSceneState";
import type { Language } from "../../lib/i18n";
import { uiCopy } from "../../lib/i18n";
import { SceneManager } from "../scenes/SceneManager";
import type { NavItemId } from "./SystemNavCard";

export function SceneCanvas({
  sceneOffsetX,
  language,
  activeNavItem,
  onActiveNavItemChange,
  isMobileScene = false,
}: {
  sceneOffsetX: number;
  language: Language;
  activeNavItem: NavItemId | null;
  onActiveNavItemChange: (item: NavItemId | null) => void;
  isMobileScene?: boolean;
}) {
  const copy = uiCopy[language];
  const sceneState = useMemo<SceneState>(
    () => ({
      sceneIndex: 0,
      displaySceneIndex: 0,
      transitionProgress: 1,
      fromScene: 0,
      toScene: 0,
      heroProgress: 1,
      labProgress: 0,
      finaleProgress: 0,
      isTransitioning: false,
      activeScene: "hero",
    }),
    []
  );

  return (
    <>
      <div className="scene-canvas">
        <Canvas
          shadows={!isMobileScene}
          dpr={isMobileScene ? [1, 1] : [1, 1.5]}
          camera={{
            position: isMobileScene ? [0, 2.1, 9.4] : [0, 1.35, 8.6],
            fov: isMobileScene ? 42 : 34,
          }}
        >
          <color attach="background" args={["#09070b"]} />
          <fog attach="fog" args={["#09070b", 10, 24]} />
          <Suspense
            fallback={
              <Html center className="canvas-loading">
                {copy.loadingScene}
              </Html>
            }
          >
            <SceneManager
              sceneState={sceneState}
              sceneOffsetX={sceneOffsetX}
              language={language}
              activeNavItem={activeNavItem}
              onActiveNavItemChange={onActiveNavItemChange}
              isMobileScene={isMobileScene}
            />
          </Suspense>
        </Canvas>
      </div>
      <Loader />
    </>
  );
}
