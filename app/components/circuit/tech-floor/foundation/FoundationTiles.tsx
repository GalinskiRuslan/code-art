"use client";

type TileProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function TileShell({
  size,
  steps,
  panelInset,
}: {
  size: [number, number, number];
  steps: Array<{ inset: number; height: number; opacity: number }>;
  panelInset: number;
}) {
  return (
    <group>
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#0a111c"
          roughness={0.34}
          metalness={0.82}
          emissive="#67c8ff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {steps.map((step, index) => (
        <mesh
          key={index}
          position={[0, size[1] + step.height / 2 + index * 0.02, 0]}
        >
          <boxGeometry
            args={[
              Math.max(0.2, size[0] - step.inset * 2),
              step.height,
              Math.max(0.2, size[2] - step.inset * 2),
            ]}
          />
          <meshStandardMaterial
            color="#0d1625"
            roughness={0.28}
            metalness={0.78}
            emissive="#7bcfff"
            emissiveIntensity={step.opacity * 0.18}
          />
        </mesh>
      ))}

      <mesh position={[0, size[1] + 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] - panelInset, size[2] - panelInset]} />
        <meshBasicMaterial
          color="#cdeaff"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, size[1] + 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.3, size[2] * 0.08]} />
        <meshBasicMaterial
          color="#f4fbff"
          transparent
          opacity={0.26}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function FoundationBase({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  size,
  steps,
  panelInset,
}: TileProps & {
  size: [number, number, number];
  steps: Array<{ inset: number; height: number; opacity: number }>;
  panelInset: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <TileShell size={size} steps={steps} panelInset={panelInset} />
    </group>
  );
}

export function FoundationTileA(props: TileProps) {
  return (
    <FoundationBase
      {...props}
      size={[1, 0.12, 1]}
      panelInset={0.12}
      steps={[
        { inset: 0.08, height: 0.04, opacity: 0.4 },
        { inset: 0.18, height: 0.05, opacity: 0.55 },
      ]}
    />
  );
}

export function FoundationTileB(props: TileProps) {
  return (
    <FoundationBase
      {...props}
      size={[2, 0.14, 1]}
      panelInset={0.18}
      steps={[
        { inset: 0.14, height: 0.05, opacity: 0.36 },
        { inset: 0.28, height: 0.05, opacity: 0.48 },
        { inset: 0.42, height: 0.04, opacity: 0.58 },
      ]}
    />
  );
}

export function FoundationTileC(props: TileProps) {
  return (
    <FoundationBase
      {...props}
      size={[2, 0.14, 2]}
      panelInset={0.2}
      steps={[
        { inset: 0.16, height: 0.05, opacity: 0.34 },
        { inset: 0.34, height: 0.05, opacity: 0.46 },
      ]}
    />
  );
}

export function FoundationTileWide(props: TileProps) {
  return (
    <FoundationBase
      {...props}
      size={[4, 0.16, 2]}
      panelInset={0.24}
      steps={[
        { inset: 0.16, height: 0.05, opacity: 0.3 },
        { inset: 0.36, height: 0.06, opacity: 0.42 },
        { inset: 0.64, height: 0.06, opacity: 0.56 },
      ]}
    />
  );
}

export function MirrorPlateSmall({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TileProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[0.82, 0.04, 0.82]} />
      <meshStandardMaterial
        color="#0a0f17"
        roughness={0.08}
        metalness={0.95}
        envMapIntensity={2}
      />
    </mesh>
  );
}

export function MirrorPlateRect({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: TileProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1.6, 0.04, 0.78]} />
      <meshStandardMaterial
        color="#09111b"
        roughness={0.06}
        metalness={0.98}
        envMapIntensity={2.1}
      />
    </mesh>
  );
}
