export type SceneKey = "hero" | "lab" | "finale";

export type SceneThreshold = {
  key: SceneKey;
  start: number;
  end: number;
};

export const sceneThresholds: SceneThreshold[] = [
  { key: "hero", start: 0, end: 0.28 },
  { key: "lab", start: 0.34, end: 0.7 },
  { key: "finale", start: 0.8, end: 1 },
];

export function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function rangeProgress(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const x = rangeProgress(value, edge0, edge1);
  return x * x * (3 - 2 * x);
}
