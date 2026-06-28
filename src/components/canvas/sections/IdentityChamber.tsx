'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[20, 22, 1, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Large Section Header */}
      <Html position={[0, 25, -10]} center distanceFactor={15}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-cyan-500 font-mono text-xl tracking-[0.8em] uppercase opacity-70">SECTION 02</h2>
          <h1 className="text-white font-bold text-8xl tracking-tighter shadow-2xl">IDENTITY_CORE</h1>
        </div>
      </Html>

      <group position={[0, 4, -5]}>
        {/* Left Panel: Biography - Enlarged and Centered */}
        <group position={[-6.5, 0, 0]} rotation={[0, 0.3, 0]}>
          <mesh>
            <planeGeometry args={[11, 14]} />
            <meshStandardMaterial transparent opacity={0.15} color="#4488ff" />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[11.2, 14.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.3} transparent />
          </mesh>
          
          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[500px] p-12 bg-blue-900/10 backdrop-blur-3xl border border-blue-500/50 rounded-[3rem] text-white font-sans shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center text-blue-400 font-mono text-3xl">JD</div>
                <div>
                  <h3 className="text-4xl font-bold tracking-tighter uppercase">John Doe</h3>
                  <p className="text-blue-400 font-mono text-sm mt-2 uppercase tracking-[0.3em]">Lead Systems Architect</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 bg-black/60 rounded-[2rem] border border-white/10">
                  <h4 className="text-[10px] text-blue-500 uppercase tracking-[0.3em] mb-4 font-mono">MISSION_PROFILE</h4>
                  <p className="text-xl leading-relaxed text-gray-200 font-light italic">
                    "Designing resilient digital infrastructures and high-performance interactive experiences."
                  </p>
                  <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent" />
                  <p className="mt-6 text-base text-gray-400 leading-relaxed">
                    Specializing in cloud-native systems, real-time visualization, and autonomous agent orchestration.
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Right Panel: Technical Metrics - Enlarged and Centered */}
        <group position={[6.5, 0, 0]} rotation={[0, -0.3, 0]}>
          <mesh>
            <planeGeometry args={[11, 14]} />
            <meshStandardMaterial transparent opacity={0.15} color="#4488ff" />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[11.2, 14.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.3} transparent />
          </mesh>

          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[500px] p-12 bg-blue-900/10 backdrop-blur-3xl border border-blue-500/50 rounded-[3rem] text-white font-sans shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <h3 className="text-blue-400 text-xs font-mono mb-10 uppercase tracking-[0.5em]">SYSTEM_CAPABILITIES</h3>
              <div className="space-y-8">
                {[
                  { label: "Architecture", val: 95 },
                  { label: "Frontend/R3F", val: 92 },
                  { label: "Backend/Cloud", val: 88 },
                  { label: "AI Ops", val: 82 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-sm font-mono uppercase tracking-[0.2em]">
                      <span>{skill.label}</span>
                      <span className="text-blue-400">{skill.val}%</span>
                    </div>
                    <div className="h-3 w-full bg-blue-500/10 rounded-full overflow-hidden border border-blue-500/20 p-[2px]">
                      <div 
                        className="h-full bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-1000" 
                        style={{ width: `${skill.val}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-[10px] font-mono text-blue-400/60 uppercase tracking-widest text-center">
                Status: Fully Operational // Syncing_Data...
              </div>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};

export default IdentityChamber;