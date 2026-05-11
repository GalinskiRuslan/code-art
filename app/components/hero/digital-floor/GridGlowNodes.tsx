"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { floorBounds, floorHeight } from "./relief";

type ThreeMesh = InstanceType<typeof THREE.Mesh>;
type BasicMaterial = InstanceType<typeof THREE.MeshBasicMaterial>;

const gridX = (index: number) =>
  floorBounds.minX + index * ((floorBounds.maxX - floorBounds.minX) / 44);

const gridZ = (index: number) =>
  floorBounds.nearZ + index * ((floorBounds.farZ - floorBounds.nearZ) / 61);

const nodeSeeds = [
  [18, 8],
  [23, 7],
  [27, 9],
  [15, 15],
  [31, 16],
  [20, 20],
  [25, 22],
  [11, 25],
  [34, 27],
  [16, 31],
  [29, 34],
  [22, 38],
  [38, 41],
  [7, 44],
  [32, 48],
  [13, 52],
] as const;

export function GridGlowNodes() {
  const nodeRefs = useRef<(ThreeMesh | null)[]>([]);
  const nodes = useMemo(
    () =>
      nodeSeeds.map(([xIndex, zIndex], index) => {
        const x = gridX(xIndex);
        const z = gridZ(zIndex);

        return {
          position: [x, floorHeight(x, z) + 0.075, z] as [
            number,
            number,
            number,
          ],
          delay: index * 0.47,
          scale: 0.75 + (index % 4) * 0.08,
          color: index % 3 === 0 ? "#f3deff" : "#bdaaff",
        };
      }),
    []
  );
  const coreGeometry = useMemo(() => new THREE.SphereGeometry(0.055, 12, 12), []);
  const haloGeometry = useMemo(() => new THREE.SphereGeometry(0.18, 16, 16), []);

  useFrame((state: RootState) => {
    const time = state.clock.getElapsedTime();

    nodeRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const node = nodes[index];
      const pulse = 0.5 + Math.sin(time * 1.55 + node.delay) * 0.5;
      mesh.scale.setScalar(node.scale * (0.82 + pulse * 0.42));

      const material = mesh.material as BasicMaterial;
      material.opacity = 0.32 + pulse * 0.44;
    });
  });

  return (
    <group>
      {nodes.map((node, index) => (
        <group key={`${node.position[0]}-${node.position[2]}`} position={node.position}>
          <mesh geometry={haloGeometry} scale={node.scale * 1.6}>
            <meshBasicMaterial
              color="#8e7cff"
              transparent
              opacity={0.095}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh
            ref={(mesh: ThreeMesh | null) => {
              nodeRefs.current[index] = mesh;
            }}
            geometry={coreGeometry}
          >
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.58}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
