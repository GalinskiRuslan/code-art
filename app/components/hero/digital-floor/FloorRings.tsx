"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";

import { makeRingRelief } from "./relief";

export function FloorRings() {
  const innerRing = useMemo(() => makeRingRelief(2.1, 2.9, -8), []);
  const outerRing = useMemo(() => makeRingRelief(3.2, 3.9, -8), []);

  return (
    <>
      <Line
        points={innerRing.inner}
        color="#fff8ff"
        transparent
        opacity={0.68}
        lineWidth={0.65}
      />
      <Line
        points={innerRing.outer}
        color="#d8c8ff"
        transparent
        opacity={0.64}
        lineWidth={0.65}
      />
      <Line
        points={outerRing.inner}
        color="#a897ff"
        transparent
        opacity={0.2}
        lineWidth={0.55}
      />
      <Line
        points={outerRing.outer}
        color="#7469bf"
        transparent
        opacity={0.16}
        lineWidth={0.55}
      />
    </>
  );
}
