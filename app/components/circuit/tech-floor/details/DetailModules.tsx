"use client";

type BaseProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export function PinsRowShort({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={index} position={[-0.28 + index * 0.08, 0.02, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.02]} />
          <meshStandardMaterial color="#dff4ff" emissive="#bfe1ff" emissiveIntensity={0.36} />
        </mesh>
      ))}
    </group>
  );
}

export function PinsGridSmall({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 4 }, (_, column) => (
          <mesh key={`${row}-${column}`} position={[-0.18 + column * 0.12, 0.02, -0.18 + row * 0.12]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color="#e9f7ff" emissive="#8fd3ff" emissiveIntensity={0.24} />
          </mesh>
        )),
      )}
    </group>
  );
}

export function EmissivePanelSquare({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.62, 0.62]} />
      <meshBasicMaterial color="#67c8ff" transparent opacity={0.4} depthWrite={false} />
    </mesh>
  );
}

export function EmissiveBarStrip({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1.12, 0.12]} />
      <meshBasicMaterial color="#eff9ff" transparent opacity={0.36} depthWrite={false} />
    </mesh>
  );
}

export function GreeblePlateA({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.82, 0.06, 0.42]} />
      <meshStandardMaterial color="#101826" roughness={0.3} metalness={0.76} />
    </mesh>
  );
}

export function GreeblePlateB({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.54, 0.08, 0.54]} />
      <meshStandardMaterial color="#111b2b" roughness={0.28} metalness={0.8} />
    </mesh>
  );
}

export function SlotPanel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[0.92, 0.06, 0.42]} />
        <meshStandardMaterial color="#101826" roughness={0.3} metalness={0.76} />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.68, 0.02, 0.08]} />
        <meshBasicMaterial color="#c8ecff" transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}
