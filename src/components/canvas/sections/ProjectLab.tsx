
'use client';

import React from 'react';
import { Float, Text } from '@react-three/drei';

const ProjectLab: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-5, 2, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.4} 
            color="#fff" 
            transmission={0.9} 
            thickness={1}
            roughness={0}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[5, 4, -10]}>
          <boxGeometry args={[4, 4, 4]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.4} 
            color="#4488ff" 
            transmission={0.9} 
            thickness={2}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <mesh position={[0, -2, -5]}>
        <boxGeometry args={[20, 0.5, 30]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <Text
        position={[0, 8, -5]}
        fontSize={2}
        color="#4488ff"
      >
        PROJECT LABORATORY
      </Text>
    </group>
  );
};

export default ProjectLab;
