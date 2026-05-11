import type { Point3, ReliefRing } from "./types";

const fract = (value: number) => value - Math.floor(value);

export const floorBounds = {
  minX: -30,
  maxX: 30,
  nearZ: -1.2,
  farZ: -59,
};

export const floorHeight = (x: number, z: number) => {
  const distanceX = Math.abs(x) / 14;
  const distanceZ = Math.abs(z + 11.5) / 12;
  const edgeWeight = Math.min(1, distanceX * 1.25 + distanceZ * 0.45);

  const sharpWaveA =
    Math.sign(Math.sin(x * 0.34 + z * 0.16)) *
    Math.abs(Math.sin(x * 0.34 + z * 0.16)) ** 2.8 *
    0.2;
  const sharpWaveB =
    Math.sign(Math.cos(z * 0.22 - x * 0.12)) *
    Math.abs(Math.cos(z * 0.22 - x * 0.12)) ** 3.1 *
    0.16;
  const ridgeNoise =
    Math.sign(Math.sin(x * 0.95) * Math.cos(z * 0.42)) *
      Math.abs(Math.sin(x * 0.95) * Math.cos(z * 0.42)) ** 2.6 *
      0.1 +
    Math.sign(Math.sin((x + z) * 0.55)) *
      Math.abs(Math.sin((x + z) * 0.55)) ** 2.4 *
      0.08;

  const edgeSpikes =
    Math.max(0, 1 - Math.abs(x + 10.6) / 2.2) ** 3.8 *
      Math.max(0, 1 - Math.abs(z + 7.8) / 4.2) ** 2.4 *
      1.1 +
    Math.max(0, 1 - Math.abs(x - 10.9) / 2.3) ** 3.8 *
      Math.max(0, 1 - Math.abs(z + 8.6) / 4) ** 2.5 *
      1.05;

  const leftPeak =
    Math.exp(-((x + 9.2) ** 2) / 7.2 - (z + 7.4) ** 2 / 16) * 1.8;
  const rightPeak =
    Math.exp(-((x - 9.8) ** 2) / 7.6 - (z + 8.8) ** 2 / 15) * 1.7;
  const farLeftRidge =
    Math.exp(-((x + 11.8) ** 2) / 8.4 - (z + 15.6) ** 2 / 18) * 1.2;
  const farRightRidge =
    Math.exp(-((x - 11.6) ** 2) / 8.8 - (z + 16.8) ** 2 / 20) * 1.15;
  const backPeak =
    Math.exp(-((x + 0.8) ** 2) / 18 - (z + 20.4) ** 2 / 8.5) * 0.95;
  const centerValley =
    Math.exp(-((x - 0.2) ** 2) / 26 - (z + 11.8) ** 2 / 30) * -0.42;

  return (
    (sharpWaveA + sharpWaveB + ridgeNoise) * (0.35 + edgeWeight * 1.45) +
    edgeSpikes +
    leftPeak +
    rightPeak +
    farLeftRidge +
    farRightRidge +
    backPeak +
    centerValley
  );
};

export const makeHorizontalRelief = (z: number): Point3[] => {
  return Array.from({ length: 65 }, (_, index) => {
    const x =
      floorBounds.minX +
      index * ((floorBounds.maxX - floorBounds.minX) / 64);
    return [x, floorHeight(x, z), z];
  });
};

export const makeVerticalRelief = (x: number): Point3[] => {
  return Array.from({ length: 68 }, (_, index) => {
    const z =
      floorBounds.nearZ +
      index * ((floorBounds.farZ - floorBounds.nearZ) / 67);
    return [x, floorHeight(x, z), z];
  });
};

export const makeDiagonalRelief = (offset: number): Point3[] => {
  return Array.from({ length: 24 }, (_, pointIndex) => {
    const progress = pointIndex / 23;
    const x = offset + progress * 3.8;
    const z = -2.5 - progress * 16;
    return [x, floorHeight(x, z) + 0.01, z];
  });
};

export const makeFlowRelief = (
  startX: number,
  startZ: number,
  bend: number,
  seed: number
): Point3[] => {
  const targetX = 0.25;
  const targetZ = -8;

  return Array.from({ length: 72 }, (_, index) => {
    const progress = index / 71;
    const ease = progress * progress * (3 - 2 * progress);
    const wave = Math.sin(progress * Math.PI);
    const x =
      startX * (1 - ease) +
      targetX * ease +
      Math.sin(progress * Math.PI * 2.2 + seed) * wave * bend;
    const z =
      startZ * (1 - ease) +
      targetZ * ease +
      Math.cos(progress * Math.PI * 1.7 + seed) * wave * bend * 0.5;

    return [x, floorHeight(x, z) + 0.035 + wave * 0.03, z];
  });
};

export const makeSurfaceParticles = (count: number): Point3[] => {
  return Array.from({ length: count }, (_, index) => {
    const u = fract(Math.sin(index * 12.9898) * 43758.5453);
    const v = fract(Math.sin(index * 78.233) * 24634.6345);
    const x = floorBounds.minX + u * (floorBounds.maxX - floorBounds.minX);
    const z = floorBounds.nearZ + v * (floorBounds.farZ - floorBounds.nearZ);
    const y = floorHeight(x, z) + 0.045;

    return [x, y, z];
  });
};

export const makeRingRelief = (
  innerRadius: number,
  outerRadius: number,
  zOffset: number
): ReliefRing => {
  const segments = 96;
  const inner: Point3[] = [];
  const outer: Point3[] = [];

  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    const innerX = Math.cos(angle) * innerRadius;
    const innerZ = zOffset + Math.sin(angle) * innerRadius;
    const outerX = Math.cos(angle) * outerRadius;
    const outerZ = zOffset + Math.sin(angle) * outerRadius;

    inner.push([innerX, floorHeight(innerX, innerZ) + 0.012, innerZ]);
    outer.push([outerX, floorHeight(outerX, outerZ) + 0.016, outerZ]);
  }

  return { inner, outer };
};
