
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const TechnologyMatrix: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group position={position}>
      {/* Energy Core */}
      <group ref={coreRef}>
        <Sphere args={[2, 32, 32]}>
          <meshStandardMaterial 
            emissive="#00ffff" 
            emissiveIntensity={2} 
            color="#00ffff" 
            wireframe 
          />
        </Sphere>
        <Sphere args={[1.5, 32, 32]}>
          <meshBasicMaterial color="#4488ff" transparent opacity={0.5} />
        </Sphere>
      </group>

      {/* Orbiting Chips */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh 
            position={[
              Math.cos(i * Math.PI / 6) * 8, 
              Math.sin(i * Math.PI / 4) * 2, 
              Math.sin(i * Math.PI / 6) * 8
            ]}
          >
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[0.8, 0.8]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
            </mesh>
          </mesh>
        </Float>
      ))}

      <Text
        position={[0, 10, 0]}
        fontSize={2}
        color="#4488ff"
      >
        TECHNOLOGY MATRIX
      </Text>
    </group>
  );
};

export default TechnologyMatrix;
