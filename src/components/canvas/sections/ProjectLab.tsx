
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ProjectDisplay: React.FC<{ 
  position: [number, number, number]; 
  title: string;
  id: string;
}> = ({ position, title, id }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[6, 6, 6]} />
      <meshStandardMaterial transparent opacity={0.1} color="#00ffff" />
    </mesh>
    <mesh>
      <boxGeometry args={[6.1, 6.1, 6.1]} />
      <meshBasicMaterial wireframe color="#00ffff" opacity={0.3} transparent />
    </mesh>
    <Html position={[0, 5, 0]} center distanceFactor={8}>
      <div className="bg-black/90 p-4 border-2 border-cyan-500/50 rounded-2xl text-white text-center w-64 backdrop-blur-xl">
        <p className="text-[10px] font-mono text-cyan-400 mb-1">PROJECT_IDENTIFIER: {id}</p>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <button className="mt-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 text-[10px] uppercase tracking-widest transition-all">
          Initialize View
        </button>
      </div>
    </Html>
  </group>
);

const ProjectLab: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <Html position={[0, 20, 0]} center distanceFactor={12}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-cyan-500 font-mono text-xl tracking-[0.8em] uppercase opacity-70">SECTION 04</h2>
          <h1 className="text-white font-bold text-7xl tracking-tighter">PROJECT LAB</h1>
        </div>
      </Html>

      {/* Floating Interactive Projects */}
      <ProjectDisplay position={[-10, 4, -5]} title="Neural Nexus AI" id="NX-01" />
      <ProjectDisplay position={[12, 6, -20]} title="Quantum Flow Engine" id="QF-09" />
      <ProjectDisplay position={[-5, 8, -40]} title="Solaris Grid OS" id="SL-22" />

      {/* Floor Grid */}
      <mesh position={[0, -2, -20]}>
        <boxGeometry args={[60, 0.5, 80]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
};

export default ProjectLab;
