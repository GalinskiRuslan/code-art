import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type ThreeObject3D = InstanceType<typeof THREE.Object3D>;

export function StaticGLB({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((o: ThreeObject3D) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return (
    <primitive object={model} position={position} rotation={rotation} scale={scale} />
  );
}

// важно для drei кеша
useGLTF.preload("/models/noteBook.glb");
useGLTF.preload("/models/tableWood.glb");
