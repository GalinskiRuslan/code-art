"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreeMeshStandardMaterial = InstanceType<typeof THREE.MeshStandardMaterial>;

const LETTER_MAP = {
  C: {
    pattern: ["01110", "10001", "10000", "10001", "01110"],
    color: "#60a5fa",
  },
  o: {
    pattern: ["0110", "1001", "1001", "1001", "0110"],
    color: "#a855f7",
  },
  d: {
    pattern: ["00110", "00011", "00001", "00011", "00110"],
    color: "#f59e0b",
  },
  e: {
    pattern: ["0111", "1000", "1110", "1000", "0111"],
    color: "#34d399",
  },
  A: {
    pattern: ["0110", "1001", "1111", "1001", "1001"],
    color: "#f472b6",
  },
  r: {
    pattern: ["1110", "1001", "1110", "1010", "1010"],
    color: "#fb7185",
  },
  t: {
    pattern: ["11111", "00100", "00100", "00100", "00100"],
    color: "#38bdf8",
  },
} as const;

type LetterKey = keyof typeof LETTER_MAP;

const LETTER_ORDER: LetterKey[] = ["C", "o", "d", "e", "A", "r", "t"];

const BOX_SIZE = 0.9;
const BOX_GAP = 0.2;
const LETTER_GAP = 0.6;

type Voxel = {
  position: [number, number, number];
  color: string;
};

type InteractionHandlers = {
  onPointerDown: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLCanvasElement>) => void;
};

function useInteractiveRotation(
  groupRef: React.MutableRefObject<ThreeGroup | null>,
): InteractionHandlers {
  const rotation = useRef({ x: -0.35, y: 0.55 });
  const target = useRef({ x: -0.35, y: 0.55 });
  const velocity = useRef({ x: 0, y: 0 });
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);

  const adjustTarget = useCallback((deltaX: number, deltaY: number) => {
    target.current.y += deltaX;
    target.current.x += deltaY;
    target.current.x = Math.max(-1.2, Math.min(1.2, target.current.x));
    target.current.y = Math.max(-Math.PI, Math.min(Math.PI, target.current.y));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const step = 0.15;
      switch (event.key) {
        case "ArrowLeft":
          adjustTarget(-step, 0);
          break;
        case "ArrowRight":
          adjustTarget(step, 0);
          break;
        case "ArrowUp":
          adjustTarget(0, -step);
          break;
        case "ArrowDown":
          adjustTarget(0, step);
          break;
        default:
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [adjustTarget]);

  useFrame((_state: RootState, delta: number) => {
    if (!groupRef.current) return;
    const smoothing = 6;
    velocity.current.x += (target.current.x - rotation.current.x) * smoothing * delta;
    velocity.current.y += (target.current.y - rotation.current.y) * smoothing * delta;
    velocity.current.x *= Math.exp(-4 * delta);
    velocity.current.y *= Math.exp(-4 * delta);
    rotation.current.x += velocity.current.x;
    rotation.current.y += velocity.current.y;
    groupRef.current.rotation.x = rotation.current.x;
    groupRef.current.rotation.y = rotation.current.y;
  });

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      dragOrigin.current = { x: event.clientX, y: event.clientY };
      (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (!dragOrigin.current) return;
      const deltaX = (event.clientX - dragOrigin.current.x) * 0.006;
      const deltaY = (event.clientY - dragOrigin.current.y) * 0.006;
      dragOrigin.current = { x: event.clientX, y: event.clientY };
      adjustTarget(deltaX, deltaY);
    },
    [adjustTarget],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    dragOrigin.current = null;
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
  }, []);

  const cancelDrag = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      dragOrigin.current = null;
      (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    },
    [],
  );

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: endDrag,
    onPointerLeave: cancelDrag,
  };
}

