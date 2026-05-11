"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { useMemo } from "react";

import { makeSurfaceParticles } from "./relief";

const toArray = (points: [number, number, number][]) => {
  return new Float32Array(points.flat());
};

export function FloorParticles() {
  const violetPoints = useMemo(() => toArray(makeSurfaceParticles(2400)), []);
  const brightPoints = useMemo(() => toArray(makeSurfaceParticles(420)), []);

  return (
    <>
      <Points positions={violetPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#bdaaff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.42}
        />
      </Points>
      <Points positions={brightPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f4f0ff"
          size={0.026}
          sizeAttenuation
          depthWrite={false}
          opacity={0.48}
        />
      </Points>
    </>
  );
}
