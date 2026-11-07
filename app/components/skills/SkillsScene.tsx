"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function CodeIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.12;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.8, 0.2]} />
        <meshStandardMaterial color="#5416b5" emissive="#3b1b78" emissiveIntensity={0.4} metalness={0.3} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function DatabaseIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0012) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 8]} />
        <meshStandardMaterial color="#b65ff8" emissive="#7F3AA1" emissiveIntensity={0.3} metalness={0.4} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function ServerIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += delta * 0.35;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.08;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-2, 0, 0]}>
        <coneGeometry args={[0.3, 0.8, 6]} />
        <meshStandardMaterial color="#977DFF" emissive="#7F3AA1" emissiveIntensity={0.35} metalness={0.35} roughness={0.25} />
      </mesh>
    </Float>
  );
}

function TechParticles() {
  const particles = useMemo(() => {
    const out: Array<{
      pos: [number, number, number];
      s: number;
      o: number;
      c: string;
    }> = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 3;
      const colors = ["#5416b5", "#b65ff8", "#977DFF", "#7F3AA1"];
      out.push({
        pos: [x, y, z],
        s: 0.02 + Math.random() * 0.06,
        o: 0.3 + Math.random() * 0.4,
        c: colors[Math.floor(Math.random() * colors.length)]
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
          <sphereGeometry args={[p.s, 8, 8]} />
          <meshStandardMaterial color={p.c} emissive={p.c} emissiveIntensity={0.3} transparent opacity={p.o} />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={1.2} color="#b65ff8" />
        <pointLight position={[-4, -3, 3]} intensity={0.8} color="#5416b5" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.6}
          color="#977DFF"
        />
        <CodeIcon />
        <DatabaseIcon />
        <ServerIcon />
        <TechParticles />
      </Canvas>
    </div>
  );
}
