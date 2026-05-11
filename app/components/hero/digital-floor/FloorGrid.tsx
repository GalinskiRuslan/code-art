"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";

import {
  floorBounds,
  makeHorizontalRelief,
  makeVerticalRelief,
} from "./relief";

export function FloorGrid() {
  const centerHorizontalLine = useMemo(() => makeHorizontalRelief(-8), []);
  const centerVerticalLine = useMemo(() => makeVerticalRelief(0.25), []);
  const horizontalLines = useMemo(() => {
    return Array.from({ length: 62 }, (_, index) => {
      const z =
        floorBounds.nearZ +
        index * ((floorBounds.farZ - floorBounds.nearZ) / 61);
      return makeHorizontalRelief(z);
    });
  }, []);

  const verticalLines = useMemo(() => {
    return Array.from({ length: 45 }, (_, index) => {
      const x =
        floorBounds.minX +
        index * ((floorBounds.maxX - floorBounds.minX) / 44);
      return makeVerticalRelief(x);
    });
  }, []);

  return (
    <>
      {horizontalLines.map((points, index) => (
        <Line
          key={`h-${index}`}
          points={points}
          color="#756fc4"
          transparent
          opacity={index > 38 ? 0.07 : 0.14}
          lineWidth={index > 38 ? 0.3 : 0.42}
        />
      ))}

      {verticalLines.map((points, index) => (
        <Line
          key={`v-${index}`}
          points={points}
          color="#8b80df"
          transparent
          opacity={0.1}
          lineWidth={0.36}
        />
      ))}

      <Line
        points={centerHorizontalLine}
        color="#8b80df"
        transparent
        opacity={0.14}
        lineWidth={0.42}
      />
      <Line
        points={centerVerticalLine}
        color="#8b80df"
        transparent
        opacity={0.14}
        lineWidth={0.42}
      />
    </>
  );
}
