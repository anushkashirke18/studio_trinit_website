
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
      // Opening doors
      doorL.current.position.x = THREE.MathUtils.lerp(doorL.current.position.x, -7, delta * 1.5);
      doorR.current.position.x = THREE.MathUtils.lerp(doorR.current.position.x, 7, delta * 1.5);
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
          mixStrength={60}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.5}
        />
      </mesh>

      {/* Vault Structure */}
      <mesh position={[0, 2, -5]}>
        <torusGeometry args={[9, 0.6, 16, 100]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
      </mesh>

      {/* Vault Doors */}
      <group ref={doorL} position={[0, 2, -5.5]}>
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[5.2, 12, 0.8]} />
          <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>
      <group ref={doorR} position={[0, 2, -5.5]}>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[5.2, 12, 0.8]} />
          <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>

      {/* Blue LED Accents */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 6) * 8.5, Math.sin(i * Math.PI / 6) * 8.5 + 2, -5.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
          <pointLight color="#00ffff" intensity={0.5} distance={2} />
        </mesh>
      ))}

      {/* Welcome Message in 3D */}
      <Text
        position={[0, 8, -4.5]}
        fontSize={1}
        color="#4488ff"
        maxWidth={10}
        textAlign="center"
        font="https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoAd3XC887fVfPZp9U3W.woff"
      >
        FACILITY ENTRANCE
      </Text>
    </group>
  );
};

export default Entrance;
