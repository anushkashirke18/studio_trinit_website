
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface EntranceProps {
  active: boolean;
}

const Entrance: React.FC<EntranceProps> = ({ active }) => {
  const doorL = useRef<THREE.Group>(null);
  const doorR = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (active && doorL.current && doorR.current) {
      doorL.current.position.x = THREE.MathUtils.lerp(doorL.current.position.x, -6, delta * 2);
      doorR.current.position.x = THREE.MathUtils.lerp(doorR.current.position.x, 6, delta * 2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>

      {/* Vault Structure */}
      <mesh position={[0, 2, -5]}>
        <torusGeometry args={[8, 0.5, 16, 100]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
      </mesh>

      {/* Vault Doors */}
      <group ref={doorL} position={[0, 2, -5.5]}>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[5, 10, 0.5]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.5} />
        </mesh>
      </group>
      <group ref={doorR} position={[0, 2, -5.5]}>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[5, 10, 0.5]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.5} />
        </mesh>
      </group>

      {/* Blue LED Accents */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 7.5, Math.sin(i * Math.PI / 4) * 7.5 + 2, -5.1]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
    </group>
  );
};

export default Entrance;
