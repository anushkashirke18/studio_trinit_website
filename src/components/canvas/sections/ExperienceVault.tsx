'use client';

import React from 'react';

const ServerTower: React.FC<{ position: [number, number, number]; height: number }> = ({ position, height }) => (
  <group position={position}>
    {/* Main Body */}
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[3, height, 3]} />
      <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
    </mesh>
    {/* Glowing Strips */}
    {[...Array(5)].map((_, i) => (
      <mesh key={i} position={[0, i * (height/5) + 1, 1.51]}>
        <boxGeometry args={[2.5, 0.2, 0.1]} />
        <meshBasicMaterial color={i % 2 === 0 ? "#00ffff" : "#4488ff"} />
      </mesh>
    ))}
  </group>
);

const ExperienceVault: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Walkway */}
      <mesh position={[0, -2, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 50]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Server Towers along the corridor */}
      <ServerTower position={[-8, -2, -5]} height={12} />
      <ServerTower position={[8, -2, -15]} height={15} />
      <ServerTower position={[-8, -2, -25]} height={10} />
      <ServerTower position={[8, -2, -35]} height={14} />

      {/* Overhead cables/structures */}
      <mesh position={[0, 10, -15]}>
        <boxGeometry args={[0.5, 0.5, 50]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Corridor Lights */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 8, -i * 10 - 5]}>
          <boxGeometry args={[6, 0.1, 0.5]} />
          <meshBasicMaterial color="#4488ff" />
        </mesh>
      ))}
    </group>
  );
};

export default ExperienceVault;