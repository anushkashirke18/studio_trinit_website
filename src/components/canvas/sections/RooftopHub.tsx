'use client';

import React from 'react';

const RooftopHub: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[10, 12, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
      </mesh>

      <group position={[0, 2, 0]}>
        <mesh rotation={[-0.5, 0, 0]}>
          <boxGeometry args={[6, 4, 0.1]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.3} 
            color="#4488ff" 
          />
        </mesh>
      </group>

      <mesh position={[0, 15, -10]}>
        <boxGeometry args={[15, 3, 0.1]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default RooftopHub;
