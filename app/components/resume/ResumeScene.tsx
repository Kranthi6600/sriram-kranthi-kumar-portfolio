"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh, Group } from "three";

/* -------------------- Resume Document -------------------- */
function ResumeDocument() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.1;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#b65ff8"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Floating Icons -------------------- */
function ResumeIcon({ position, icon }: { position: [number, number, number]; icon: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.08]} />
        <meshStandardMaterial
          color="#5416b5"
          emissive="#7F3AA1"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Particles -------------------- */
function ResumeParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: Math.random() * 0.03 + 0.01,
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useFrame((_, delta) => {
    particles.forEach((particle, i) => {
      particle.position[1] += delta * particle.speed * 0.1;
      if (particle.position[1] > 3) {
        particle.position[1] = -3;
      }
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale]} />
          <meshStandardMaterial
            color="#977DFF"
            emissive="#b65ff8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- Scene -------------------- */
export default function ResumeScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 4, 5]} intensity={1.0} color="#b65ff8" />
        <pointLight position={[-5, -3, 4]} intensity={0.8} color="#5416b5" />
        <pointLight position={[0, 6, 0]} intensity={0.6} color="#977DFF" />

        <ResumeDocument />
        <ResumeIcon position={[2, 1.5, 0]} icon="📄" />
        <ResumeIcon position={[-2, -1, 1]} icon="💼" />
        <ResumeIcon position={[1.5, -1.5, -1]} icon="🎯" />
        <ResumeParticles />
      </Canvas>
    </div>
  );
}
