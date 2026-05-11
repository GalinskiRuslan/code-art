"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreePointLight = InstanceType<typeof THREE.PointLight>;
type ThreeSpotLight = InstanceType<typeof THREE.SpotLight>;

export function BrightStar() {
  const groupRef = useRef<ThreeGroup | null>(null);
  const coreLightRef = useRef<ThreePointLight | null>(null);
  const fillLightRef = useRef<ThreePointLight | null>(null);
  const beamLightRef = useRef<ThreeSpotLight | null>(null);

  useFrame((state: RootState) => {
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.8) * 0.06;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(pulse);
      groupRef.current.rotation.z += 0.002;
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 32 + Math.sin(t * 2.8) * 5;
    }

    if (fillLightRef.current) {
      fillLightRef.current.intensity = 12 + Math.sin(t * 2.2 + 0.7) * 2;
    }

    if (beamLightRef.current) {
      beamLightRef.current.intensity = 9 + Math.sin(t * 2.6 + 0.2) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight
        ref={coreLightRef}
        color="#dff6ff"
        intensity={32}
        distance={24}
        decay={1.4}
      />
      <pointLight
        ref={fillLightRef}
        color="#8fd3ff"
        intensity={12}
        distance={14}
        decay={1.1}
      />
      <spotLight
        ref={beamLightRef}
        position={[0, 2.4, 1.2]}
        angle={0.75}
        penumbra={0.9}
        intensity={9}
        distance={26}
        decay={1.2}
        color="#eef9ff"
      />

      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color="#dff4ff"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshBasicMaterial
          color="#8fd3ff"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#dff4ff"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
