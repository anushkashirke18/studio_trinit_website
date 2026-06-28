
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

      {/* Large readable section header */}
      <Html position={[0, 15, 0]} center distanceFactor={12}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-cyan-500 font-mono text-xl tracking-[0.8em] uppercase opacity-70">SECTION 02</h2>
          <h1 className="text-white font-bold text-7xl tracking-tighter shadow-2xl">IDENTITY</h1>
        </div>
      </Html>

      <group position={[0, 4, 0]}>
        {/* Left Panel: Biography - Brought closer for visibility */}
        <group position={[-6, 0, 0]} rotation={[0, 0.4, 0]}>
          <mesh>
            <planeGeometry args={[8, 10]} />
            <meshStandardMaterial transparent opacity={0.1} color="#4488ff" />
          </mesh>
          <Html position={[0, 0, 0.1]} center transform distanceFactor={5}>
            <div className="w-[300px] p-8 bg-blue-900/10 backdrop-blur-xl border border-blue-500/40 rounded-3xl text-white font-sans">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50" />
                <div>
                  <h3 className="text-2xl font-bold">John Doe</h3>
                  <p className="text-blue-400 font-mono text-xs">ARCHITECT_ID: 8829-X</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <h4 className="text-[10px] text-blue-400 uppercase tracking-widest mb-1">Mission Profile</h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Specializing in building robust digital infrastructures and high-performance user experiences for the next generation of web systems.
                  </p>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Right Panel: Technical Metrics - Brought closer for visibility */}
        <group position={[6, 0, 0]} rotation={[0, -0.4, 0]}>
          <mesh>
            <planeGeometry args={[8, 10]} />
            <meshStandardMaterial transparent opacity={0.1} color="#4488ff" />
          </mesh>
          <Html position={[0, 0, 0.1]} center transform distanceFactor={5}>
            <div className="w-[300px] p-8 bg-blue-900/10 backdrop-blur-xl border border-blue-500/40 rounded-3xl text-white font-sans">
              <h3 className="text-blue-400 text-xs font-mono mb-6 uppercase tracking-[0.2em]">Core_Capabilities</h3>
              <div className="space-y-4">
                {[
                  { label: "Systems Architecture", val: 95 },
                  { label: "Full-Stack Dev", val: 90 },
                  { label: "Real-time Graphics", val: 85 },
                  { label: "AI Integration", val: 80 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase">
                      <span>{skill.label}</span>
                      <span className="text-blue-400">{skill.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-blue-500/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${skill.val}%` }} />
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
