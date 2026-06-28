'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const RooftopHub: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Section Label */}
      <Html position={[0, 20, 0]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-blue-400 font-mono text-xl tracking-[0.5em] uppercase opacity-50">Section 06</h2>
          <h1 className="text-white font-bold text-6xl tracking-tighter">COMMUNICATION HUB</h1>
        </div>
      </Html>

      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[15, 18, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
      </mesh>

      {/* Interaction Console - CONTACT FORM HERE */}
      <group position={[0, 2, 0]}>
        <mesh rotation={[-0.5, 0, 0]}>
          <boxGeometry args={[12, 8, 0.2]} />
          <meshStandardMaterial transparent opacity={0.3} color="#4488ff" />
        </mesh>
        <Html position={[0, 0, 0.2]} center transform distanceFactor={8}>
          <div className="w-[400px] p-6 bg-blue-500/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl text-white font-mono">
            <h2 className="text-xl mb-4 text-blue-400 tracking-tighter">TRANSMIT MESSAGE</h2>
            <div className="space-y-3">
              <div className="border border-blue-500/30 p-2 rounded bg-black/50">
                <p className="text-[10px] text-blue-500/70">SOURCE_ID</p>
                <p className="text-sm">GUEST_USER_01</p>
              </div>
              <div className="border border-blue-500/30 p-2 rounded bg-black/50">
                <p className="text-[10px] text-blue-500/70">MESSAGE_BUFFER</p>
                <textarea className="w-full bg-transparent border-none outline-none text-sm resize-none h-20" placeholder="ENTER MESSAGE..."></textarea>
              </div>
              <button className="w-full py-2 bg-blue-500/20 border border-blue-500/50 hover:bg-blue-500/40 transition-all text-sm uppercase tracking-widest">
                Initiate Link
              </button>
            </div>
          </div>
        </Html>
      </group>

      {/* Background Tech Arrays */}
      <mesh position={[0, 15, -15]}>
        <boxGeometry args={[30, 5, 0.5]} />
        <meshBasicMaterial color="#4488ff" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

export default RooftopHub;