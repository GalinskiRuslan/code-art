"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SpriteMaterial = InstanceType<typeof THREE.SpriteMaterial>;

const makeHazeTexture = () => {
  const size = 96;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = (x / (size - 1)) * 2 - 1;
      const dy = (y / (size - 1)) * 2 - 1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const haze = Math.max(0, 1 - distance) ** 2.2;
      const index = (y * size + x) * 4;

      data[index] = 255;
      data[index + 1] = 236;
      data[index + 2] = 255;
      data[index + 3] = Math.round(haze * 255);
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;

  return texture;
};

export function SceneHaze() {
  const texture = useMemo(() => makeHazeTexture(), []);
  const materialRefs = useRef<(SpriteMaterial | null)[]>([]);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();

    materialRefs.current.forEach((material, index) => {
      if (!material) return;

      material.opacity =
        0.055 + (Math.sin(time * 0.48 + index * 1.8) + 1) * 0.022;
    });
  });

  return (
    <group>
      {[
        { position: [0.2, 0.55, -9.2], scale: [7.2, 3.1, 1] },
        { position: [0.1, -0.35, -10.4], scale: [10.8, 2.4, 1] },
        { position: [0.4, 1.35, -8.7], scale: [4.2, 4.9, 1] },
      ].map((haze, index) => (
        <sprite
          key={`${haze.position[1]}-${index}`}
          position={haze.position as [number, number, number]}
          scale={haze.scale as [number, number, number]}
        >
          <spriteMaterial
            ref={(material: SpriteMaterial | null) => {
              materialRefs.current[index] = material;
            }}
            map={texture}
            color={index === 1 ? "#7d70d8" : "#bba8ff"}
            transparent
            opacity={0.065}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}
