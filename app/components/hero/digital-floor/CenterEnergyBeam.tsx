"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { floorHeight } from "./relief";

type BasicMaterial = InstanceType<typeof THREE.MeshBasicMaterial>;
type ThreeGroup = InstanceType<typeof THREE.Group>;

const beamCenter: [number, number, number] = [0.25, floorHeight(0.25, -8), -8];
const beamHeight = 3.45;

export function CenterEnergyBeam() {
  const groupRef = useRef<ThreeGroup | null>(null);
  const coreMaterialRef = useRef<BasicMaterial | null>(null);
  const haloMaterialRef = useRef<BasicMaterial | null>(null);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();
    const pulse = 0.5 + Math.sin(time * 2.1) * 0.5;

    if (groupRef.current) {
      const spread = 1 + pulse * 0.08;
      groupRef.current.scale.set(spread, 1, spread);
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.opacity = 0.38 + pulse * 0.16;
    }

    if (haloMaterialRef.current) {
      haloMaterialRef.current.opacity = 0.08 + pulse * 0.045;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[
        beamCenter[0],
        beamCenter[1] + beamHeight / 2 + 0.04,
        beamCenter[2],
      ]}
    >
      <mesh>
        <cylinderGeometry args={[0.055, 0.18, beamHeight, 48, 1, true]} />
        <meshBasicMaterial
          ref={coreMaterialRef}
          color="#f3deff"
          transparent
          opacity={0.46}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.42, 0.74, beamHeight * 0.98, 64, 1, true]} />
        <meshBasicMaterial
          ref={haloMaterialRef}
          color="#8e7cff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight
        position={[0, -beamHeight * 0.38, 0]}
        color="#d9c7ff"
        intensity={3.6}
        distance={5.8}
        decay={2}
      />
    </group>
  );
}
