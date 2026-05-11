"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;

function Layer({
  position,
  size,
  opacity = 0.14,
}: {
  position: [number, number, number];
  size: [number, number, number];
  opacity?: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0b1220"
          roughness={0.35}
          metalness={0.75}
          emissive="#67c8ff"
          emissiveIntensity={opacity * 0.32}
        />
      </mesh>
      <mesh position={[0, size[1] + 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.9, size[2] * 0.9]} />
        <meshBasicMaterial
          color="#c8ecff"
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, size[1] + 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.min(size[0], size[2]) * 0.18, Math.min(size[0], size[2]) * 0.24, 4]} />
        <meshBasicMaterial
          color="#eff9ff"
          transparent
          opacity={opacity * 1.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function PinRows({ width, depth }: { width: number; depth: number }) {
  const pinCount = Math.max(8, Math.floor(width / 0.18));

  return (
    <group>
      {Array.from({ length: pinCount }, (_, index) => {
        const x = -width / 2 + 0.12 + index * ((width - 0.24) / Math.max(pinCount - 1, 1));

        return (
          <group key={index}>
            <mesh position={[x, 0.03, -depth / 2 - 0.08]}>
              <boxGeometry args={[0.06, 0.04, 0.02]} />
              <meshStandardMaterial
                color="#dff4ff"
                emissive="#bfe1ff"
                emissiveIntensity={0.45}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>
            <mesh position={[x, 0.03, depth / 2 + 0.08]}>
              <boxGeometry args={[0.06, 0.04, 0.02]} />
              <meshStandardMaterial
                color="#dff4ff"
                emissive="#bfe1ff"
                emissiveIntensity={0.45}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ContactTower({
  position,
  height,
}: {
  position: [number, number, number];
  height: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, height, 18]} />
        <meshStandardMaterial
          color="#d8efff"
          roughness={0.22}
          metalness={0.85}
          emissive="#76cbff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, height + 0.06, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.92} depthWrite={false} />
      </mesh>
    </group>
  );
}

function NeonTrace({
  points,
  opacity = 0.42,
}: {
  points: [number, number, number][];
  opacity?: number;
}) {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flat()), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8fd3ff" transparent opacity={opacity} depthWrite={false} />
    </line>
  );
}

export function ProcessorCore({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<ThreeGroup | null>(null);
  const towers = useMemo(
    () => [
      { position: [-0.9, 0, -0.86] as [number, number, number], height: 0.54 },
      { position: [-0.62, 0, -0.86] as [number, number, number], height: 0.7 },
      { position: [-0.34, 0, -0.86] as [number, number, number], height: 0.46 },
      { position: [0.88, 0, 0.84] as [number, number, number], height: 0.6 },
      { position: [0.6, 0, 0.84] as [number, number, number], height: 0.78 },
      { position: [0.32, 0, 0.84] as [number, number, number], height: 0.5 },
    ],
    []
  );
  const traces = useMemo(
    () => [
      [
        [0, 0.06, -2.18],
        [0, 0.06, -3.2],
        [1.8, 0.06, -3.2],
        [1.8, 0.06, -4.4],
      ],
      [
        [-0.8, 0.06, 2.16],
        [-0.8, 0.06, 3.4],
        [-2.6, 0.06, 3.4],
        [-2.6, 0.06, 4.6],
      ],
      [
        [2.12, 0.06, 0.4],
        [3.2, 0.06, 0.4],
        [3.2, 0.06, 2.6],
      ],
      [
        [-2.12, 0.06, -0.2],
        [-3.4, 0.06, -0.2],
        [-3.4, 0.06, -2.4],
      ],
    ] as [number, number, number][][],
    []
  );
  const moduleBlocks = useMemo(
    () => [
      { position: [2.5, 0, -1.8] as [number, number, number], size: [0.8, 0.16, 0.54] as [number, number, number] },
      { position: [-2.3, 0, 1.7] as [number, number, number], size: [0.96, 0.14, 0.62] as [number, number, number] },
      { position: [2.8, 0, 1.5] as [number, number, number], size: [0.62, 0.14, 0.42] as [number, number, number] },
      { position: [-1.9, 0, -2] as [number, number, number], size: [0.74, 0.16, 0.48] as [number, number, number] },
    ],
    []
  );

  useFrame((state: RootState) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.getElapsedTime();
    group.position.y = position[1] + Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <pointLight position={[0, 1.8, 0]} intensity={2.8} distance={10} color="#bfe1ff" />

      <Layer position={[0, 0, 0]} size={[5.8, 0.24, 5.2]} opacity={0.08} />
      <Layer position={[0, 0.18, 0]} size={[4.6, 0.16, 4.1]} opacity={0.1} />
      <Layer position={[0, 0.34, 0]} size={[3.5, 0.18, 3.1]} opacity={0.14} />
      <Layer position={[0, 0.52, 0]} size={[2.4, 0.2, 2.2]} opacity={0.2} />
      <Layer position={[0, 0.72, 0]} size={[1.6, 0.2, 1.6]} opacity={0.34} />

      <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.32, 1.32]} />
        <meshBasicMaterial color="#f3fbff" transparent opacity={0.88} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.82, 0.82]} />
        <meshBasicMaterial color="#67c8ff" transparent opacity={0.54} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.82} depthWrite={false} />
      </mesh>

      <PinRows width={2.4} depth={2.2} />

      {moduleBlocks.map((block, index) => (
        <Layer
          key={index}
          position={block.position}
          size={block.size}
          opacity={0.12}
        />
      ))}

      {towers.map((tower, index) => (
        <ContactTower key={index} position={tower.position} height={tower.height} />
      ))}

      <mesh position={[0, 0.74, -1.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 0.2]} />
        <meshBasicMaterial color="#8fd3ff" transparent opacity={0.42} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.74, 1.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 0.2]} />
        <meshBasicMaterial color="#8fd3ff" transparent opacity={0.42} depthWrite={false} />
      </mesh>

      {traces.map((trace, index) => (
        <group key={`trace-${index}`}>
          <NeonTrace points={trace} opacity={0.44} />
          <NeonTrace points={trace} opacity={0.18} />
        </group>
      ))}
    </group>
  );
}
