
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ProjectLab: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Section Label */}
      <Html position={[0, 15, 0]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-blue-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 04</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">PROJECT LABORATORY</h1>
        </div>
      </Html>

      {/* Floating Project Cubes - EDIT YOUR PROJECTS HERE */}
      <group position={[-8, 4, 0]}>
        <mesh>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial transparent opacity={0.4} color="#00ffff" />
          <Html position={[0, 4, 0]} center distanceFactor={6}>
            <div className="bg-black/80 p-2 border border-cyan-500 rounded text-white text-xs whitespace-nowrap">
              PROJECT_A: NEURAL_NET
            </div>
          </Html>
        </mesh>
      </group>

      <group position={[8, 6, -15]}>
        <mesh>
          <boxGeometry args={[6, 6, 6]} />
          <meshStandardMaterial transparent opacity={0.4} color="#4488ff" />
          <Html position={[0, 5, 0]} center distanceFactor={6}>
            <div className="bg-black/80 p-2 border border-blue-500 rounded text-white text-xs whitespace-nowrap">
              PROJECT_B: QUANTUM_FLOW
            </div>
          </Html>
        </mesh>
      </group>

      {/* Lab Floor */}
      <mesh position={[0, -2, -10]}>
        <boxGeometry args={[40, 0.5, 40]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Central Lab Sphere */}
      <mesh position={[0, 10, -5]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default ProjectLab;