function useCodeArtVoxels(): Voxel[] {
  return useMemo(() => {
    const voxels: Voxel[] = [];
    let cursorX = 0;
    let minY = Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let maxX = -Infinity;

    LETTER_ORDER.forEach((letterKey) => {
      const { pattern, color } = LETTER_MAP[letterKey];
      const rows = pattern.length;
      const cols = pattern[0].length;

      let minCol = cols;
      let maxCol = 0;
      pattern.forEach((row) => {
        row.split("").forEach((cell, colIndex) => {
          if (cell === "1") {
            minCol = Math.min(minCol, colIndex);
            maxCol = Math.max(maxCol, colIndex);
          }
        });
      });

      if (minCol === cols) {
        minCol = 0;
        maxCol = cols - 1;
      }

      const letterWidth = (maxCol - minCol + 1) * (BOX_SIZE + BOX_GAP);
      const letterOffset = cursorX + letterWidth / 2;

      pattern.forEach((row, rowIndex) => {
        row.split("").forEach((cell, colIndex) => {
          if (cell !== "1") return;
          const x =
            (colIndex - (cols - 1) / 2) * (BOX_SIZE + BOX_GAP) + letterOffset;
          const y = ((rows - 1) / 2 - rowIndex) * (BOX_SIZE + BOX_GAP);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          voxels.push({ position: [x, y, 0], color });
        });
      });

      cursorX += letterWidth + LETTER_GAP;
    });

    if (!voxels.length) return voxels;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return voxels.map(({ position, color }) => ({
      position: [
        position[0] - centerX,
        position[1] - centerY,
        position[2],
      ] as [number, number, number],
      color,
    }));
  }, []);
}

function CodeArtWord({
  groupRef,
}: {
  groupRef: React.MutableRefObject<ThreeGroup | null>;
}) {
  const voxels = useCodeArtVoxels();
  const boxGeometry = useMemo(
    () => new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, 1.1),
    [],
  );

  useEffect(() => () => boxGeometry.dispose(), [boxGeometry]);

  const materialCache = useMemo(() => {
    const cache = new Map<string, ThreeMeshStandardMaterial>();
    voxels.forEach((voxel) => {
      if (!cache.has(voxel.color)) {
        cache.set(
          voxel.color,
          new THREE.MeshStandardMaterial({
            color: voxel.color,
            roughness: 0.45,
            metalness: 0.2,
          }),
        );
      }
    });
    return cache;
  }, [voxels]);

  useEffect(() => () => materialCache.forEach((material) => material.dispose()), [
    materialCache,
  ]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {voxels.map((voxel, index) => (
        <mesh
          key={`voxel-${index}`}
          position={voxel.position}
          geometry={boxGeometry}
          material={materialCache.get(voxel.color)}
          castShadow
          receiveShadow
        />
      ))}
    </group>
  );
}

function SceneFloor() {
  const geometry = useMemo(() => new THREE.PlaneGeometry(120, 120), []);
  const material = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0x060812, shininess: 10 }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
      receiveShadow
    />
  );
}

function SceneGlow() {
  const geometry = useMemo(() => new THREE.PlaneGeometry(60, 60), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x1f2937,
        transparent: true,
        opacity: 0.6,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -4.99, 0]}
    />
  );
}

export function CodeArtScene() {
  const groupRef = useRef<ThreeGroup | null>(null);
  const interaction = useInteractiveRotation(groupRef);

  return (
    <Canvas
      className="h-full w-full"
      shadows
      camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 1000 }}
      onPointerDown={interaction.onPointerDown}
      onPointerMove={interaction.onPointerMove}
      onPointerUp={interaction.onPointerUp}
      onPointerLeave={interaction.onPointerLeave}
      style={{ touchAction: "none", cursor: "grab" }}
      dpr={[1, 2]}
      gl={{ alpha: false, antialias: true }}
    >
      <color attach="background" args={["#05070f"]} />
      <ambientLight intensity={0.6} color={0xffffff} />
      <directionalLight position={[6, 10, 12]} intensity={1.2} castShadow />
      <pointLight position={[-8, -4, -10]} intensity={0.8} color={0x74c0fc} />
      <CodeArtWord groupRef={groupRef} />
      <SceneFloor />
      <SceneGlow />
    </Canvas>
  );
}
