
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface EntranceProps {
  active: boolean;
}

const Entrance: React.FC<EntranceProps> = ({ active }) => {
  const doorL = useRef<THREE.Group>(null);
  const doorR = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (active && doorL.current && doorR.current) {
      doorL.current.position.x = THREE.MathUtils.lerp(doorL.current.position.x, -8, delta * 1.5);
      doorR.current.position.x = THREE.MathUtils.lerp(doorR.current.position.x, 8, delta * 1.5);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floor with Grid Look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Large Circular Vault Frame */}
      <mesh position={[0, 4, -5]}>
        <torusGeometry args={[10, 0.5, 16, 100]} />
        <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={1} />
      </mesh>

      {/* Welcome HUD */}
      <Html position={[0, 12, -4]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-blue-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 01</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">MAIN ENTRANCE</h1>
        </div>
      </Html>

      {/* Left Hydraulic Door */}
      <group ref={doorL} position={[0, 4, -5.2]}>
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[5.2, 16, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Hydraulic Door */}
      <group ref={doorR} position={[0, 4, -5.2]}>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[5.2, 16, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.3} />
        </mesh>
      </group>

      {/* Architectural Pylons */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? -12 : 12), 3, (i < 2 ? 5 : -15)]}>
          <boxGeometry args={[1, 10, 1]} />
          <meshStandardMaterial color="#222" emissive="#4488ff" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default Entrance;
