"use client";

type TraceProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function TraceLine({
  points,
  opacity,
}: {
  points: [number, number, number][];
  opacity: number;
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

function TraceBase({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  points,
  glow = false,
}: TraceProps & {
  points: [number, number, number][];
  glow?: boolean;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <TraceLine points={points} opacity={glow ? 0.44 : 0.2} />
      <TraceLine points={points} opacity={glow ? 0.18 : 0.08} />
    </group>
  );
}

export function TraceStraightS(props: TraceProps) {
  return <TraceBase {...props} points={[[-0.5, 0.02, 0], [0.5, 0.02, 0]]} />;
}

export function TraceStraightL(props: TraceProps) {
  return <TraceBase {...props} points={[[-1.2, 0.02, 0], [1.2, 0.02, 0]]} />;
}

export function TraceCorner(props: TraceProps) {
  return <TraceBase {...props} points={[[-0.8, 0.02, 0], [0, 0.02, 0], [0, 0.02, 0.8]]} />;
}

export function TraceT(props: TraceProps) {
  return (
    <TraceBase
      {...props}
      points={[[-0.8, 0.02, 0], [0.8, 0.02, 0], [0, 0.02, 0], [0, 0.02, 0.8]]}
    />
  );
}

export function TraceCross(props: TraceProps) {
  return (
    <group position={props.position} rotation={props.rotation} scale={props.scale}>
      <TraceLine points={[[-0.8, 0.02, 0], [0.8, 0.02, 0]]} opacity={0.22} />
      <TraceLine points={[[0, 0.02, -0.8], [0, 0.02, 0.8]]} opacity={0.22} />
    </group>
  );
}

export function TraceDual(props: TraceProps) {
  return (
    <group position={props.position} rotation={props.rotation} scale={props.scale}>
      <TraceLine points={[[-1, 0.02, -0.08], [1, 0.02, -0.08]]} opacity={0.22} />
      <TraceLine points={[[-1, 0.02, 0.08], [1, 0.02, 0.08]]} opacity={0.22} />
    </group>
  );
}

export function TraceMainChannel(props: TraceProps) {
  return (
    <TraceBase
      {...props}
      glow
      points={[[-1.8, 0.03, 0], [-0.4, 0.03, 0], [-0.4, 0.03, 0.8], [1.8, 0.03, 0.8]]}
    />
  );
}

export function LaneStraight(props: TraceProps) {
  return (
    <group position={props.position} rotation={props.rotation} scale={props.scale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 0.22]} />
        <meshBasicMaterial color="#67c8ff" transparent opacity={0.38} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.08]} />
        <meshBasicMaterial color="#f4fbff" transparent opacity={0.46} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function LaneCornerRound(props: TraceProps) {
  return (
    <group position={props.position} rotation={props.rotation} scale={props.scale}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.11, 10, 32, Math.PI / 2]} />
        <meshBasicMaterial color="#7acfff" transparent opacity={0.34} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function LaneRingLarge(props: TraceProps) {
  return (
    <mesh position={props.position} rotation={props.rotation ?? [-Math.PI / 2, 0, 0]} scale={props.scale}>
      <ringGeometry args={[0.9, 1.12, 48]} />
      <meshBasicMaterial color="#8fd3ff" transparent opacity={0.28} depthWrite={false} />
    </mesh>
  );
}

export function LaneRingSmall(props: TraceProps) {
  return (
    <mesh position={props.position} rotation={props.rotation ?? [-Math.PI / 2, 0, 0]} scale={props.scale}>
      <ringGeometry args={[0.42, 0.58, 32]} />
      <meshBasicMaterial color="#eff9ff" transparent opacity={0.34} depthWrite={false} />
    </mesh>
  );
}
