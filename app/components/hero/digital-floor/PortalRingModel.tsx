"use client";

import * as THREE from "three";

import { floorHeight } from "./relief";

const portalPosition: [number, number, number] = [
  0.25,
  floorHeight(0.25, -8) + 0.035,
  -8,
];
const portalSpokes = Array.from({ length: 24 }, (_, index) => {
  const angle = (index / 24) * Math.PI * 2;
  const radius = index % 2 === 0 ? 2.15 : 1.86;

  return {
    angle,
    position: [
      portalPosition[0] + Math.cos(angle) * radius,
      portalPosition[1] + 0.058,
      portalPosition[2] + Math.sin(angle) * radius,
    ] as [number, number, number],
    scale: index % 3 === 0 ? 1.18 : 0.82,
  };
});

export function PortalRingModel() {
  return (
    <group>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.012, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.95, 128]} />
        <meshBasicMaterial
          color="#5b5383"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.016, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.42, 2.75, 128]} />
        <meshBasicMaterial
          color="#d9caff"
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.018, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.62, 2.32, 128]} />
        <meshBasicMaterial
          color="#b8a6ff"
          transparent
          opacity={0.48}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.025, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.26, 128]} />
        <meshBasicMaterial
          color="#fff8ff"
          transparent
          opacity={0.62}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.029, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.66, 96]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.034, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.18, 0.022, 12, 160]} />
        <meshBasicMaterial
          color="#f3eaff"
          transparent
          opacity={0.52}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.05, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.018, 12, 128]} />
        <meshBasicMaterial
          color="#9d89ff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {portalSpokes.map((spoke, index) => (
        <mesh
          key={index}
          position={spoke.position}
          rotation={[0, -spoke.angle, 0]}
          scale={[1, 1, spoke.scale]}
        >
          <boxGeometry args={[0.045, 0.028, 0.58]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#fff8ff" : "#a998ff"}
            transparent
            opacity={index % 2 === 0 ? 0.5 : 0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      <pointLight
        position={[portalPosition[0], portalPosition[1] + 0.45, portalPosition[2]]}
        color="#a998ff"
        intensity={7.2}
        distance={9}
        decay={2}
      />
    </group>
  );
}
