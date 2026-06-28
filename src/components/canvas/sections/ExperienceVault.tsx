
'use client';

import React from 'react';
import { Html } from '@react-three/drei';

const ExperienceCard: React.FC<{ 
  position: [number, number, number]; 
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}> = ({ position, company, role, period, description, tags }) => (
  <group position={position}>
    {/* Glass Backdrop */}
    <mesh>
      <boxGeometry args={[14, 9, 0.1]} />
      <meshStandardMaterial transparent opacity={0.1} color="#4488ff" metalness={1} roughness={0} />
    </mesh>
    <mesh position={[0, 0, -0.05]}>
      <boxGeometry args={[14.1, 9.1, 0.05]} />
      <meshBasicMaterial wireframe color="#4488ff" opacity={0.2} transparent />
    </mesh>
    <Html position={[0, 0, 0.1]} center transform distanceFactor={8}>
      <div className="w-[500px] p-10 bg-black/80 backdrop-blur-3xl border border-blue-500/30 rounded-[2.5rem] text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold tracking-tighter">{company}</h3>
            <p className="text-blue-400 font-mono text-sm uppercase mt-1 tracking-widest">{role}</p>
          </div>
          <span className="px-4 py-2 bg-blue-500/10 rounded-xl text-[10px] font-mono border border-blue-500/20 whitespace-nowrap">
            {period}
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-lg">
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
      {/* Structural Label */}
      <Html position={[0, 25, -10]} center distanceFactor={15}>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-blue-500 font-mono text-xl tracking-[1em] uppercase opacity-70">SECTION 03</h2>
          <h1 className="text-white font-bold text-8xl tracking-tighter">CAREER VAULT</h1>
        </div>
      </Html>

      {/* Experience Timeline along the path */}
      <ExperienceCard 
        position={[0, 4, -15]} 
        company="Global Systems" 
        role="Lead Architect" 
        period="2021 - PRESENT"
        description="Overseeing enterprise-grade cloud transformations and managing cross-functional engineering teams for Fortune 500 clients."
        tags={["Next.js", "K8s", "PostgreSQL", "Terraform"]}
      />
      
      <ExperienceCard 
        position={[0, 4, -45]} 
        company="Innovation Labs" 
        role="Senior Fullstack Engineer" 
        period="2018 - 2021"
        description="Developed real-time analytics platforms processing millions of events per second with high availability."
        tags={["React", "Node.js", "Redis", "Kafka"]}
      />

      <ExperienceCard 
        position={[0, 4, -75]} 
        company="Web Pioneers" 
        role="Software Developer" 
        period="2016 - 2018"
        description="Started as an early-stage employee building responsive e-commerce solutions and internal management tools."
        tags={["JavaScript", "Ruby on Rails", "CSS3", "Git"]}
      />

      {/* Atmospheric Pillars */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[(i % 2 === 0 ? -15 : 15), 10, -i * 20]}>
          <boxGeometry args={[0.5, 30, 0.5]} />
          <meshStandardMaterial color="#111" emissive="#4488ff" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default ExperienceVault;
