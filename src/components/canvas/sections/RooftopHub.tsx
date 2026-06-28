
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const RooftopHub: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Section Title */}
      <Html position={[0, 22, -10]} center distanceFactor={10}>
        <div className="text-center select-none pointer-events-none">
          <h2 className="text-blue-400 font-mono text-xl tracking-[0.8em] uppercase opacity-60">Section 06</h2>
          <h1 className="text-white font-bold text-7xl tracking-tighter">COMMUNICATION HUB</h1>
        </div>
      </Html>

      {/* Main Console Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[20, 22, 1, 32]} />
        <meshStandardMaterial color="#080808" metalness={1} roughness={0.1} />
      </mesh>

      {/* Central Terminal Console */}
      <group position={[0, 4, 0]} rotation={[-0.2, 0, 0]}>
        {/* Glass Screen Frame */}
        <mesh>
          <boxGeometry args={[16, 10, 0.2]} />
          <meshStandardMaterial transparent opacity={0.1} color="#4488ff" metalness={1} />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[16.2, 10.2, 0.1]} />
          <meshBasicMaterial wireframe color="#4488ff" opacity={0.3} transparent />
        </mesh>

        <Html position={[0, 0, 0.15]} center transform distanceFactor={8}>
          <div className="w-[600px] p-12 bg-blue-900/10 backdrop-blur-3xl border border-blue-500/40 rounded-[3rem] text-white">
            <h2 className="text-3xl font-bold mb-8 text-blue-400 tracking-tighter uppercase">Initiate Secure Uplink</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-blue-500/20 p-4 rounded-2xl">
                  <label className="block text-[10px] font-mono text-blue-500/70 uppercase mb-2">Subject_Name</label>
                  <input className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-600" placeholder="IDENTIFY YOURSELF" />
                </div>
                <div className="bg-black/40 border border-blue-500/20 p-4 rounded-2xl">
                  <label className="block text-[10px] font-mono text-blue-500/70 uppercase mb-2">Contact_Email</label>
                  <input className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-600" placeholder="UPLINK_DESTINATION" />
                </div>
              </div>
              
              <div className="bg-black/40 border border-blue-500/20 p-4 rounded-2xl">
                <label className="block text-[10px] font-mono text-blue-500/70 uppercase mb-2">Transmission_Buffer</label>
                <textarea className="w-full bg-transparent border-none outline-none text-sm resize-none h-24 placeholder:text-gray-600" placeholder="ENTER MESSAGE ENCODING..."></textarea>
              </div>

              <button className="w-full py-5 bg-blue-500/20 border border-blue-500/50 hover:bg-blue-500/40 transition-all rounded-2xl text-sm font-mono uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                Transmit Signal
              </button>
            </form>
          </div>
        </Html>
      </group>

      {/* Satellite Arrays in background */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[Math.cos(i * Math.PI/2) * 15, 10, Math.sin(i * Math.PI/2) * 15]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 10]} />
            <meshBasicMaterial color="#4488ff" />
          </mesh>
          <mesh position={[0, 5, 0]}>
            <sphereGeometry args={[0.3]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default RooftopHub;
