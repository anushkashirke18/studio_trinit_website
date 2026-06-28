
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ServerTower: React.FC<{ 
  position: [number, number, number]; 
  height: number;
  label: string;
  role: string;
}> = ({ position, height, label, role }) => (
  <group position={position}>
    {/* Main Body */}
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[4, height, 4]} />
      <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
    </mesh>
    {/* Glowing Strips */}
    {[...Array(5)].map((_, i) => (
      <mesh key={i} position={[0, i * (height/5) + 1, 2.01]}>
        <boxGeometry args={[3, 0.2, 0.1]} />
        <meshBasicMaterial color={i % 2 === 0 ? "#00ffff" : "#4488ff"} />
      </mesh>
    ))}
    {/* Company Label - EDIT COMPANY INFO HERE */}
    <Html position={[0, height + 1, 0]} center distanceFactor={8}>
      <div className="text-center bg-black/80 px-4 py-2 border border-blue-500/50 rounded-md">
        <p className="text-blue-400 font-mono text-[10px] uppercase tracking-widest">{role}</p>
        <p className="text-white font-bold whitespace-nowrap">{label}</p>
      </div>
    </Html>
  </group>
);

const ExperienceVault: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Walkway */}
      <mesh position={[0, -2, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 80]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Section Label */}
      <Html position={[0, 20, -10]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-blue-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 03</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">EXPERIENCE VAULT</h1>
        </div>
      </Html>

      {/* Server Towers representing career history */}
      <ServerTower position={[-10, -2, -5]} height={14} label="TechNova Solutions" role="Lead Developer" />
      <ServerTower position={[10, -2, -20]} height={16} label="CyberDyne Systems" role="Senior Architect" />
      <ServerTower position={[-10, -2, -35]} height={12} label="FutureCraft Inc" role="Full Stack Dev" />
      <ServerTower position={[10, -2, -50]} height={15} label="Global Grid" role="Junior Engineer" />

      {/* Overhead structures */}
      <mesh position={[0, 15, -25]}>
        <boxGeometry args={[0.5, 0.5, 80]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
};

export default ExperienceVault;
