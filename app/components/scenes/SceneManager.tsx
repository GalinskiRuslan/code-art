"use client";

import type { SceneState } from "../../hooks/useSceneState";
import type { Language } from "../../lib/i18n";
import { CameraRig } from "../scene/CameraRig";
import type { NavItemId } from "../site/SystemNavCard";
import { HeroScene } from "./HeroScene";

export function SceneManager({
  sceneState,
  sceneOffsetX,
  language,
  activeNavItem,
  onActiveNavItemChange,
}: {
  sceneState: SceneState;
  sceneOffsetX: number;
  language: Language;
  activeNavItem: NavItemId | null;
  onActiveNavItemChange: (item: NavItemId | null) => void;
}) {
  return (
    <>
      <CameraRig sceneState={sceneState} sceneOffsetX={sceneOffsetX} />
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -4]} intensity={0.3} />
      <pointLight position={[0.4, 2.2, -8.1]} intensity={1.9} distance={16} color="#d9eeff" />
      <pointLight position={[0.4, 0.1, -8.1]} intensity={1.25} distance={10} color="#9fd3ff" />
      <spotLight
        position={[-1.8, 5.2, 0.8]}
        angle={0.5}
        penumbra={0.7}
        intensity={1.6}
        distance={22}
        color="#ffe1b8"
      />
      <spotLight
        position={[2.8, 4.6, 1.2]}
        angle={0.34}
        penumbra={0.65}
        intensity={1.2}
        distance={16}
        color="#ffd7a8"
      />
      <HeroScene
        sceneState={sceneState}
        sceneOffsetX={sceneOffsetX}
        language={language}
        activeNavItem={activeNavItem}
        onActiveNavItemChange={onActiveNavItemChange}
      />
    </>
  );
}
