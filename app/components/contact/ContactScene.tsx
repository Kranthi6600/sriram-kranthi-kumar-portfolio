"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import type { Mesh } from "three";

export default function ContactScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't render 3D scene on mobile - it is too heavy
  if (isMobile) {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
        <div className="text-center text-white/80">
          <div className="text-2xl mb-4">📧</div>
          <div className="text-lg font-medium">Contact form optimized for mobile</div>
        </div>
      </div>
    );
  }

function MailIcon() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.6, 0.2]} />
        <meshStandardMaterial color="#5416b5" emissive="#3b1b78" emissiveIntensity={0.3} metalness={0.4} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function ContactParticles() {
  const particles = useMemo(() => {
    const out: Array<{ 
      pos: [number, number, number]; 
      s: number; 
      o: number; 
      c: string; 
      speed: number;
      offset: number;
    }> = [];
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 4;
      const colors = ["#5416b5", "#b65ff8", "#977DFF", "#7F3AA1"];
      out.push({
        pos: [x, y, z],
        s: 0.02 + Math.random() * 0.08,
        o: 0.3 + Math.random() * 0.5,
        c: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 2,
        offset: Math.random() * Math.PI * 2
      });
    }
    return out;
  }, []);

  const groupRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1; // Same as About
    
    // Remove individual particle movement to match About scene exactly
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          <sphereGeometry args={[p.s, 8, 8]} />
          <meshStandardMaterial color={p.c} emissive={p.c} emissiveIntensity={0.4} transparent opacity={p.o} />
        </mesh>
      ))}
    </group>
  );
}

function ContactText() {
  const textRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!textRef.current) return;
    textRef.current.rotation.z += delta * 0.35; // Same as About core Y-rotation
    textRef.current.position.y = 1.8 + Math.sin(Date.now() * 0.001) * 0.15; // Same as About core
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={textRef}>
        <boxGeometry args={[1.5, 0.3, 0.1]} />
        <meshStandardMaterial color="#b65ff8" emissive="#7F3AA1" emissiveIntensity={0.4} metalness={0.3} roughness={0.3} />
      </mesh>
    </Float>
  );
}

export default function ContactScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={1.2} color="#b65ff8" />
        <pointLight position={[-4, -3, 3]} intensity={0.8} color="#5416b5" />
        <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#977DFF" />
        <MailIcon />
        <ContactParticles />
        <ContactText />
      </Canvas>
    </div>
  );
}
