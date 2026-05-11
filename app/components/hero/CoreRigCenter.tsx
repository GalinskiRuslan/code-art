import * as THREE from "three";

export function CoreRings() {
  return (
    <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[1.2, 1.24, 128]} />
        <meshBasicMaterial
          color="#caa8ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[1.55, 1.59, 128]} />
        <meshBasicMaterial
          color="#a98cff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[2.0, 2.04, 128]} />
        <meshBasicMaterial
          color="#7f6dff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
