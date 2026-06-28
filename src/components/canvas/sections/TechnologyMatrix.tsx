'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TechnologyMatrix: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.5;
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z += delta * 0.2;
  });

  return (
    <group position={position}>
      {/* Central Energy Core */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[4, 1]} />
          <meshStandardMaterial 
            wireframe 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={2} 
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Rotating Containment Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[8, 0.1, 16, 100]} />
        <meshBasicMaterial color="#4488ff" />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.1, 16, 100]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Base Pedestal */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[12, 15, 2, 6]} />
        <meshStandardMaterial color="#111" metalness={1} />
      </mesh>

      {/* Orbiting Tech Chips (Placeholders) */}
      {[...Array(8)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
          <mesh position={[15, 0, 0]}>
            <boxGeometry args={[1, 1.5, 0.1]} />
            <meshStandardMaterial color="#222" emissive="#00ffff" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default TechnologyMatrix;