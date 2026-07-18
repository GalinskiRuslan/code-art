"use client";

import { Line } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { floorBounds, floorHeight } from "./relief";

type ThreeSprite = InstanceType<typeof THREE.Sprite>;
type ThreeSpriteMaterial = InstanceType<typeof THREE.SpriteMaterial>;
type ThreeTexture = InstanceType<typeof THREE.Texture>;
type Point2 = [number, number];
type Point3 = [number, number, number];
type DynamicLine = InstanceType<typeof THREE.Object3D> & {
  geometry: {
    setPositions: (positions: number[]) => void;
  };
  computeLineDistances?: () => void;
};

type ImpulsePath = {
  nodes: Point2[];
  lengths: number[];
  totalLength: number;
  duration: number;
  seed: number;
};

type PathSample = {
  point: Point2;
  segmentIndex: number;
};

const impulseColor = "#f3deff";
const centerPoint: Point2 = [0.25, -8];
const activeImpulseCount = 30;
const horizontalLineCount = 62;
const verticalLineCount = 45;
const trailLengthRatio = 0.026;
const trailPointCount = 14;

const fract = (value: number) => value - Math.floor(value);
const randomFor = (index: number, salt: number) => {
  return fract(Math.sin(index * 43.231 + salt * 91.17) * 72843.317);
};

const horizontalLane = (index: number) => {
  return (
    floorBounds.nearZ +
    THREE.MathUtils.clamp(index, 0, horizontalLineCount - 1) *
      ((floorBounds.farZ - floorBounds.nearZ) / (horizontalLineCount - 1))
  );
};

const verticalLane = (index: number) => {
  return (
    floorBounds.minX +
    THREE.MathUtils.clamp(index, 0, verticalLineCount - 1) *
      ((floorBounds.maxX - floorBounds.minX) / (verticalLineCount - 1))
  );
};

const horizontalLaneIndex = (ratio: number) => {
  return Math.floor(THREE.MathUtils.clamp(ratio, 0, 0.999) * horizontalLineCount);
};

const verticalLaneIndex = (ratio: number) => {
  return Math.floor(THREE.MathUtils.clamp(ratio, 0, 0.999) * verticalLineCount);
};

const centerVerticalIndex = verticalLaneIndex(
  (centerPoint[0] - floorBounds.minX) / (floorBounds.maxX - floorBounds.minX)
);
const centerHorizontalIndex = horizontalLaneIndex(
  (centerPoint[1] - floorBounds.nearZ) / (floorBounds.farZ - floorBounds.nearZ)
);

const nodeToPoint = ([xIndex, zIndex]: [number, number]): Point2 => {
  return [verticalLane(xIndex), horizontalLane(zIndex)];
};

const pushNode = (nodes: [number, number][], node: [number, number]) => {
  const previous = nodes[nodes.length - 1];
  if (previous && previous[0] === node[0] && previous[1] === node[1]) return;

  nodes.push(node);
};

const makeGlowTexture = () => {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  const center = (size - 1) / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = (x - center) / center;
      const dy = (y - center) / center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const core = Math.max(0, 1 - distance * 1.35) ** 1.35;
      const glow = Math.max(0, 1 - distance) ** 3.4;
      const alpha = Math.min(1, core * 0.92 + glow * 0.58);
      const index = (y * size + x) * 4;

      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
      data[index + 3] = Math.round(alpha * 255);
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;

  return texture;
};

const pickEdgeStart = (index: number): [number, number] => {
  const edge = index % 4;

  if (edge === 0) {
    return [0, horizontalLaneIndex(randomFor(index, 1))];
  }

  if (edge === 1) {
    return [verticalLineCount - 1, horizontalLaneIndex(randomFor(index, 2))];
  }

  if (edge === 2) {
    return [verticalLaneIndex(randomFor(index, 3)), horizontalLineCount - 1];
  }

  return [verticalLaneIndex(randomFor(index, 4)), 0];
};

const pickCenterTarget = (index: number): [number, number] => {
  const ringNodes: [number, number][] = [
    [centerVerticalIndex, centerHorizontalIndex],
    [centerVerticalIndex - 1, centerHorizontalIndex],
    [centerVerticalIndex + 1, centerHorizontalIndex],
    [centerVerticalIndex, centerHorizontalIndex - 1],
    [centerVerticalIndex, centerHorizontalIndex + 1],
    [centerVerticalIndex - 1, centerHorizontalIndex - 1],
    [centerVerticalIndex + 1, centerHorizontalIndex - 1],
    [centerVerticalIndex - 1, centerHorizontalIndex + 1],
    [centerVerticalIndex + 1, centerHorizontalIndex + 1],
  ];

  return ringNodes[index % ringNodes.length];
};

