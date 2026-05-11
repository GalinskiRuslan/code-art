export type Point3 = [number, number, number];

export type ReliefRing = {
  inner: Point3[];
  outer: Point3[];
};

export type GlowTileConfig = {
  position: Point3;
  scale: Point3;
};
