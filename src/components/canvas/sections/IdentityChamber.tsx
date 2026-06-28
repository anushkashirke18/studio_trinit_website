
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[12, 14, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Section Label */}
      <Html position={[0, 12, 0]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-cyan-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 02</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">IDENTITY CHAMBER</h1>
        </div>
      </Html>

      {/* Floating Bio Panels - ADD YOUR BIO INFO HERE */}
      <group position={[0, 3, 0]}>
        {/* Bio Panel Left */}
        <mesh position={[-6, 1, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[5, 7, 0.1]} />
          <meshStandardMaterial transparent opacity={0.2} color="#4488ff" emissive="#4488ff" emissiveIntensity={0.5} />
          <Html position={[0, 0, 0.1]} center transform distanceFactor={5}>
            <div className="w-64 p-4 text-white font-mono bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-400 text-xs border-b border-blue-500/30 pb-1 mb-2">SYSTEM_BIO</h3>
              <p className="text-sm">LEAD ARCHITECT: JOHN DOE</p>
              <p className="text-sm">EXPERIENCE: 8 YEARS</p>
              <p className="text-sm">STATUS: ACTIVE</p>
            </div>
          </Html>
        </mesh>
        
        {/* Stats Panel Right */}
        <mesh position={[6, 1, 0]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[5, 7, 0.1]} />
          <meshStandardMaterial transparent opacity={0.2} color="#4488ff" emissive="#4488ff" emissiveIntensity={0.5} />
          <Html position={[0, 0, 0.1]} center transform distanceFactor={5}>
            <div className="w-64 p-4 text-white font-mono bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-400 text-xs border-b border-blue-500/30 pb-1 mb-2">CAPABILITIES</h3>
              <p className="text-xs">TYPESCRIPT: 98%</p>
              <p className="text-xs">REACT: 95%</p>
              <p className="text-xs">SYSTEM_DESIGN: 92%</p>
            </div>
          </Html>
        </mesh>

        {/* Central Display */}
        <mesh position={[0, 2, -2]}>
          <boxGeometry args={[4, 5, 0.2]} />
          <meshStandardMaterial color="#222" metalness={1} />
        </mesh>
      </group>

      {/* Decorative ceiling ring */}
      <mesh position={[0, 18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.2, 16, 50]} />
        <meshBasicMaterial color="#4488ff" />
      </mesh>
    </group>
  );
};

export default IdentityChamber;
