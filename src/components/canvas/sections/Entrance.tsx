
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface EntranceProps {
  active: boolean;
  position: [number, number, number];
}

const Entrance: React.FC<EntranceProps> = ({ active, position }) => {
  const doorL = useRef<THREE.Group>(null);
  const doorR = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (active && doorL.current && doorR.current) {
      // Smoothly open the vault doors when active
      doorL.current.position.x = THREE.MathUtils.lerp(doorL.current.position.x, -8, delta * 2);
      doorR.current.position.x = THREE.MathUtils.lerp(doorR.current.position.x, 8, delta * 2);
    }
  });

  return (
    <group position={position}>
      {/* Floor with Grid Look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Large Circular Vault Frame */}
      <mesh position={[0, 4, -10]}>
        <torusGeometry args={[12, 0.4, 16, 100]} />
        <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={2} />
      </mesh>

      {/* Architectural Pylons */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? -15 : 15), 5, (i < 2 ? 10 : -10)]}>
          <boxGeometry args={[1.5, 15, 1.5]} />
          <meshStandardMaterial color="#111" emissive="#4488ff" emissiveIntensity={0.1} />
        </mesh>
      ))}

      {/* Hydraulic Doors */}
      <group position={[0, 4, -10.5]}>
        <group ref={doorL} position={[0, 0, 0]}>
          <mesh position={[-3.1, 0, 0]}>
            <boxGeometry args={[6.2, 18, 1]} />
            <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.2} />
          </mesh>
        </group>
        <group ref={doorR} position={[0, 0, 0]}>
          <mesh position={[3.1, 0, 0]}>
            <boxGeometry args={[6.2, 18, 1]} />
            <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Entrance;
