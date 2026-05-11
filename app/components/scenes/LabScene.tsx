"use client";

import { Float, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;

import { Character } from "../character/Character";
import { StaticModel } from "../models/StaticModel";
import { labAssets } from "../../lib/asset-manifest";
import type { SceneState } from "../../hooks/useSceneState";

function StudioRoom() {
  const floorTexture = useTexture(labAssets.floorTexture);
  const wallTexture = useTexture(labAssets.wallTexture);
  const ceilingTexture = useTexture(labAssets.ceilingTexture);

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.62,
      }),
    [floorTexture]
  );
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.96,
      }),
    [wallTexture]
  );
  const ceilingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ceilingTexture,
        roughness: 0.98,
      }),
    [ceilingTexture]
  );

  return (
    <group>
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 5.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <primitive object={ceilingMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 2.5, -5.12]} receiveShadow>
        <boxGeometry args={[10, 5, 0.24]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
      <mesh position={[5.12, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.24, 5, 10]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
    </group>
  );
}

export function LabScene({
  sceneState,
  activeAnimation,
}: {
  sceneState: SceneState;
  activeAnimation: string;
}) {
  const groupRef = useRef<ThreeGroup | null>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const visibility = sceneState.labProgress;

    group.position.set(
      THREE.MathUtils.lerp(-35, -20.5, visibility),
      THREE.MathUtils.lerp(4.8, 0, visibility),
      THREE.MathUtils.lerp(-22, -6.5, visibility)
    );
    group.rotation.y = THREE.MathUtils.lerp(0.34, 0.16, visibility);
    group.scale.setScalar(THREE.MathUtils.lerp(0.88, 1.02, visibility));
    group.visible = visibility > 0.001;
  });

  return (
    <group ref={groupRef}>
      <StudioRoom />
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Character
          modelUrl={labAssets.characterModel}
          animations={[...labAssets.animations]}
          activeAnimation={activeAnimation}
          scale={0.02}
        />
      </Float>
      <StaticModel
        url={labAssets.notebook}
        position={[0, 2.25, 1.25]}
        scale={0.65}
        rotation={[0, 3, 0]}
      />
      <StaticModel
        url={labAssets.desk}
        position={[-0.5, 0.9, 1.9]}
        scale={1.9}
        rotation={[0, 3.15, 0]}
      />
      <StaticModel
        url={labAssets.chair}
        scale={1.4}
        position={[0, 1.33, 0]}
      />
    </group>
  );
}
