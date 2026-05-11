"use client";

type BaseProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function Capacitor({
  height,
}: {
  height: number;
}) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, height, 18]} />
        <meshStandardMaterial
          color="#d8efff"
          roughness={0.18}
          metalness={0.88}
          emissive="#67c8ff"
          emissiveIntensity={0.14}
        />
      </mesh>
      <mesh position={[0, height + 0.04, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.86} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function CapSingle({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Capacitor height={0.52} />
    </group>
  );
}

export function CapCluster3({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group position={[-0.14, 0, -0.08]}><Capacitor height={0.48} /></group>
      <group position={[0.14, 0, -0.08]}><Capacitor height={0.66} /></group>
      <group position={[0, 0, 0.12]}><Capacitor height={0.56} /></group>
    </group>
  );
}

export function CapCluster5({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {[
        [-0.2, 0, -0.14, 0.44],
        [0, 0, -0.14, 0.62],
        [0.2, 0, -0.14, 0.52],
        [-0.1, 0, 0.12, 0.7],
        [0.14, 0, 0.12, 0.48],
      ].map(([x, y, z, h], index) => (
        <group key={index} position={[x as number, y as number, z as number]}>
          <Capacitor height={h as number} />
        </group>
      ))}
    </group>
  );
}

export function TowerChipSmall({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.42, 1, 0.42]} />
        <meshStandardMaterial
          color="#111a2a"
          roughness={0.22}
          metalness={0.86}
          emissive="#67c8ff"
          emissiveIntensity={0.14}
        />
      </mesh>
    </group>
  );
}

export function TowerChipMedium({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[0.58, 1.36, 0.58]} />
        <meshStandardMaterial
          color="#101b2c"
          roughness={0.2}
          metalness={0.88}
          emissive="#8fd3ff"
          emissiveIntensity={0.16}
        />
      </mesh>
    </group>
  );
}

export function HeatsinkSmall({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} position={[-0.25 + index * 0.1, 0.18, 0]}>
          <boxGeometry args={[0.05, 0.36, 0.42]} />
          <meshStandardMaterial color="#1a2738" roughness={0.24} metalness={0.88} />
        </mesh>
      ))}
    </group>
  );
}

export function HeatsinkMedium({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BaseProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {Array.from({ length: 10 }, (_, index) => (
        <mesh key={index} position={[-0.45 + index * 0.1, 0.22, 0]}>
          <boxGeometry args={[0.06, 0.44, 0.6]} />
          <meshStandardMaterial color="#1b2a3d" roughness={0.24} metalness={0.88} />
        </mesh>
      ))}
    </group>
  );
}
