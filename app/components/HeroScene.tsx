// app/components/HeroScene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Stars,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { RootState } from "@react-three/fiber";
import { Planet } from "./Planet";

type ThreeGroup = InstanceType<typeof THREE.Group>;

function CodeArtModel() {
  const { scene } = useGLTF("/models/codeart.glb");
  const groupRef = useRef<ThreeGroup | null>(null);

  useFrame((state: RootState) => {
    const t = state.clock.getElapsedTime();
    const g = groupRef.current;
    if (!g) return;

    // мягкое вращение
    g.rotation.y = Math.sin(t * 0.3) * 0.35;

    // плавание вверх-вниз
    g.position.y = Math.sin(t * 0.7) * 0.25;

    // лёгкое "дыхание" масштабом
    const s = 1 + Math.sin(t * 1.2) * 0.05;
    g.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/codeart.glb");

// заранее подгружаем
useGLTF.preload("/models/codeart.glb");

function SpaceBackground() {
  return (
    <>
      {/* звёздное небо */}
      <Stars
        radius={120} // радиус сферы звёзд
        depth={60} // глубина "слоёв"
        count={8000} // количество звёзд
        factor={4} // размер
        saturation={0}
        fade
        speed={0.6} // лёгкое движение
      />
    </>
  );
}

export default function HeroScene() {
  const [, setScroll] = useState(0); // 0..1

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;

      const progress = max > 0 ? window.scrollY / max : 0;
      setScroll(Math.min(Math.max(progress, 0), 1)); // clamp 0..1
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // посчитать стартовое значение
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-screen h-screen">
      <Canvas
        dpr={[1, 1.5]} // ограничим DPI для производительности
        camera={{ position: [0, 1.2, 5], fov: 35 }}
      >
        {/* фон */}
        <color attach="background" args={["#161623"]} />

        {/* свет */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />
        <directionalLight position={[-3, -2, -2]} intensity={0.4} />

        {/* окружение для красивого металла (отражения) */}
        <Suspense fallback={null}>
          <SpaceBackground />
          <Environment preset="sunset" />
          <CodeArtModel />
          <Planet
            texturePath="/textures/Solarsystemscope_texture_8k_mars.jpg"
            position={[-4, 1.5, -8]}
            scale={1.8}
          />
          <Planet
            texturePath="/textures/2k_earth_daymap.jpg"
            position={[3.5, -2.5, -6]}
            scale={1.1}
          />
          <Text
            position={[0, -1.4, 0]} // немного ниже логотипа
            fontSize={0.35} // размер (в единицах сцены)
            color="#f5f5f5"
            anchorX="center" // выравнивание по центру
            anchorY="top"
            maxWidth={4} // перенос строк, если текст длинный
            lineHeight={1.3}
            outlineWidth={0.01} // лёгкий контур, чтобы читалось на фоне
            outlineColor="black"
          >
            Digital 3D & Web Experiences
          </Text>
        </Suspense>

        {/* управление мышкой (ограниченное вращение) */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
