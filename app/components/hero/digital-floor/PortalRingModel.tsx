"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

import { floorHeight } from "./relief";

type ThreeObject3D = InstanceType<typeof THREE.Object3D>;
type ThreeMaterial = InstanceType<typeof THREE.Material>;

const portalUrl = "/models/digitalfloor/Neon_Ring_Portal_0425162138_texture.glb";
const portalPosition: [number, number, number] = [
  0.25,
  floorHeight(0.25, -8) + 0.035,
  -8,
];

export function PortalRingModel() {
  const { scene } = useGLTF(portalUrl);

  const model = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child: ThreeObject3D) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material: ThreeMaterial) =>
          material.clone()
        );
      } else {
        child.material = child.material.clone();
      }

      const materials: ThreeMaterial[] = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        material.depthWrite = false;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissive = new THREE.Color("#9d89ff");
          material.emissiveIntensity = 3.2;
          material.roughness = 0.28;
          material.metalness = 0.38;
          material.toneMapped = false;
        }
      });
    });

    return cloned;
  }, [scene]);

  return (
    <group>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.012, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.95, 128]} />
        <meshBasicMaterial
          color="#5b5383"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.016, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.42, 2.75, 128]} />
        <meshBasicMaterial
          color="#d9caff"
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.018, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.62, 2.32, 128]} />
        <meshBasicMaterial
          color="#b8a6ff"
          transparent
          opacity={0.48}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.025, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.26, 128]} />
        <meshBasicMaterial
          color="#fff8ff"
          transparent
          opacity={0.62}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[portalPosition[0], portalPosition[1] + 0.029, portalPosition[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.66, 96]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[portalPosition[0], portalPosition[1] + 0.45, portalPosition[2]]}
        color="#a998ff"
        intensity={7.2}
        distance={9}
        decay={2}
      />
      <primitive
        object={model}
        position={portalPosition}
        rotation={[0, 0, 0]}
        scale={2.22}
      />
    </group>
  );
}

useGLTF.preload(portalUrl);
