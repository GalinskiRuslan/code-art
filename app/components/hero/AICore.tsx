"use client";

import { Line, PointMaterial, Points } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreeObject3D = InstanceType<typeof THREE.Object3D>;

function createSpherePoints(count: number, radius: number, irregularity = 0.2) {
  const values = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const i = index * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const wave =
      Math.sin(theta * 5.4) * 0.08 +
      Math.cos(phi * 4.8) * 0.06 +
      Math.sin((theta + phi) * 3.2) * 0.04;
    const r =
      radius * (1 - irregularity / 2 + Math.random() * irregularity + wave);

    values[i] = r * Math.sin(phi) * Math.cos(theta);
    values[i + 1] = r * Math.cos(phi);
    values[i + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  return values;
}

function createNodePositions(count: number, radius: number) {
  const nodes: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    const phi = Math.acos(THREE.MathUtils.clamp(y, -1, 1));
    const wave =
      Math.sin(theta * 2.8 + phi * 1.6) * 0.05 +
      Math.cos(theta * 1.4 - phi * 2.2) * 0.03;
    const r = radius * (0.94 + wave);

    nodes.push([
      Math.cos(theta) * ringRadius * r,
      y * r,
      Math.sin(theta) * ringRadius * r,
    ]);
  }

  return nodes;
}

function connectNearbyNodes(
  nodes: [number, number, number][],
  maxDistance: number,
  maxConnections = 3,
) {
  const segments: [number, number, number][][] = [];
  const existing = new Set<string>();

  for (let a = 0; a < nodes.length; a += 1) {
    const nearby: { index: number; distance: number }[] = [];

    for (let b = 0; b < nodes.length; b += 1) {
      if (a === b) continue;
      const dx = nodes[a][0] - nodes[b][0];
      const dy = nodes[a][1] - nodes[b][1];
      const dz = nodes[a][2] - nodes[b][2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance > maxDistance) continue;
      nearby.push({ index: b, distance });
    }

    nearby.sort((left, right) => left.distance - right.distance);

    for (const candidate of nearby.slice(0, maxConnections)) {
      const key =
        a < candidate.index
          ? `${a}-${candidate.index}`
          : `${candidate.index}-${a}`;
      if (existing.has(key)) continue;

      existing.add(key);
      segments.push([nodes[a], nodes[candidate.index]]);
    }
  }

  return segments;
}

function createInnerStream(count: number, radius: number, seed: number) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const t = (index / count) * Math.PI * 2;
    const swirl = t + seed;
    const localRadius =
      radius +
      Math.sin(swirl * 1.7) * 0.12 +
      Math.cos(swirl * 2.9 + seed) * 0.08;

    return [
      Math.cos(swirl) * localRadius * 0.92,
      Math.sin(swirl * 1.8 + seed) * 0.42 + Math.cos(swirl * 0.8) * 0.12,
      Math.sin(swirl) * localRadius * 0.92,
    ] as [number, number, number];
  });
}

