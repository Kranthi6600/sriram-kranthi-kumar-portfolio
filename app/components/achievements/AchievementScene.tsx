"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

/* -------------------- Trophy Icon -------------------- */
function TrophyIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.12;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Medal Icons -------------------- */
function MedalIcon({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.y += delta * 0.6;
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Star Particles -------------------- */
function StarParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      scale: Math.random() * 0.02 + 0.01,
      speed: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  useFrame((_, delta) => {
    particles.forEach((particle) => {
      particle.position[1] += delta * particle.speed * 0.05;
      if (particle.position[1] > 2) {
        particle.position[1] = -2;
      }
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <octahedronGeometry args={[particle.scale]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFA500"
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- Scene -------------------- */
export default function AchievementScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={0.9} color="#FFD700" />
        <pointLight position={[-4, -3, 3]} intensity={0.7} color="#FFA500" />
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#FFD700" />

        <TrophyIcon />
        <MedalIcon position={[1.8, 1.2, 0]} color="#C0C0C0" />
        <MedalIcon position={[-1.8, -0.8, 1]} color="#CD7F32" />
        <MedalIcon position={[0.5, -1.5, -1]} color="#C0C0C0" />
        <StarParticles />
      </Canvas>
    </div>
  );
}
