'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Structural Ground Plate */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[25, 25, 0.2, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0} />
      </mesh>

      {/* High-Level Title (Positioned to be visible above the eye-line) */}
      <Html position={[0, 15, -15]} center distanceFactor={15}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-blue-500 font-mono text-xl tracking-[0.8em] uppercase opacity-40">Section 02</h2>
          <h1 className="text-white font-bold text-9xl tracking-tighter">IDENTITY</h1>
        </div>
      </Html>

      {/* Main Information Group - Positioned at Eye Level (Y=5) */}
      <group position={[0, 5, -5]}>
        {/* Biography Panel */}
        <group position={[-9, 0, 0]} rotation={[0, 0.3, 0]}>
          <mesh>
            <planeGeometry args={[14, 12]} />
            <meshStandardMaterial color="#001122" transparent opacity={0.6} metalness={1} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[14.2, 12.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.1} transparent />
          </mesh>
          
          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[600px] p-12 bg-blue-950/40 backdrop-blur-3xl border border-blue-500/50 rounded-[3rem] text-white">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center text-blue-300 font-mono text-4xl font-bold">JD</div>
                <div>
                  <h3 className="text-5xl font-bold tracking-tighter uppercase">John Doe</h3>
                  <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.4em]">Systems Architect</p>
                </div>
              </div>
              <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5">
                <h4 className="text-[10px] text-blue-500 uppercase tracking-[0.4em] mb-4 font-mono">MISSION_LOG</h4>
                <p className="text-xl leading-relaxed text-gray-200 font-light italic">
                  "Engineering resilient digital ecosystems that balance high performance with elegant architectural design."
                </p>
              </div>
            </div>
          </Html>
        </group>

        {/* Technical capabilities panel */}
        <group position={[9, 0, 0]} rotation={[0, -0.3, 0]}>
          <mesh>
            <planeGeometry args={[14, 12]} />
            <meshStandardMaterial color="#001122" transparent opacity={0.6} metalness={1} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[14.2, 12.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.1} transparent />
          </mesh>

          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[600px] p-12 bg-blue-950/40 backdrop-blur-3xl border border-blue-500/50 rounded-[3rem] text-white">
              <h3 className="text-blue-400 text-[10px] font-mono mb-8 uppercase tracking-[0.6em]">TECH_INDEX_V.01</h3>
              <div className="space-y-8">
                {[
                  { label: "Architecture", val: 98 },
                  { label: "Backend Ops", val: 92 },
                  { label: "Visualization", val: 89 },
                  { label: "AI Integration", val: 85 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-widest opacity-80">
                      <span>{skill.label}</span>
                      <span className="text-blue-400">{skill.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-500/10 rounded-full border border-blue-500/20">
                      <div 
                        className="h-full bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
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