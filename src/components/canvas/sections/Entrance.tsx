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
      {/* Floor with Grid Look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Large Circular Vault Frame */}
      <mesh position={[0, 4, -5]}>
        <torusGeometry args={[10, 0.5, 16, 100]} />
        <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={1} />
      </mesh>

      {/* Left Hydraulic Door */}
      <group ref={doorL} position={[0, 4, -5.2]}>
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[5.2, 16, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.3} />
        </mesh>
        {/* Door details */}
        <mesh position={[-4, 0, 0.8]}>
          <boxGeometry args={[0.5, 8, 0.2]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      </group>

      {/* Right Hydraulic Door */}
      <group ref={doorR} position={[0, 4, -5.2]}>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[5.2, 16, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.3} />
        </mesh>
        {/* Door details */}
        <mesh position={[4, 0, 0.8]}>
          <boxGeometry args={[0.5, 8, 0.2]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      </group>

      {/* Welcome Pylons */}
      <mesh position={[-12, 3, 5]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#222" emissive="#4488ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[12, 3, 5]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#222" emissive="#4488ff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

export default Entrance;