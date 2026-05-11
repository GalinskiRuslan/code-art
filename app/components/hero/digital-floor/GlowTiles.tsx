"use client";

import * as THREE from "three";

import { floorHeight } from "./relief";
import type { GlowTileConfig } from "./types";

const tiles: GlowTileConfig[] = [
  { position: [-5.8, 0.02, -6], scale: [2.2, 1.2, 1] },
  { position: [5.2, 0.02, -8.6], scale: [2.8, 1.5, 1] },
  { position: [0.8, 0.02, -12.2], scale: [3.2, 1.7, 1] },
  { position: [-2.6, 0.02, -15.8], scale: [1.4, 1.1, 1] },
  { position: [8.4, 0.02, -13.6], scale: [2, 1, 1] },
  { position: [-9.2, 0.02, -10.4], scale: [1.6, 1.1, 1] },
  { position: [10.1, 0.02, -17.5], scale: [1.4, 0.8, 1] },
];

function GlowTile({ position, scale }: GlowTileConfig) {
  const y = floorHeight(position[0], position[2]) + position[1];

  return (
    <mesh
      position={[position[0], y, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        color="#b7a6ff"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function GlowTiles() {
  return (
    <>
      {tiles.map((tile, index) => (
        <GlowTile key={index} position={tile.position} scale={tile.scale} />
      ))}
    </>
  );
}
