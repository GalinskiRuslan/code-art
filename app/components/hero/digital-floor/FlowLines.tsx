"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";

import { makeFlowRelief } from "./relief";

const flowConfigs = [
  [-0.3, -22.8, 0.55, 0.3],
  [-12.4, -4.8, 0.95, 1.4],
  [12.8, -5.5, -0.85, 2.2],
  [-11.2, -18.8, -0.72, 3.4],
  [11.6, -18.2, 0.74, 4.6],
] as const;

export function FlowLines() {
  const flows = useMemo(() => {
    return flowConfigs.map(([startX, startZ, bend, seed]) =>
      makeFlowRelief(startX, startZ, bend, seed)
    );
  }, []);

  return (
    <>
      {flows.map((points, index) => (
        <group key={index}>
          <Line
            points={points}
            color="#5b5383"
            transparent
            opacity={0.18}
            lineWidth={2.2}
          />
          <Line
            points={points}
            color="#c6b5ff"
            transparent
            opacity={0.16}
            lineWidth={0.8}
          />
          <Line
            points={points}
            color="#ffffff"
            transparent
            opacity={0.18}
            lineWidth={0.35}
          />
        </group>
      ))}
    </>
  );
}
