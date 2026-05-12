"use client";

import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Html, OrbitControls, useFBX } from "@react-three/drei";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreeObject3D = InstanceType<typeof THREE.Object3D>;
type ThreeAnimationMixer = InstanceType<typeof THREE.AnimationMixer>;
type ThreeAnimationClip = Parameters<ThreeAnimationMixer["clipAction"]>[0];
type FBXAsset = ThreeGroup & { animations: ThreeAnimationClip[] };

export function FbxModel({ url }: { url: string }) {
  const asset = useFBX(url) as FBXAsset;
  const model = useMemo(() => SkeletonUtils.clone(asset) as ThreeGroup, [asset]);
  const mixerRef = useRef<ThreeAnimationMixer | null>(null);

  useLayoutEffect(() => {
    const clip = asset.animations?.[0];

    model.traverse((object: ThreeObject3D) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    if (clip) {
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      const action = mixer.clipAction(clip);
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [asset, model]);

  useFrame((_state: RootState, delta: number) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={model} scale={0.01} />;
}

export default function CharacterFbxScene() {
  return (
    <div style={{ width: "100%", height: 600 }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 3.2], fov: 45, near: 0.01, far: 5000 }}
        onCreated={(state: RootState) => {
          state.gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial />
        </mesh>

        <Suspense
          fallback={
            <Html center style={{ color: "white" }}>
              Loading FBX...
            </Html>
          }
        >
          <FbxModel url="/models/anims/Typing.fbx" />
        </Suspense>

        <OrbitControls target={[0, 0.9, 0]} enableRotate={false} enableDamping />
        <axesHelper args={[2]} />
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  );
}
