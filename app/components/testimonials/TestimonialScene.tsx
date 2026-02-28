"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

/* -------------------- Quote Icon -------------------- */
function QuoteIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial
          color="#b65ff8"
          emissive="#977DFF"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Star Ratings -------------------- */
function StarRating({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0012 + position[0]) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* -------------------- Floating Elements -------------------- */
function FloatingElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      scale: Math.random() * 0.02 + 0.01,
      speed: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  useFrame((_, delta) => {
    elements.forEach((element) => {
      element.position[1] += delta * element.speed * 0.05;
      if (element.position[1] > 1.5) {
        element.position[1] = -1.5;
      }
    });
  });

  return (
    <group>
      {elements.map((element, i) => (
        <mesh key={i} position={element.position}>
          <sphereGeometry args={[element.scale]} />
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
export default function TestimonialScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#b65ff8" />
        <pointLight position={[-3, -2, 4]} intensity={0.6} color="#5416b5" />
        <pointLight position={[0, 4, 0]} intensity={0.5} color="#977DFF" />

        <QuoteIcon />
        <StarRating position={[1.5, 1, 0]} />
        <StarRating position={[-1.5, -0.5, 1]} />
        <StarRating position={[0.8, -1, -1]} />
        <FloatingElements />
      </Canvas>
    </div>
  );
}
