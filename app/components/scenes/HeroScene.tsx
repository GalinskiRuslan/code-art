"use client";

import { Sparkles, Stars } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type VoxelCell = {
  key: string;
  position: [number, number, number];
};

import type { SceneState } from "../../hooks/useSceneState";
import type { Language } from "../../lib/i18n";
import { AICore } from "../hero/AICore";
import { DigitalFloor } from "../hero/DigitalFloor";
import { FloatingPanels } from "../hero/FloatingPanels";
import { SceneHaze } from "../hero/SceneHaze";
import type { NavItemId } from "../site/SystemNavCard";

function VoxelCube({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<ThreeGroup | null>(null);
  const voxelCells = useMemo(() => {
    const cells: VoxelCell[] = [];
    const size = 4;
    const spacing = 0.28;
    const offset = ((size - 1) * spacing) / 2;

    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        for (let z = 0; z < size; z += 1) {
          const isSurface =
            x === 0 ||
            y === 0 ||
            z === 0 ||
            x === size - 1 ||
            y === size - 1 ||
            z === size - 1;

          if (!isSurface) continue;

          cells.push({
            key: `${x}-${y}-${z}`,
            position: [
              x * spacing - offset,
              y * spacing - offset,
              z * spacing - offset,
            ],
          });
        }
      }
    }

    return cells;
  }, []);

  const voxelMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f4fbff",
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      }),
    []
  );
  const voxelGeometry = useMemo(() => new THREE.BoxGeometry(0.16, 0.16, 0.16), []);

  useFrame((state: RootState) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.getElapsedTime();
    group.rotation.x = Math.sin(t * 0.6) * 0.18;
    group.rotation.y = t * 0.55;
    group.rotation.z = Math.cos(t * 0.45) * 0.12;
    group.position.y = position[1] + Math.sin(t * 1.1) * 0.18;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#bfe8ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {voxelCells.map((cell) => (
        <mesh
          key={cell.key}
          position={cell.position}
          geometry={voxelGeometry}
          material={voxelMaterial}
        />
      ))}
    </group>
  );
}

export function HeroScene({
  sceneState,
  sceneOffsetX,
  language,
  activeNavItem,
  onActiveNavItemChange,
}: {
  sceneState: SceneState;
  sceneOffsetX: number;
  language: Language;
  activeNavItem: NavItemId | null;
  onActiveNavItemChange: (item: NavItemId | null) => void;
}) {
  const groupRef = useRef<ThreeGroup | null>(null);
  const longPanels = [
    { position: [6.2, -1.02, -13.6] as [number, number, number], rotation: [0, -0.28, 0] as [number, number, number], scale: 0.72 },
    { position: [-7.4, -1.04, -15.4] as [number, number, number], rotation: [0, 0.22, 0] as [number, number, number], scale: 0.64 },
    { position: [0.8, -1.08, -19.2] as [number, number, number], rotation: [0, -0.04, 0] as [number, number, number], scale: 0.58 },
  ];
  const clusterProcessorCorners = [
    { position: [11.4, -1.02, -17.1] as [number, number, number], rotation: [0, -0.34, 0] as [number, number, number], scale: 0.5 },
    { position: [-11.2, -1.02, -11.4] as [number, number, number], rotation: [0, 0.3, 0] as [number, number, number], scale: 0.48 },
  ];
  const traceHubs = [
    { position: [2.1, -1.02, -14.2] as [number, number, number], rotation: [0, 0.16, 0] as [number, number, number], scale: 0.74 },
    { position: [-2.8, -1.04, -8.8] as [number, number, number], rotation: [0, -0.18, 0] as [number, number, number], scale: 0.66 },
    { position: [9.8, -1.04, -21.2] as [number, number, number], rotation: [0, -0.26, 0] as [number, number, number], scale: 0.6 },
    { position: [-10.4, -1.04, -19.6] as [number, number, number], rotation: [0, 0.26, 0] as [number, number, number], scale: 0.6 },
  ];
  const memoryBanks = [
    { position: [10.6, -1.02, -16.2] as [number, number, number], rotation: [0, -0.22, 0] as [number, number, number], scale: 0.62 },
    { position: [-5.8, -1.04, -18.2] as [number, number, number], rotation: [0, 0.18, 0] as [number, number, number], scale: 0.58 },
    { position: [5.4, -1.04, -7.8] as [number, number, number], rotation: [0, -0.14, 0] as [number, number, number], scale: 0.54 },
  ];
  const greebleFields = [
    { position: [8.9, -1.06, -9.8] as [number, number, number], rotation: [0, 0.28, 0] as [number, number, number], scale: 0.58 },
    { position: [-8.2, -1.08, -6.8] as [number, number, number], rotation: [0, -0.2, 0] as [number, number, number], scale: 0.52 },
    { position: [12.4, -1.08, -11.2] as [number, number, number], rotation: [0, 0.12, 0] as [number, number, number], scale: 0.48 },
    { position: [-1.2, -1.08, -22.8] as [number, number, number], rotation: [0, 0.06, 0] as [number, number, number], scale: 0.52 },
  ];
  const skylineBlocks = [
    { position: [3.8, -1.02, -9.2] as [number, number, number], rotation: [0, -0.12, 0] as [number, number, number], scale: 0.56 },
    { position: [-3.6, -1.02, -12.6] as [number, number, number], rotation: [0, 0.12, 0] as [number, number, number], scale: 0.58 },
    { position: [11.6, -1.04, -22.4] as [number, number, number], rotation: [0, -0.32, 0] as [number, number, number], scale: 0.5 },
    { position: [-12.2, -1.04, -17.6] as [number, number, number], rotation: [0, 0.3, 0] as [number, number, number], scale: 0.5 },
  ];

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const visibility = sceneState.heroProgress;
    group.visible = visibility > 0.001;
    group.position.x = THREE.MathUtils.lerp(group.position.x, sceneOffsetX, 0.09);
    group.position.y = THREE.MathUtils.lerp(-1.4, 0.9, visibility);
    group.position.z = THREE.MathUtils.lerp(24, 0, visibility);
    group.rotation.y = THREE.MathUtils.lerp(-0.25, 0, visibility);
    group.scale.setScalar(THREE.MathUtils.lerp(0.86, 1, visibility));
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={120}
        depth={60}
        count={1800}
        factor={2}
        saturation={0}
        fade
      />
      {/* <HeroAtmosphere /> */}
      <Sparkles
        count={90}
        scale={[22, 10, 18]}
        position={[0, 1, -8]}
        size={2}
        speed={0.14}
        color="#d7eeff"
      />
      <DigitalFloor />
      <SceneHaze />
      <AICore />
      <VoxelCube position={[-4.8, 1.45, -9.4]} scale={1.1} />
      <FloatingPanels
        language={language}
        activeItem={activeNavItem}
        onActiveItemChange={onActiveNavItemChange}
      />
    </group>
  );
}
