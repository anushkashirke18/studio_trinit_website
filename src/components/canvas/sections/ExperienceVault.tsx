
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ExperienceCard: React.FC<{ 
  position: [number, number, number]; 
  company: string;
  role: string;
  period: string;
  description: string;
}> = ({ position, company, role, period, description }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[12, 8, 0.5]} />
      <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
    </mesh>
    <mesh position={[0, 0, 0.3]}>
      <planeGeometry args={[11.5, 7.5]} />
      <meshStandardMaterial transparent opacity={0.05} color="#4488ff" />
    </mesh>
    <Html position={[0, 0, 0.31]} center transform distanceFactor={8}>
      <div className="w-[500px] p-10 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl text-white font-sans">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{company}</h3>
            <p className="text-blue-400 font-mono text-sm uppercase mt-1">{role}</p>
          </div>
          <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono border border-white/10">
            {period}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex gap-2">
          {["Next.js", "TypeScript", "AWS"].map(tag => (
            <span key={tag} className="text-[10px] font-mono text-blue-500/70 border border-blue-500/20 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Html>
  </group>
);

const ExperienceVault: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Structural Elements */}
      <mesh position={[0, -2, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 100]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      <Html position={[0, 25, -5]} center distanceFactor={15}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-blue-500 font-mono text-xl tracking-[0.8em] uppercase opacity-70">SECTION 03</h2>
          <h1 className="text-white font-bold text-7xl tracking-tighter">CAREER VAULT</h1>
        </div>
      </Html>

      {/* Experience Timeline */}
      <ExperienceCard 
        position={[0, 4, -10]} 
        company="TechNova Solutions" 
        role="Lead Systems Architect" 
        period="2021 - PRESENT"
        description="Pioneering decentralized infrastructure models and leading a team of 15 engineers in developing high-availability cloud solutions."
      />
      
      <ExperienceCard 
        position={[0, 4, -30]} 
        company="CyberDyne Systems" 
        role="Senior Developer" 
        period="2018 - 2021"
        description="Engineered core machine learning pipelines and optimized real-time data streaming architectures for industrial automation."
      />

      <ExperienceCard 
        position={[0, 4, -50]} 
        company="FutureCraft Inc" 
        role="Full Stack Engineer" 
        period="2016 - 2018"
        description="Developed and scaled consumer-facing platforms, focusing on React-based performance optimization and microservices."
      />

      {/* Lighting pylons */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? -12 : 12), 8, -i * 15]}>
          <boxGeometry args={[0.2, 20, 0.2]} />
          <meshBasicMaterial color="#4488ff" />
        </mesh>
      ))}
    </group>
  );
};

export default ExperienceVault;
