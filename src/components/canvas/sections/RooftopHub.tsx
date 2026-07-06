'use client';

import React from 'react';
import { Html } from '@react-three/drei';

export default function RooftopHub({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Communication Console Foundation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* The Central Console */}
      <group position={[0, 5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[4, 1, 2]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        
        <Html transform distanceFactor={5} position={[0, 2, 0]}>
          <div className="w-80 p-10 bg-black/90 border border-blue-500/50 text-white font-mono text-center">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Initialize Contact</h2>
            <p className="text-[10px] text-white/40 tracking-[0.3em] mb-8">TRANSMITTING VIA SECURE CHANNEL</p>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="USER_IDENTIFICATION" 
                className="w-full bg-transparent border-b border-white/20 py-2 text-[10px] outline-none focus:border-blue-500 transition-colors"
              />
              <textarea 
                placeholder="MESSAGE_PAYLOAD" 
                className="w-full bg-transparent border-b border-white/20 py-2 text-[10px] h-20 outline-none focus:border-blue-500 transition-colors"
              />
              <button className="w-full py-3 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
                Transmit Now
              </button>
            </div>
            
            <div className="mt-8 flex justify-center gap-6 opacity-40 grayscale">
              <div className="text-[8px]">GH</div>
              <div className="text-[8px]">LI</div>
              <div className="text-[8px]">TW</div>
            </div>
          </div>
        </Html>

        {/* Energy Beam */}
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 20]} />
          <meshBasicMaterial color="#4488ff" transparent opacity={0.1} />
        </mesh>
      </group>

      {/* Atmospheric Ring */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9, 10, 64]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
