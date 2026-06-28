'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[15, 16, 1, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Large Section Header */}
      <Html position={[0, 18, 0]} center distanceFactor={12}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-cyan-500 font-mono text-xl tracking-[0.8em] uppercase opacity-70">SECTION 02</h2>
          <h1 className="text-white font-bold text-7xl tracking-tighter shadow-2xl">IDENTITY</h1>
        </div>
      </Html>

      <group position={[0, 4, 0]}>
        {/* Left Panel: Biography - Adjusted spacing and visibility */}
        <group position={[-7, 0, 0]} rotation={[0, 0.5, 0]}>
          <mesh>
            <planeGeometry args={[9, 11]} />
            <meshStandardMaterial transparent opacity={0.15} color="#4488ff" />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[9.1, 11.1]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.3} transparent />
          </mesh>
          
          <Html position={[0, 0, 0.1]} center transform distanceFactor={8}>
            <div className="w-[400px] p-10 bg-blue-900/10 backdrop-blur-2xl border border-blue-500/50 rounded-[2rem] text-white font-sans">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                <div>
                  <h3 className="text-3xl font-bold tracking-tighter">John Doe</h3>
                  <p className="text-blue-400 font-mono text-sm mt-1 uppercase tracking-widest">Architect // Lead</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-black/50 rounded-2xl border border-white/5">
                  <h4 className="text-[10px] text-blue-400 uppercase tracking-[0.2em] mb-3 font-mono">Mission Profile</h4>
                  <p className="text-base leading-relaxed text-gray-200">
                    Designing resilient digital infrastructures and high-performance interactive experiences. Specializing in cloud-native systems and real-time visualization.
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Right Panel: Technical Metrics */}
        <group position={[7, 0, 0]} rotation={[0, -0.5, 0]}>
          <mesh>
            <planeGeometry args={[9, 11]} />
            <meshStandardMaterial transparent opacity={0.15} color="#4488ff" />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[9.1, 11.1]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.3} transparent />
          </mesh>

          <Html position={[0, 0, 0.1]} center transform distanceFactor={8}>
            <div className="w-[400px] p-10 bg-blue-900/10 backdrop-blur-2xl border border-blue-500/50 rounded-[2rem] text-white font-sans">
              <h3 className="text-blue-400 text-xs font-mono mb-8 uppercase tracking-[0.3em]">Core_Capabilities</h3>
              <div className="space-y-6">
                {[
                  { label: "Systems Design", val: 95 },
                  { label: "Frontend/R3F", val: 92 },
                  { label: "Backend/Cloud", val: 88 },
                  { label: "AI & ML Ops", val: 82 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-mono uppercase tracking-widest">
                      <span>{skill.label}</span>
                      <span className="text-blue-400">{skill.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-500/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                        style={{ width: `${skill.val}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};

export default IdentityChamber;