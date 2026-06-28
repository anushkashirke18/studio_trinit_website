
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ProjectTerminal: React.FC<{ 
  position: [number, number, number]; 
  title: string;
  id: string;
  tech: string;
}> = ({ position, title, id, tech }) => (
  <group position={position}>
    {/* Geometric Cube Frame */}
    <mesh>
      <boxGeometry args={[8, 8, 8]} />
      <meshStandardMaterial transparent opacity={0.05} color="#00ffff" />
    </mesh>
    <mesh>
      <boxGeometry args={[8.1, 8.1, 8.1]} />
      <meshBasicMaterial wireframe color="#00ffff" opacity={0.2} transparent />
    </mesh>
    
    <Html position={[0, 0, 4.1]} center transform distanceFactor={8}>
      <div className="w-[350px] p-8 bg-cyan-950/20 backdrop-blur-2xl border border-cyan-500/40 rounded-[2rem] text-white">
        <div className="font-mono text-[10px] text-cyan-400 mb-2 tracking-[0.3em]">PROJ_ID_{id}</div>
        <h3 className="text-3xl font-bold mb-4 tracking-tighter">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 font-light">
          A high-performance system designed for large-scale data visualization and real-time processing.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-cyan-500/80">{tech}</span>
          <button className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/30 text-[10px] uppercase tracking-widest transition-all rounded-lg">
            Details
          </button>
        </div>
      </div>
    </Html>
  </group>
);

const ProjectLab: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Title */}
      <Html position={[0, 25, 0]} center distanceFactor={12}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-cyan-500 font-mono text-xl tracking-[1em] uppercase opacity-70">SECTION 04</h2>
          <h1 className="text-white font-bold text-8xl tracking-tighter">PROJECT LAB</h1>
        </div>
      </Html>

      {/* Project Grid */}
      <ProjectTerminal position={[-12, 5, -10]} title="Neural Nexus" id="NX-01" tech="PyTorch / FastAPI" />
      <ProjectTerminal position={[12, 8, -25]} title="Quantum Flow" id="QF-09" tech="Wasm / Rust" />
      <ProjectTerminal position={[-6, 12, -45]} title="Solaris Grid" id="SL-22" tech="React / WebGL" />

      {/* Structural floor with glow */}
      <mesh position={[0, -2, -25]}>
        <boxGeometry args={[60, 0.2, 80]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0, -1.9, -25]}>
        <planeGeometry args={[60, 80]} />
        <meshStandardMaterial transparent opacity={0.1} color="#00ffff" rotation={[-Math.PI / 2, 0, 0]} />
      </mesh>
    </group>
  );
};

export default ProjectLab;
