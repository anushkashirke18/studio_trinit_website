
'use client';

import React from 'react';
import { Text, Html } from '@react-three/drei';

const RooftopHub: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[10, 12, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
      </mesh>

      {/* Terminal UI */}
      <group position={[0, 2, 0]}>
        <mesh rotation={[-0.5, 0, 0]}>
          <boxGeometry args={[6, 4, 0.1]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.3} 
            color="#4488ff" 
            transmission={0.8}
            thickness={1}
          />
        </mesh>
        
        <Html transform distanceFactor={6} position={[0, 0, 0.06]} rotation={[-0.5, 0, 0]} className="select-none">
          <div className="w-80 p-6 bg-black/40 border border-blue-500/30 backdrop-blur-xl rounded-2xl text-white font-mono space-y-4">
            <h2 className="text-xl font-bold tracking-tighter">COMMUNICATION HUB</h2>
            <div className="space-y-2">
              <input 
                placeholder="SECURE_CHANNEL_ID" 
                className="w-full bg-blue-500/5 border border-blue-500/20 px-3 py-2 text-[10px] rounded focus:outline-none focus:border-blue-400"
              />
              <textarea 
                placeholder="MESSAGE_ENCRYPTED" 
                rows={3}
                className="w-full bg-blue-500/5 border border-blue-500/20 px-3 py-2 text-[10px] rounded focus:outline-none focus:border-blue-400"
              />
            </div>
            <button className="w-full py-2 bg-blue-500/20 border border-blue-500/50 hover:bg-blue-500/40 transition-all text-[10px] font-bold tracking-widest uppercase">
              TRANSMIT
            </button>
          </div>
        </Html>
      </group>

      {/* Distant City Lights (Procedural) */}
      {[...Array(100)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 200, 
          (Math.random() - 0.5) * 50 - 20, 
          -100 - Math.random() * 100
        ]}>
          <boxGeometry args={[1, 1 + Math.random() * 10, 1]} />
          <meshBasicMaterial color={Math.random() > 0.8 ? "#00ffff" : "#111"} />
        </mesh>
      ))}

      <Text
        position={[0, 15, -10]}
        fontSize={3}
        color="#4488ff"
        maxWidth={20}
        textAlign="center"
      >
        THE CORE REACHES THE FUTURE
      </Text>
    </group>
  );
};

export default RooftopHub;
