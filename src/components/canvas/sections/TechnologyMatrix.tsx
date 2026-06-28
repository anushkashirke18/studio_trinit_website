'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
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
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            emissive="#00ffff" 
            emissiveIntensity={2} 
            color="#00ffff" 
            wireframe 
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#4488ff" transparent opacity={0.5} />
        </mesh>
      </group>

      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * Math.PI / 6) * 8, 
            Math.sin(i * Math.PI / 4) * 2, 
            Math.sin(i * Math.PI / 6) * 8
          ]}
        >
          <boxGeometry args={[1, 1, 0.2]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
        </mesh>
      ))}

      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default TechnologyMatrix;
