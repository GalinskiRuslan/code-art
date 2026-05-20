"use client";

import { useFrame, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";

import type { SceneState } from "../../hooks/useSceneState";

export function CameraRig({
  sceneState,
  sceneOffsetX,
  isMobileScene = false,
}: {
  sceneState: SceneState;
  sceneOffsetX: number;
  isMobileScene?: boolean;
}) {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();
  const heroPosition = new THREE.Vector3();
  const labPosition = new THREE.Vector3();
  const finalePosition = new THREE.Vector3();
  const heroLookAt = new THREE.Vector3();
  const labLookAt = new THREE.Vector3();
  const finaleLookAt = new THREE.Vector3();

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    const heroToLab =
      sceneState.fromScene === 0 && sceneState.toScene === 1
        ? sceneState.transitionProgress
        : sceneState.labProgress;
    const labToFinale =
      sceneState.fromScene === 1 && sceneState.toScene === 2
        ? sceneState.transitionProgress
        : sceneState.finaleProgress;

    if (isMobileScene) {
      heroPosition.set(
        0.2 + Math.sin(time * 0.12) * 0.18,
        6.1 + Math.sin(time * 0.18 + 0.7) * 0.14,
        10.4 + Math.cos(time * 0.11) * 0.18
      );
      heroLookAt.set(0.05, 1.55, -9.4);
    } else {
      heroPosition.set(
        4.95 + sceneOffsetX * 0.42 + Math.sin(time * 0.16) * 1.05,
        8.25 + Math.sin(time * 0.21 + 0.7) * 0.36,
        8 + Math.cos(time * 0.13) * 0.72
      );
      heroLookAt.set(
        0.4 + sceneOffsetX,
        1.98 + Math.sin(time * 0.32) * 0.06,
        -9.3
      );
    }

    labPosition.set(-26, 2.2, 9.5 - sceneState.labProgress * 1.8);
    labLookAt.set(-20.5, 15, -6.5);

    finalePosition.set(24, 3.1, -26 - sceneState.finaleProgress * 1.1);
    finaleLookAt.set(30.5, 1.95, -33.5);

    targetPosition.copy(heroPosition).lerp(labPosition, heroToLab);
    targetPosition.lerp(finalePosition, labToFinale);

    targetLookAt.copy(heroLookAt).lerp(labLookAt, heroToLab);
    targetLookAt.lerp(finaleLookAt, labToFinale);

    camera.position.lerp(targetPosition, 0.045);
    camera.lookAt(targetLookAt);
  });

  return null;
}
