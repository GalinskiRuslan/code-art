"use client";

import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;

import { labAssets } from "../../lib/asset-manifest";
import type { SceneState } from "../../hooks/useSceneState";
import { StaticModel } from "../models/StaticModel";

export function FinaleScene({ sceneState }: { sceneState: SceneState }) {
  const groupRef = useRef<ThreeGroup | null>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const reveal = sceneState.finaleProgress;
    group.visible = reveal > 0.001;
    group.position.x = THREE.MathUtils.lerp(38, 30.5, reveal);
    group.position.y = THREE.MathUtils.lerp(2.6, 0.6, reveal);
    group.position.z = THREE.MathUtils.lerp(-42, -33.5, reveal);
    group.rotation.y = THREE.MathUtils.lerp(-0.36, 0.18, reveal);
    group.scale.setScalar(THREE.MathUtils.lerp(0.72, 1.3, reveal));
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.9} rotationIntensity={0.05} floatIntensity={0.08}>
        <StaticModel
          url={labAssets.notebook}
          position={[0, 1.9, 0]}
          scale={1.26}
          rotation={[0.14, 2.84, -0.02]}
        />
      </Float>
      <Text
        position={[0, -0.4, -0.9]}
        fontSize={0.21}
        color="#fff8ef"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        Final close-up on the notebook
      </Text>
      <Text
        position={[0, -0.7, -0.9]}
        fontSize={0.1}
        color="#f2b880"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        The last scene now pushes the laptop forward as the visual payoff
      </Text>
    </group>
  );
}
