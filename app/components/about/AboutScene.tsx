"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function Core() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.15;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial color="#5416b5" emissive="#3b1b78" emissiveIntensity={0.45} metalness={0.35} roughness={0.25} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particles = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; s: number; o: number; c: string; speed: number }> = [];
    for (let i = 0; i < 35; i++) {
      const x = (Math.random() - 0.5) * 7.5;
      const y = (Math.random() - 0.5) * 4.5;
      const z = (Math.random() - 0.5) * 3.5;
      const colors = ["#5416b5", "#b65ff8", "#977DFF"];
      out.push({
        pos: [x, y, z],
        s: 0.03 + Math.random() * 0.06,
        o: 0.35 + Math.random() * 0.4,
        c: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5
      });
    }
    return out;
  }, []);

  const groupRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          <sphereGeometry args={[p.s, 10, 10]} />
          <meshStandardMaterial color={p.c} emissive="#7F3AA1" emissiveIntensity={0.35} transparent opacity={p.o} />
        </mesh>
      ))}
    </group>
  );
}

export default function AboutScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 50 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3.5, 2.2, 3.5]} intensity={1.35} color="#b65ff8" />
        <pointLight position={[-4, -2, 2.5]} intensity={0.9} color="#5416b5" />
        <group position={[1.7, 0.2, 0]}>
          <Core />
        </group>
        <Particles />
      </Canvas>
    </div>
  );
}
