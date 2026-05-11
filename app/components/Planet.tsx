import { useTexture } from "@react-three/drei";

type PlanetProps = {
  texturePath: string;
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
};

export function Planet({
  texturePath,
  position,
  scale = 1,
}: PlanetProps) {
  const map = useTexture(texturePath);

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={map} />
      {/* лёгкая анимация вращения через useFrame можно добавить позже */}
    </mesh>
  );
}
