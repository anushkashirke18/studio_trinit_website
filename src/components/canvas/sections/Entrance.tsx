'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface EntranceProps {
  active: boolean;
}

const Entrance: React.FC<EntranceProps> = ({ active }) => {
  const doorL = useRef<THREE.Group>(null);
  const doorR = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (active && doorL.current && doorR.current) {
      // Opening doors with a more pronounced hydraulic feel
      doorL.current.position.x = THREE.MathUtils.lerp(doorL.current.position.x, -8, delta * 1.2);
      doorR.current.position.x = THREE.MathUtils.lerp(doorR.current.position.x, 8, delta * 1.2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* High-Reflectivity Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
        />
      </mesh>

      {/* Main Vault Frame */}
      <mesh position={[0, 2, -5]}>
        <torusGeometry args={[9, 0.4, 16, 100]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
      </mesh>

      {/* Left Vault Door */}
      <group ref={doorL} position={[0, 2, -5.2]}>
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#111" metalness={1} roughness={0.3} />
        </mesh>
        {/* Detail Ribs */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[-2, 5 - i * 2.5, 0.6]}>
            <boxGeometry args={[4, 0.2, 0.1]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        ))}
      </group>

      {/* Right Vault Door */}
      <group ref={doorR} position={[0, 2, -5.2]}>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[5.2, 14, 1]} />
          <meshStandardMaterial color="#111" metalness={1} roughness={0.3} />
        </mesh>
        {/* Detail Ribs */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[2, 5 - i * 2.5, 0.6]}>
            <boxGeometry args={[4, 0.2, 0.1]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        ))}
      </group>

      {/* Perimeter LED System */}
      {[...Array(24)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 12) * 8.8, Math.sin(i * Math.PI / 12) * 8.8 + 2, -4.9]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
          <pointLight color="#00ffff" intensity={0.5} distance={3} />
        </mesh>
      ))}

      {/* Entrance Text using system fonts to avoid loading stalls */}
      <Text
        position={[0, 10, -4.5]}
        fontSize={1.2}
        color="#00ffff"
        maxWidth={10}
        textAlign="center"
        font={undefined} // Use default system font
      >
        ACCESS GRANTED
      </Text>
    </group>
  );
};

export default Entrance;