const makeImpulsePath = (index: number): ImpulsePath => {
  const start = pickEdgeStart(index);
  const target = pickCenterTarget(index);
  const nodes: [number, number][] = [start];
  const edge = index % 4;
  const turnCount = 3 + Math.floor(randomFor(index, 5) * 3);
  let current: [number, number] = start;
  let axis: "x" | "z" = randomFor(index, 6) > 0.5 ? "x" : "z";

  for (let turn = 0; turn < turnCount; turn += 1) {
    const toTargetWeight = turn / Math.max(1, turnCount - 1);
    const noise = THREE.MathUtils.lerp(-9, 9, randomFor(index, 10 + turn));

    if (axis === "x") {
      const targetX = Math.round(
        THREE.MathUtils.lerp(current[0], target[0], 0.35 + toTargetWeight * 0.36) +
          noise
      );
      current = [
        THREE.MathUtils.clamp(targetX, 0, verticalLineCount - 1),
        current[1],
      ];
    } else {
      const targetZ = Math.round(
        THREE.MathUtils.lerp(current[1], target[1], 0.35 + toTargetWeight * 0.36) +
          noise
      );
      current = [
        current[0],
        THREE.MathUtils.clamp(targetZ, 0, horizontalLineCount - 1),
      ];
    }

    pushNode(nodes, current);
    axis = axis === "x" ? "z" : "x";
  }

  if (axis === "x") {
    pushNode(nodes, [target[0], current[1]]);
    pushNode(nodes, target);
  } else {
    pushNode(nodes, [current[0], target[1]]);
    pushNode(nodes, target);
  }

  if (edge === 0 || edge === 1) {
    pushNode(nodes, [target[0], target[1]]);
  }

  const points = nodes.map(nodeToPoint);
  const lengths = points.slice(0, -1).map((point, pointIndex) => {
    const next = points[pointIndex + 1];
    const dx = next[0] - point[0];
    const dz = next[1] - point[1];

    return Math.sqrt(dx * dx + dz * dz);
  });
  const totalLength = lengths.reduce((sum, length) => sum + length, 0);

  return {
    nodes: points,
    lengths,
    totalLength,
    duration: THREE.MathUtils.lerp(7.6, 13.4, randomFor(index, 16)),
    seed: randomFor(index, 17) * Math.PI * 2,
  };
};

const makeGridPaths = (count: number): ImpulsePath[] => {
  return Array.from({ length: count }, (_, index) => makeImpulsePath(index));
};

const samplePath3 = (
  path: ImpulsePath,
  progress: number,
  lift: number
): Point3 => {
  let distance = path.totalLength * THREE.MathUtils.clamp(progress, 0, 1);
  let point = path.nodes[path.nodes.length - 1];

  for (let index = 0; index < path.lengths.length; index += 1) {
    const length = path.lengths[index];

    if (distance <= length || index === path.lengths.length - 1) {
      const start = path.nodes[index];
      const end = path.nodes[index + 1];
      const localProgress = length === 0 ? 1 : distance / length;

      point = [
        THREE.MathUtils.lerp(start[0], end[0], localProgress),
        THREE.MathUtils.lerp(start[1], end[1], localProgress),
      ];
      break;
    }

    distance -= length;
  }

  const [x, z] = point;
  const y = floorHeight(x, z) + lift;

  return [x, y, z];
};

const samplePath2 = (path: ImpulsePath, progress: number): PathSample => {
  let distance = path.totalLength * THREE.MathUtils.clamp(progress, 0, 1);

  for (let index = 0; index < path.lengths.length; index += 1) {
    const length = path.lengths[index];

    if (distance <= length || index === path.lengths.length - 1) {
      const start = path.nodes[index];
      const end = path.nodes[index + 1];
      const localProgress = length === 0 ? 1 : distance / length;

      return {
        point: [
          THREE.MathUtils.lerp(start[0], end[0], localProgress),
          THREE.MathUtils.lerp(start[1], end[1], localProgress),
        ],
        segmentIndex: index,
      };
    }

    distance -= length;
  }

  return {
    point: path.nodes[path.nodes.length - 1],
    segmentIndex: path.nodes.length - 2,
  };
};

const makeTrailSamples = (path: ImpulsePath, progress: number): Point2[] => {
  const startProgress = Math.max(0, progress - trailLengthRatio);
  const startSample = samplePath2(path, startProgress);
  const endSample = samplePath2(path, progress);
  const positions: Array<{ progress: number; point: Point2 }> = [];

  for (let index = 0; index < trailPointCount; index += 1) {
    const localProgress = index / (trailPointCount - 1);
    const sampleProgress = THREE.MathUtils.lerp(
      startProgress,
      progress,
      localProgress
    );

    positions.push({
      progress: sampleProgress,
      point: samplePath2(path, sampleProgress).point,
    });
  }

  let boundaryDistance = path.lengths
    .slice(0, startSample.segmentIndex + 1)
    .reduce((sum, length) => sum + length, 0);

  for (
    let index = startSample.segmentIndex + 1;
    index <= endSample.segmentIndex;
    index += 1
  ) {
    const node = path.nodes[index];
    if (!node) continue;

    const boundaryProgress = boundaryDistance / path.totalLength;

    if (boundaryProgress >= startProgress && boundaryProgress <= progress) {
      positions.push({ progress: boundaryProgress, point: node });
    }

    boundaryDistance += path.lengths[index] ?? 0;
  }

  return positions
    .sort((left, right) => left.progress - right.progress)
    .map(({ point }) => point);
};

