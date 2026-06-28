'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Structural Floor */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[20, 20, 0.2, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0} />
      </mesh>

      {/* Massive Section Header */}
      <Html position={[0, 18, -10]} center distanceFactor={15}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-blue-500 font-mono text-xl tracking-[0.8em] uppercase opacity-50">SECTION 02</h2>
          <h1 className="text-white font-bold text-9xl tracking-tighter">IDENTITY</h1>
        </div>
      </Html>

      <group position={[0, 4, -5]}>
        {/* Biography Panel */}
        <group position={[-8, 0, 0]} rotation={[0, 0.2, 0]}>
          <mesh>
            <planeGeometry args={[14, 18]} />
            <meshStandardMaterial color="#001122" transparent opacity={0.6} metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[14.2, 18.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.2} transparent />
          </mesh>
          
          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[600px] p-16 bg-blue-950/40 backdrop-blur-3xl border border-blue-500/50 rounded-[4rem] text-white">
              <div className="flex items-center gap-10 mb-12">
                <div className="w-32 h-32 rounded-full bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center text-blue-300 font-mono text-5xl">JD</div>
                <div>
                  <h3 className="text-5xl font-bold tracking-tighter uppercase mb-2">John Doe</h3>
                  <p className="text-blue-400 font-mono text-lg uppercase tracking-[0.4em]">Systems Architect</p>
                </div>
              </div>
              <div className="space-y-10">
                <div className="p-10 bg-black/60 rounded-[3rem] border border-white/5">
                  <h4 className="text-xs text-blue-500 uppercase tracking-[0.4em] mb-6 font-mono">CORE_MISSION</h4>
                  <p className="text-2xl leading-relaxed text-gray-100 font-light italic">
                    "Engineering resilient digital ecosystems that balance performance with elegant user experience."
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Technical Capabilities Panel */}
        <group position={[8, 0, 0]} rotation={[0, -0.2, 0]}>
          <mesh>
            <planeGeometry args={[14, 18]} />
            <meshStandardMaterial color="#001122" transparent opacity={0.6} metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[14.2, 18.2]} />
            <meshBasicMaterial wireframe color="#4488ff" opacity={0.2} transparent />
          </mesh>

          <Html position={[0, 0, 0.1]} center transform distanceFactor={10}>
            <div className="w-[600px] p-16 bg-blue-950/40 backdrop-blur-3xl border border-blue-500/50 rounded-[4rem] text-white">
              <h3 className="text-blue-400 text-sm font-mono mb-12 uppercase tracking-[0.6em]">TECHNICAL_INDEX</h3>
              <div className="space-y-10">
                {[
                  { label: "Architecture", val: 98 },
                  { label: "Visualization", val: 92 },
                  { label: "Engineering", val: 89 },
                  { label: "AI Labs", val: 85 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between text-base font-mono uppercase tracking-widest">
                      <span>{skill.label}</span>
                      <span className="text-blue-400">{skill.val}%</span>
                    </div>
                    <div className="h-4 w-full bg-blue-500/10 rounded-full border border-blue-500/20 p-1">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)]" 
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