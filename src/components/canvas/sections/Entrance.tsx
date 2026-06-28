'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
      {/* Simplified Floor - standard material is more robust than reflector */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Vault Frame */}
      <mesh position={[0, 2, -5]} castShadow>
        <torusGeometry args={[9, 0.4, 16, 100]} />
        <meshStandardMaterial color="#222222" metalness={1} roughness={0.3} />
      </mesh>

      {/* Left Vault Door */}
      <group ref={doorL} position={[0, 2, -5.2]}>
        <mesh position={[-2.6, 0, 0]} castShadow>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Vault Door */}
      <group ref={doorR} position={[0, 2, -5.2]}>
        <mesh position={[2.6, 0, 0]} castShadow>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>

      {/* Perimeter Lights */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 6) * 8.8, Math.sin(i * Math.PI / 6) * 8.8 + 2, -4.9]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
          <pointLight color="#00ffff" intensity={2} distance={5} />
        </mesh>
      ))}

      <Text
        position={[0, 10, -4.5]}
        fontSize={1.2}
        color="#00ffff"
        maxWidth={10}
        textAlign="center"
      >
        ACCESS GRANTED
      </Text>
    </group>
  );
};

export default Entrance;
