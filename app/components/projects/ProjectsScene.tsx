"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh, Group } from "three";

/* -------------------- Main Project Cube -------------------- */
function ProjectCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0012) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#5416b5"
          emissive="#7F3AA1"
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Screen Panel -------------------- */
function ScreenPanel() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.2;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[2.2, 0, 0]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial
          color="#b65ff8"
          emissive="#977DFF"
          emissiveIntensity={0.35}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Deployment Cone -------------------- */
function DeployIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += delta * 0.3;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0009) * 0.12;
  });

  return (
    <Float speed={1.7} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={meshRef} position={[-2.2, 0, 0]}>
        <coneGeometry args={[0.4, 1, 8]} />
        <meshStandardMaterial
          color="#977DFF"
          emissive="#5416b5"
          emissiveIntensity={0.4}
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Project Particles -------------------- */
function ProjectParticles() {
  const groupRef = useRef<Group>(null);

  const particles = useMemo(() => {
    const arr: Array<{
      pos: [number, number, number];
      s: number;
      o: number;
      c: string;
    }> = [];

    const colors = ["#5416b5", "#b65ff8", "#977DFF", "#7F3AA1"];

    for (let i = 0; i < 40; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4
        ],
        s: 0.02 + Math.random() * 0.05,
        o: 0.3 + Math.random() * 0.4,
        c: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.s, 8, 8]} />
          <meshStandardMaterial
            color={p.c}
            emissive={p.c}
            emissiveIntensity={0.35}
            transparent
            opacity={p.o}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- Scene -------------------- */
export default function ProjectScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 4, 5]} intensity={1.2} color="#b65ff8" />
        <pointLight position={[-5, -3, 4]} intensity={0.9} color="#5416b5" />
        <pointLight position={[0, 6, 0]} intensity={0.7} color="#977DFF" />

        <ProjectCube />
        <ScreenPanel />
        <DeployIcon />
        <ProjectParticles />
      </Canvas>
    </div>
  );
}