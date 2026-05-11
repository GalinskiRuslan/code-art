"use client";

import { Html, useFBX } from "@react-three/drei";
import { useFrame, useLoader, type RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

type AnimationDef = { name: string; url: string };

type CharacterProps = {
  modelUrl: string;
  animations: AnimationDef[];
  activeAnimation: string;
  scale?: number;
  position?: [number, number, number];
};

type ThreeGroup = InstanceType<typeof THREE.Group>;
type ThreeObject3D = InstanceType<typeof THREE.Object3D>;
type ThreeAnimationMixer = InstanceType<typeof THREE.AnimationMixer>;
type ThreeAnimationAction = ReturnType<ThreeAnimationMixer["clipAction"]>;
type ThreeAnimationClip = Parameters<ThreeAnimationMixer["clipAction"]>[0];
type FBXAsset = ThreeGroup & { animations: ThreeAnimationClip[] };

export function Character({
  modelUrl,
  animations,
  activeAnimation,
  scale = 0.01,
  position = [0, 0.5, 0],
}: CharacterProps) {
  const modelAsset = useFBX(modelUrl) as FBXAsset;
  const animationUrls = useMemo(
    () => animations.map((item) => item.url),
    [animations]
  );
  const animationAssets = useLoader(FBXLoader, animationUrls) as FBXAsset[];
  const model = useMemo(
    () => SkeletonUtils.clone(modelAsset) as ThreeGroup,
    [modelAsset]
  );
  const mixerRef = useRef<ThreeAnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, ThreeAnimationAction>>({});

  useEffect(() => {
    model.traverse((child: ThreeObject3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const mixer = new THREE.AnimationMixer(model);
    const actions: Record<string, ThreeAnimationAction> = {};

    animations.forEach((animation, index) => {
      const clip = animationAssets[index]?.animations?.[0];
      if (!clip) return;
      clip.name = animation.name;
      actions[animation.name] = mixer.clipAction(clip);
    });

    mixerRef.current = mixer;
    actionsRef.current = actions;

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
      actionsRef.current = {};
    };
  }, [animationAssets, animations, model]);

  useEffect(() => {
    const actions = actionsRef.current;
    const nextAction = actions[activeAnimation];

    if (!nextAction) return;

    Object.values(actions).forEach((action) => {
      if (action !== nextAction) {
        action.fadeOut(0.2);
      }
    });

    nextAction.reset().fadeIn(0.2).play();
  }, [activeAnimation]);

  useFrame((_state: RootState, delta: number) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group scale={scale} position={position}>
      <Html
        transform
        position={[0, 200, 0]}
        center
        distanceFactor={8}
        scale={20}
        style={{ pointerEvents: "none" }}
      >
        <div className="scene-pill">Animated character rig</div>
      </Html>
      <primitive object={model} />
    </group>
  );
}
