'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
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
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Main Frame - Bright color to ensure visibility */}
      <mesh position={[0, 2, -5]}>
        <torusGeometry args={[9, 0.4, 16, 50]} />
        <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Left Vault Door */}
      <group ref={doorL} position={[0, 2, -5.2]}>
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* Right Vault Door */}
      <group ref={doorR} position={[0, 2, -5.2]}>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* Simple indicators */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 8, Math.sin(i * Math.PI / 4) * 8 + 2, -4.8]}>
          <sphereGeometry args={[0.2]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
    </group>
  );
};

export default Entrance;