const applyLift = (points: Point2[], lift: number): Point3[] =>
  points.map(([x, z]) => [x, floorHeight(x, z) + lift, z] as Point3);

const updateLine = (
  line: DynamicLine | null,
  points: Point3[],
  isVisible: boolean
) => {
  if (!line) return;

  line.visible = isVisible;
  line.geometry.setPositions(points.flat());
  line.computeLineDistances?.();
};

function GridImpulseRunner({
  index,
  paths,
  glowTexture,
}: {
  index: number;
  paths: ImpulsePath[];
  glowTexture: ThreeTexture;
}) {
  const headRef = useRef<ThreeSprite | null>(null);
  const headMaterialRef = useRef<ThreeSpriteMaterial | null>(null);
  const sparkRefs = useRef<(ThreeSprite | null)[]>([]);
  const sparkMaterialRefs = useRef<(ThreeSpriteMaterial | null)[]>([]);
  const haloLineRef = useRef<DynamicLine | null>(null);
  const glowLineRef = useRef<DynamicLine | null>(null);
  const coreLineRef = useRef<DynamicLine | null>(null);

  useFrame((state: RootState) => {
    const t = state.clock.getElapsedTime();
    const basePath = paths[index % paths.length];
    const localTime = t + randomFor(index, 21) * basePath.duration;
    const cycle = Math.floor(localTime / basePath.duration);
    const activePath = paths[(index + cycle * activeImpulseCount) % paths.length];
    const cycleTime = localTime % activePath.duration;
    const progress = THREE.MathUtils.smoothstep(
      cycleTime / activePath.duration,
      0,
      1
    );
    const [x, y, z] = samplePath3(activePath, progress, 0.18);
    const pulse = 1 + Math.sin(t * 7.2 + activePath.seed) * 0.12;

    const head = headRef.current;
    if (head) {
      head.position.set(x, y + 0.035, z);
      head.scale.setScalar(1 * pulse);
    }

    if (headMaterialRef.current) {
      headMaterialRef.current.opacity = 1;
    }

    const visibleTrail = progress > trailLengthRatio * 0.18;
    const trailSamples = makeTrailSamples(activePath, progress);
    updateLine(haloLineRef.current, applyLift(trailSamples, 0.12), visibleTrail);
    updateLine(glowLineRef.current, applyLift(trailSamples, 0.135), visibleTrail);
    updateLine(coreLineRef.current, applyLift(trailSamples, 0.15), visibleTrail);

    sparkRefs.current.forEach((spark, sparkIndex) => {
      if (!spark) return;

      const sparkPhase = fract(t * 0.34 + activePath.seed + sparkIndex * 0.23);
      const sparkProgress = progress - 0.026 * (sparkIndex + 1);
      const isVisible = sparkProgress > 0 && sparkPhase > 0.84;
      spark.visible = isVisible;

      if (!isVisible) return;

      const [sparkX, sparkY, sparkZ] = samplePath3(
        activePath,
        sparkProgress,
        0.24
      );
      const sparkScale = 0.14 + (sparkPhase - 0.84) * 0.36;

      spark.position.set(sparkX, sparkY, sparkZ);
      spark.scale.setScalar(sparkScale);

      const material = sparkMaterialRefs.current[sparkIndex];
      if (material) {
        material.opacity = THREE.MathUtils.clamp((sparkPhase - 0.84) * 4.5, 0, 0.72);
      }
    });
  });

  return (
    <group>
      <Line
        ref={haloLineRef}
        points={[[0, 0, 0], [0, 0, 0]]}
        color="#6c63ff"
        transparent
        opacity={0.035}
        lineWidth={4.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
      <Line
        ref={glowLineRef}
        points={[[0, 0, 0], [0, 0, 0]]}
        color="#b57cff"
        transparent
        opacity={0.12}
        lineWidth={2.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
      <Line
        ref={coreLineRef}
        points={[[0, 0, 0], [0, 0, 0]]}
        color="#f2ddff"
        transparent
        opacity={0.58}
        lineWidth={0.82}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />

      {Array.from({ length: 3 }, (_, sparkIndex) => (
        <sprite
          key={`spark-${sparkIndex}`}
          ref={(sprite: ThreeSprite | null) => {
            sparkRefs.current[sparkIndex] = sprite;
          }}
        >
          <spriteMaterial
            ref={(material: ThreeSpriteMaterial | null) => {
              sparkMaterialRefs.current[sparkIndex] = material;
            }}
            color={impulseColor}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}

      <sprite ref={headRef}>
        <spriteMaterial
          ref={headMaterialRef}
          map={glowTexture}
          color={impulseColor}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

export function GridImpulses() {
  const glowTexture = useMemo(() => makeGlowTexture(), []);
  const paths = useMemo(() => makeGridPaths(180), []);

  return (
    <>
      {Array.from({ length: activeImpulseCount }, (_, index) => (
        <GridImpulseRunner
          key={index}
          index={index}
          paths={paths}
          glowTexture={glowTexture}
        />
      ))}
    </>
  );
}
