
'use client';

import React from 'react';
import { Float, Html, Text } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[5, 6, 0.5, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 2, 0]}>
          <mesh>
            <boxGeometry args={[4, 5, 0.1]} />
            <meshPhysicalMaterial 
              transparent 
              opacity={0.3} 
              color="#4488ff" 
              metalness={0.9} 
              roughness={0} 
              transmission={0.5}
              thickness={1}
            />
          </mesh>
          
          <Html transform distanceFactor={5} position={[0, 0, 0.06]} className="select-none">
            <div className="w-64 p-6 bg-blue-500/10 border border-blue-500/30 backdrop-blur-md rounded-xl text-white font-mono space-y-4">
              <div className="w-12 h-12 rounded-full border border-blue-400/50 bg-blue-400/20" />
              <div>
                <h2 className="text-xl font-bold">ALEX RIVERS</h2>
                <p className="text-xs text-blue-300">SYSTEM ARCHITECT</p>
              </div>
              <p className="text-[10px] leading-relaxed opacity-70">
                Specializing in distributed systems, high-performance computing, and interactive 3D architectures.
              </p>
              <div className="grid grid-cols-2 gap-2 border-t border-blue-500/20 pt-4 text-[8px]">
                <div>XP: 12Y+</div>
                <div>PROJECTS: 45</div>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      <Text
        position={[0, 6, -5]}
        fontSize={2}
        color="#4488ff"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        IDENTITY
      </Text>
    </group>
  );
};

export default IdentityChamber;
