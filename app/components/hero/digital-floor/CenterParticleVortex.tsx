"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { floorHeight } from "./relief";

type BufferAttributeRef = InstanceType<typeof THREE.BufferAttribute>;

const particleCount = 180;
const vortexCenter = {
  x: 0.25,
  y: floorHeight(0.25, -8) + 0.12,
  z: -8,
};

const fract = (value: number) => value - Math.floor(value);

export function CenterParticleVortex() {
  const positionAttributeRef = useRef<BufferAttributeRef | null>(null);
  const positions = useMemo(() => new Float32Array(particleCount * 3), []);
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => {
        const seedA = fract(Math.sin(index * 17.17) * 8142.42);
        const seedB = fract(Math.sin(index * 41.93) * 5731.19);
        const seedC = fract(Math.sin(index * 83.37) * 3719.83);

        return {
          radius: 0.14 + seedA * 0.92,
          phase: seedB * Math.PI * 2,
          height: seedC,
          speed: 0.72 + seedA * 0.72,
          drift: seedB * 0.18,
        };
      }),
    []
  );

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, index) => {
      const lift = fract(particle.height + time * 0.105 * particle.speed);
      const taper = 1 - lift * 0.58;
      const breathing =
        0.88 + Math.sin(time * 1.7 + particle.phase * 1.3) * 0.12;
      const radius = particle.radius * taper * breathing;
      const angle =
        particle.phase +
        time * (1.18 + particle.speed * 0.22) +
        lift * Math.PI * 2.8;
      const verticalWaver = Math.sin(time * 2.1 + particle.phase) * 0.035;

      positions[index * 3] = vortexCenter.x + Math.cos(angle) * radius;
      positions[index * 3 + 1] =
        vortexCenter.y + lift * 1.35 + verticalWaver;
      positions[index * 3 + 2] =
        vortexCenter.z +
        Math.sin(angle) * radius * 0.72 +
        Math.sin(angle * 2.2 + time + particle.drift) * 0.045;
    });

    if (positionAttributeRef.current) {
      positionAttributeRef.current.needsUpdate = true;
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionAttributeRef}
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f3deff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.64}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
