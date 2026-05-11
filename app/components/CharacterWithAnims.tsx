"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useLoader,
  type RootState,
} from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Stars,
  useFBX,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

import { StaticGLB } from "./StaticGlb";

type AnimDef = { name: string; url: string };
type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreeObject3D = InstanceType<typeof THREE.Object3D>;
type ThreeAnimationMixer = InstanceType<typeof THREE.AnimationMixer>;
type ThreeAnimationClip = Parameters<ThreeAnimationMixer["clipAction"]>[0];
type AnimationActionMap = Record<string, ReturnType<ThreeAnimationMixer["clipAction"]>>;
type FBXAsset = ThreeGroup & { animations: ThreeAnimationClip[] };

function SimpleRoom({
  width = 10,
  depth = 10,
  height = 5,
  wallThickness = 0.25,
  floorThickness = 0.2,
  ceilingThickness = 0.2,
}: {
  width?: number;
  depth?: number;
  height?: number;
  wallThickness?: number;
  floorThickness?: number;
  ceilingThickness?: number;
}) {
  const floorTex = useTexture(
    "/models/textures/textur-gas-kvas-com-7hme-p-teksturi-pol-parket-1.jpg"
  );
  const wallTex = useTexture(
    "/models/textures/0fc7afd1563eec5c52d610699bd6e893.jpg"
  );
  const ceilingTex = useTexture(
    "/models/textures/7i3kovkzemoqexiipwnnqdgsxzfju7va.jpg"
  );

  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: floorTex,
        roughness: 0.6,
        metalness: 0,
      }),
    [floorTex]
  );
  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wallTex,
        roughness: 0.95,
        metalness: 0,
      }),
    [wallTex]
  );
  const ceilingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ceilingTex,
        roughness: 0.98,
        metalness: 0,
      }),
    [ceilingTex]
  );

  const halfW = width / 2;
  const halfD = depth / 2;

  return (
    <group>
      <mesh position={[0, -floorThickness / 2, 0]} receiveShadow>
        <boxGeometry args={[width, floorThickness, depth]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      <mesh position={[0, height + ceilingThickness / 2, 0]} receiveShadow>
        <boxGeometry args={[width, ceilingThickness, depth]} />
        <primitive object={ceilingMat} attach="material" />
      </mesh>

      <mesh
        position={[0, height / 2, -halfD - wallThickness / 2]}
        receiveShadow
      >
        <boxGeometry args={[width, height, wallThickness]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      <mesh position={[halfW + wallThickness / 2, height / 2, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, height, depth]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
    </group>
  );
}

function SpaceBackground() {
  return (
    <Stars
      radius={120}
      depth={60}
      count={8000}
      factor={4}
      saturation={0}
      fade
      speed={0.6}
    />
  );
}

function CodeArtModel() {
  const { scene } = useGLTF("/models/codeart.glb");
  const groupRef = useRef<ThreeGroup | null>(null);

  return (
    <group ref={groupRef} scale={5} position={[0, 6.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CharacterWithAnimsInner({
  modelUrl,
  animations,
  scale = 0.01,
  defaultAnim,
}: {
  modelUrl: string;
  animations: AnimDef[];
  scale?: number;
  defaultAnim?: string;
}) {
  const modelAsset = useFBX(modelUrl) as FBXAsset;
  const animationUrls = useMemo(
    () => animations.map((animation) => animation.url),
    [animations]
  );
  const animAssets = useLoader(FBXLoader, animationUrls) as FBXAsset[];
  const model = useMemo(
    () => SkeletonUtils.clone(modelAsset) as ThreeGroup,
    [modelAsset]
  );
  const mixerRef = useRef<ThreeAnimationMixer | null>(null);
  const actionsRef = useRef<AnimationActionMap>({});
  const [current, setCurrent] = useState(defaultAnim ?? animations[0]?.name);

  useEffect(() => {
    model.traverse((object: ThreeObject3D) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    const mixer = new THREE.AnimationMixer(model);
    mixerRef.current = mixer;

    const actions: AnimationActionMap = {};
    animations.forEach((animation, index) => {
      const clip = animAssets[index]?.animations?.[0];
      if (!clip) return;
      clip.name = animation.name;
      actions[animation.name] = mixer.clipAction(clip);
    });

    actionsRef.current = actions;

    if (current && actions[current]) {
      actions[current].reset().fadeIn(0.15).play();
    }

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
      actionsRef.current = {};
    };
  }, [animAssets, animations, current, model]);

  useEffect(() => {
    const actions = actionsRef.current;
    const nextAction = current ? actions[current] : undefined;
    if (!nextAction) return;

    Object.values(actions).forEach((action) => {
      if (action !== nextAction) {
        action.fadeOut(0.15);
      }
    });

    nextAction.reset().fadeIn(0.15).play();
  }, [current]);

  useFrame((_state: RootState, delta: number) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group scale={scale} position={[0, 0.5, 0]}>
      <Html
        transform
        position={[0, 200, 0]}
        center
        distanceFactor={8}
        scale={30}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "rgba(0,0,0,.5)",
            padding: 8,
            borderRadius: 8,
          }}
        >
          {animations.map((animation) => (
            <button
              key={animation.name}
              onClick={() => setCurrent(animation.name)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                margin: 20,
              }}
            >
              {animation.name}
            </button>
          ))}
        </div>
      </Html>
      <primitive object={model} />
    </group>
  );
}

export function CharacterFbxCanvas(props: {
  modelUrl: string;
  animations: AnimDef[];
  scale?: number;
  defaultAnim?: string;
}) {
  return (
    <div style={{ width: "100%", height: 600 }}>
      <Canvas shadows camera={{ position: [-4, 4, 15], fov: 40 }}>
        <color attach="background" args={["#050510"]} />
        <SpaceBackground />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <CodeArtModel />
          <SimpleRoom />
          <CharacterWithAnimsInner {...props} />
          <StaticGLB
            url="/models/noteBook.glb"
            position={[0, 2.25, 1.25]}
            scale={0.65}
            rotation={[0, 3, 0]}
          />
          <StaticGLB
            url="/models/tableWood.glb"
            position={[-0.5, 0.9, 1.9]}
            scale={1.9}
            rotation={[0, 3.15, 0]}
          />
          <StaticGLB
            url="/models/Office_Comfort_1213133208_texture.glb"
            scale={1.4}
            position={[0, 1.33, 0]}
          />
        </Suspense>

        <OrbitControls target={[0, 1, 0]} enableRotate={false} enableDamping />
      </Canvas>
    </div>
  );
}
