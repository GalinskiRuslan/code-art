"use client";

import { Billboard, Sparkles } from "@react-three/drei";
import { useMemo } from "react";

function LightColumn({
  position,
  scale,
  opacity,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  opacity: number;
}) {
  return (
    <Billboard position={position}>
      <mesh scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#d8eeff"
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
    </Billboard>
  );
}

export function HeroAtmosphere() {
  const columns = useMemo(
    () => [
      { position: [-6.5, 3.8, -10] as [number, number, number], scale: [0.22, 6.4, 1] as [number, number, number], opacity: 0.1 },
      { position: [6.4, 4.4, -11.5] as [number, number, number], scale: [0.18, 7.8, 1] as [number, number, number], opacity: 0.08 },
      { position: [0.4, 3.2, -13.5] as [number, number, number], scale: [0.16, 5.8, 1] as [number, number, number], opacity: 0.06 },
      { position: [-1.8, 2.6, -6.2] as [number, number, number], scale: [0.12, 3.6, 1] as [number, number, number], opacity: 0.08 },
    ],
    []
  );

  return (
    <group>
      <Sparkles
        count={160}
        scale={[24, 12, 20]}
        position={[0, 2, -9]}
        size={2.1}
        speed={0.16}
        color="#d8eeff"
      />
      <Sparkles
        count={45}
        scale={[12, 3, 12]}
        position={[0.2, -0.4, -8]}
        size={3.4}
        speed={0.08}
        color="#93c7ff"
      />
      {columns.map((column, index) => (
        <LightColumn
          key={index}
          position={column.position}
          scale={column.scale}
          opacity={column.opacity}
        />
      ))}
      <mesh position={[0.2, 1.1, -8.4]}>
        <sphereGeometry args={[3.4, 32, 32]} />
        <meshBasicMaterial
          color="#8fc7ff"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.2, 1.1, -8.4]}>
        <sphereGeometry args={[5.1, 32, 32]} />
        <meshBasicMaterial
          color="#dff3ff"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