function NeuralCoreShell() {
  return (
    <group rotation={[0.16, -0.24, -0.08]} scale={0.66}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.018, 12, 96]} />
        <meshBasicMaterial
          color="#fff7ff"
          transparent
          opacity={0.46}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[0.5, 0.2, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.014, 12, 80]} />
        <meshBasicMaterial
          color="#bda8ff"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[0.18, Math.PI / 2, 0.32]}>
        <torusGeometry args={[0.38, 0.012, 10, 72]} />
        <meshBasicMaterial
          color="#d8c6ff"
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.34, 2]} />
        <meshBasicMaterial
          color="#f7eaff"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.72}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function AICore() {
  const groupRef = useRef<ThreeGroup | null>(null);
  const haloRef = useRef<ThreeGroup | null>(null);
  const lineRefs = useRef<(ThreeGroup | null)[]>([]);
  const streamRefs = useRef<(ThreeGroup | null)[]>([]);
  const innerGlowRef = useRef<ThreeGroup | null>(null);
  const coreLightRef = useRef<ThreeGroup | null>(null);

  const densePoints = useMemo(() => createSpherePoints(4200, 1.92, 0.22), []);
  const shellPoints = useMemo(() => createSpherePoints(1400, 2.16, 0.3), []);
  const glitterPoints = useMemo(() => createSpherePoints(1800, 2.42, 0.18), []);

  const networkNodes = useMemo(
    () => [...createNodePositions(180, 2.04), ...createNodePositions(96, 2.28)],
    [],
  );
  const nodeArray = useMemo(
    () => new Float32Array(networkNodes.flat()),
    [networkNodes],
  );
  const connections = useMemo(
    () => connectNearbyNodes(networkNodes, 0.98, 5),
    [networkNodes],
  );
  const innerStreams = useMemo(
    () => [
      createInnerStream(120, 0.86, 0.35),
      createInnerStream(120, 0.78, 1.7),
      createInnerStream(120, 0.72, 3.1),
      createInnerStream(120, 0.64, 4.4),
    ],
    [],
  );
  const innerStreamArrays = useMemo(
    () => innerStreams.map((stream) => new Float32Array(stream.flat())),
    [innerStreams],
  );

  useFrame((state: RootState) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.9) * 0.035;

    group.rotation.y = t * 0.08;
    group.rotation.z = Math.sin(t * 0.35) * 0.04;
    group.position.y = 3 + Math.sin(t * 0.72) * 0.08;
    group.scale.setScalar(pulse);

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1 + Math.sin(t * 1.4 + 0.8) * 0.08);
    }

    if (innerGlowRef.current) {
      innerGlowRef.current.rotation.y = -t * 0.16;
      innerGlowRef.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.06);
    }

    if (coreLightRef.current) {
      coreLightRef.current.rotation.z = Math.sin(t * 0.9) * 0.12;
      coreLightRef.current.scale.setScalar(1 + Math.sin(t * 3.2 + 0.4) * 0.08);
    }

    lineRefs.current.forEach((lineGroup, index) => {
      if (!lineGroup) return;

      const lineObject = lineGroup.children[0] as
        | {
            material?: {
              opacity?: number;
            };
          }
        | undefined;
      if (!lineObject?.material) return;

      const energy =
        0.45 +
        (Math.sin(t * 2.8 + index * 0.23) + Math.cos(t * 1.4 + index * 0.11)) *
          0.18;
      lineObject.material.opacity = THREE.MathUtils.clamp(
        0.16 + energy * 0.24,
        0.16,
        0.38,
      );
    });

    streamRefs.current.forEach((streamGroup, index) => {
      if (!streamGroup) return;

      streamGroup.rotation.x = Math.sin(t * 0.5 + index) * 0.18;
      streamGroup.rotation.y = t * (0.22 + index * 0.03);
      streamGroup.rotation.z = Math.cos(t * 0.7 + index * 0.4) * 0.22;

      const glow = 0.28 + (Math.sin(t * 2.1 + index * 1.3) + 1) * 0.18;
      streamGroup.children.forEach((child: ThreeObject3D) => {
        const material = (child as { material?: { opacity?: number } })
          .material;
        if (material?.opacity !== undefined) {
          material.opacity = glow;
        }
      });
    });
  });

  return (
    <group ref={groupRef} position={[0.25, 114, -8]}>
      <Points positions={densePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#efe9ff"
          size={0.046}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={shellPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#b9a8ff"
          size={0.034}
          sizeAttenuation
          depthWrite={false}
          opacity={0.76}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={glitterPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff8ff"
          size={0.026}
          sizeAttenuation
          depthWrite={false}
          opacity={0.42}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Points positions={nodeArray} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f6efff"
          size={0.09}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {connections.map((segment, index) => (
        <group
          key={index}
          ref={(group: ThreeGroup | null) => {
            lineRefs.current[index] = group;
          }}
        >
          <Line
            points={segment}
            color="#c6b5ff"
            transparent
            opacity={0.28}
            lineWidth={0.72}
          />
        </group>
      ))}

      {innerStreamArrays.map((streamArray, index) => (
        <group
          key={`stream-${index}`}
          ref={(group: ThreeGroup | null) => {
            streamRefs.current[index] = group;
          }}
        >
          <Points positions={streamArray} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={index % 2 === 0 ? "#fff7ff" : "#b9a4ff"}
              size={0.056}
              sizeAttenuation
              depthWrite={false}
              opacity={0.32}
              blending={THREE.AdditiveBlending}
            />
          </Points>
          <Points positions={streamArray} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color="#f7eaff"
              size={0.026}
              sizeAttenuation
              depthWrite={false}
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </Points>
        </group>
      ))}

      <group ref={coreLightRef}>
        <mesh>
          <sphereGeometry args={[0.18, 18, 18]} />
          <meshBasicMaterial
            color="#fff8ff"
            transparent
            opacity={0.96}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.44, 20, 20]} />
          <meshBasicMaterial
            color="#bdaaff"
            transparent
            opacity={0.36}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#cbb8ff" intensity={5.6} distance={7.2} decay={2} />
        <NeuralCoreShell />
      </group>

      <group ref={innerGlowRef}>
        <mesh>
          <sphereGeometry args={[0.92, 24, 24]} />
          <meshBasicMaterial
            color="#a592ff"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[0.45, 0.65, 0.15]}>
          <sphereGeometry args={[0.72, 20, 20]} />
          <meshBasicMaterial
            color="#efe3ff"
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={haloRef}>
        <mesh>
          <sphereGeometry args={[1.86, 24, 24]} />
          <meshBasicMaterial
            color="#8d7be0"
            transparent
            opacity={0.17}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.18, 28, 28]} />
          <meshBasicMaterial
            color="#5b5383"
            transparent
            opacity={0.11}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.62, 32, 32]} />
          <meshBasicMaterial
            color="#f3deff"
            transparent
            opacity={0.045}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
