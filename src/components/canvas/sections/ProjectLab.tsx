'use client';

import React from 'react';

const ProjectLab: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[-5, 2, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.4} 
          color="#fff" 
        />
      </mesh>

      <mesh position={[5, 4, -10]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.4} 
          color="#4488ff" 
        />
      </mesh>

      <mesh position={[0, -2, -5]}>
        <boxGeometry args={[20, 0.5, 30]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh position={[0, 8, -5]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default ProjectLab;
