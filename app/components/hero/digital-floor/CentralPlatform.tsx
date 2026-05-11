"use client";

import * as THREE from "three";

import { floorHeight } from "./relief";

const center: [number, number, number] = [0.25, floorHeight(0.25, -8) + 0.055, -8];

function FlatRing({
  inner,
  outer,
  color,
  opacity,
}: {
  inner: number;
  outer: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={center} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[inner, outer, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function CentralPlatform() {
  return (
    <>
      <mesh position={center} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 96]} />
        <meshBasicMaterial
          color="#fff8ff"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <FlatRing inner={0.72} outer={0.77} color="#fbf4ff" opacity={0.5} />
      <FlatRing inner={1.02} outer={1.06} color="#d8c8ff" opacity={0.38} />
      <FlatRing inner={1.38} outer={1.43} color="#b7a2ff" opacity={0.3} />
      <FlatRing inner={1.88} outer={1.96} color="#7f70c8" opacity={0.22} />
      <FlatRing inner={2.45} outer={2.54} color="#5b5383" opacity={0.18} />
      <mesh position={center} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.85, 128]} />
        <meshBasicMaterial
          color="#5b5383"
          transparent
          opacity={0.065}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
