"use client";

import { ProcessorCore } from "../../ProcessorCore";

type BaseProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function ChipBody({
  size,
  emissiveIntensity,
}: {
  size: [number, number, number];
  emissiveIntensity: number;
}) {
  return (
    <group>
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0d1524"
          roughness={0.24}
          metalness={0.84}
          emissive="#67c8ff"
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, size[1] + 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.82, size[2] * 0.82]} />
        <meshBasicMaterial
          color="#eff9ff"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ChipBase({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  size,
  emissiveIntensity,
  ribs = 0,
}: BaseProps & {
  size: [number, number, number];
  emissiveIntensity: number;
  ribs?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <ChipBody size={size} emissiveIntensity={emissiveIntensity} />
      {Array.from({ length: ribs }, (_, index) => (
        <mesh
          key={index}
          position={[
            -size[0] / 2 + 0.16 + index * ((size[0] - 0.32) / Math.max(ribs - 1, 1)),
            size[1] + 0.05,
            0,
          ]}
        >
          <boxGeometry args={[0.08, 0.12, size[2] * 0.72]} />
          <meshStandardMaterial
            color="#17253a"
            roughness={0.2}
            metalness={0.86}
            emissive="#8fd3ff"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroChip(props: BaseProps) {
  return <ProcessorCore {...props} />;
}

export function ChipSmallSquare(props: BaseProps) {
  return <ChipBase {...props} size={[0.78, 0.14, 0.78]} emissiveIntensity={0.08} />;
}

export function ChipSmallRect(props: BaseProps) {
  return <ChipBase {...props} size={[1.04, 0.14, 0.6]} emissiveIntensity={0.08} />;
}

export function ChipMediumSquare(props: BaseProps) {
  return <ChipBase {...props} size={[1.28, 0.18, 1.28]} emissiveIntensity={0.11} />;
}

export function ChipMediumRect(props: BaseProps) {
  return <ChipBase {...props} size={[1.66, 0.16, 0.92]} emissiveIntensity={0.1} />;
}

export function ChipFlatModule(props: BaseProps) {
  return <ChipBase {...props} size={[1.5, 0.08, 0.74]} emissiveIntensity={0.14} />;
}

export function ChipRibbedModule(props: BaseProps) {
  return <ChipBase {...props} size={[1.34, 0.18, 0.86]} emissiveIntensity={0.09} ribs={8} />;
}
