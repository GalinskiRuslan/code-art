"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { CenterEnergyBeam } from "./digital-floor/CenterEnergyBeam";
import { CenterParticleVortex } from "./digital-floor/CenterParticleVortex";
import { FloorGrid } from "./digital-floor/FloorGrid";
import { FloorParticles } from "./digital-floor/FloorParticles";
import { GridGlowNodes } from "./digital-floor/GridGlowNodes";
import { GridImpulses } from "./digital-floor/GridImpulses";
import { GlowTiles } from "./digital-floor/GlowTiles";
import { PortalRingModel } from "./digital-floor/PortalRingModel";

type ThreeGroup = InstanceType<typeof THREE.Group>;

export function DigitalFloor() {
  const groupRef = useRef<ThreeGroup | null>(null);

  useFrame((state: RootState) => {
    const group = groupRef.current;
    if (!group) return;

    group.position.y =
      -1.15 + Math.sin(state.clock.getElapsedTime() * 0.35) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -1.15, 0]}>
      <FloorGrid />
      <GridGlowNodes />
      <GridImpulses />
      <FloorParticles />
      <GlowTiles />
      <PortalRingModel />
      <CenterEnergyBeam />
      <CenterParticleVortex />
    </group>
  );
}
