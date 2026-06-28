'use client';

import React from 'react';

const ServerTower: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[2, 8, 2]} />
      <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
    </mesh>
    <mesh position={[0, 0, 1.01]}>
      <boxGeometry args={[1.8, 7.8, 0.05]} />
      <meshStandardMaterial color="#222" metalness={0.8} />
    </mesh>
  </group>
);

const ExperienceVault: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <ServerTower position={[-4, 0, 0]} />
      <ServerTower position={[4, 0, -10]} />
      <ServerTower position={[-4, 0, -20]} />
      
      <mesh position={[0, -4.1, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      <mesh position={[0, 10, -10]}>
        <boxGeometry args={[10, 2, 0.1]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default ExperienceVault;
