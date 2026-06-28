'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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
      {/* Section Label */}
      <Html position={[0, 18, 0]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-cyan-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 05</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">TECHNOLOGY MATRIX</h1>
        </div>
      </Html>

      {/* Central Energy Core */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[5, 1]} />
          <meshStandardMaterial 
            wireframe 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={2} 
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Rotating Containment Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[10, 0.1, 16, 100]} />
        <meshBasicMaterial color="#4488ff" />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[12, 0.1, 16, 100]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[15, 18, 2, 6]} />
        <meshStandardMaterial color="#111" metalness={1} />
      </mesh>

      {/* Technology Indicators - EDIT SKILLS HERE */}
      {[...Array(6)].map((_, i) => {
        const labels = ["Node.js", "Docker", "Firebase", "AWS", "Rust", "Python"];
        return (
          <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
            <group position={[18, 2, 0]}>
              <mesh>
                <boxGeometry args={[1.5, 2, 0.2]} />
                <meshStandardMaterial color="#222" emissive="#00ffff" emissiveIntensity={0.5} />
              </mesh>
              <Html center transform distanceFactor={4}>
                <div className="text-cyan-400 font-mono text-[8px] bg-black px-2 py-1 rounded border border-cyan-500/50">
                  {labels[i]}
                </div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
};

export default TechnologyMatrix;