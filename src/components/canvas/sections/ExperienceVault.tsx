
'use client';

import React from 'react';
import { Float, Text } from '@react-three/drei';

const ServerTower: React.FC<{ position: [number, number, number], title: string }> = ({ position, title }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[2, 8, 2]} />
      <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
    </mesh>
    <mesh position={[0, 0, 1.01]}>
      <boxGeometry args={[1.8, 7.8, 0.05]} />
      <meshStandardMaterial color="#111" metalness={0.8} />
    </mesh>
    {[...Array(12)].map((_, i) => (
      <mesh key={i} position={[0.7, 3.5 - i * 0.6, 1.05]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color={Math.random() > 0.5 ? "#00ffff" : "#004444"} />
      </mesh>
    ))}
    <Text
      position={[0, 4.5, 0]}
      fontSize={0.5}
      color="white"
      anchorY="bottom"
    >
      {title}
    </Text>
  </group>
);

const ExperienceVault: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <ServerTower position={[-4, 0, 0]} title="TECH GIANT A" />
      <ServerTower position={[4, 0, -10]} title="INNOVATION LAB" />
      <ServerTower position={[-4, 0, -20]} title="STARTUP X" />
      
      <mesh position={[0, -4.1, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      <Text
        position={[0, 10, -10]}
        fontSize={2}
        color="#4488ff"
      >
        EXPERIENCE VAULT
      </Text>
    </group>
  );
};

export default ExperienceVault;
