"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh, Group } from "three";

/* -------------------- Office Building -------------------- */
function OfficeBuilding() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.1;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0006) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial
          color="#5416b5"
          emissive="#7F3AA1"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Laptop -------------------- */
function Laptop() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.12;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={meshRef} position={[2, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial
          color="#b65ff8"
          emissive="#977DFF"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Coffee Cup -------------------- */
function CoffeeCup() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.4;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0012) * 0.1;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-1.8, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3]} />
        <meshStandardMaterial
          color="#7F3AA1"
          emissive="#5416b5"
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Floating Icons -------------------- */
function WorkIcon({ position, icon }: { position: [number, number, number]; icon: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.6;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.06]} />
        <meshStandardMaterial
          color="#977DFF"
          emissive="#b65ff8"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Particles -------------------- */
function ExperienceParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      scale: Math.random() * 0.025 + 0.01,
      speed: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  useFrame((_, delta) => {
    particles.forEach((particle, i) => {
      particle.position[1] += delta * particle.speed * 0.1;
      if (particle.position[1] > 2.5) {
        particle.position[1] = -2.5;
      }
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale]} />
          <meshStandardMaterial
            color="#b65ff8"
            emissive="#977DFF"
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
export default function ExperienceScene() {
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

        <OfficeBuilding />
        <Laptop />
        <CoffeeCup />
        <WorkIcon position={[1.5, 1.2, 0]} icon="💼" />
        <WorkIcon position={[-1.5, -1, 1]} icon="🚀" />
        <WorkIcon position={[0.8, -1.2, -1]} icon="⚡" />
        <ExperienceParticles />
      </Canvas>
    </div>
  );
}
