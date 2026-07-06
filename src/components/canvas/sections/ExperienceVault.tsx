'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ExperienceVault({ position }: { position: [number, number, number] }) {
  const experiences = [
    { title: "SENIOR ENGINEER", company: "TECH_CORE", period: "2022-2024" },
    { title: "LEAD ARCHITECT", company: "NEXUS_SYSTEMS", period: "2020-2022" },
    { title: "WEB DEVELOPER", company: "VOID_STUDIO", period: "2018-2020" }
  ];

  return (
    <group position={position}>
      {/* Long Corridor Architecture */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[12, 10, 40]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Structural Ribs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 5, -20 + i * 10]}>
          <boxGeometry args={[12.1, 10.1, 0.2]} />
          <meshStandardMaterial color="#222" wireframe />
        </mesh>
      ))}

      {/* Experience Terminals */}
      {experiences.map((exp, i) => (
        <group key={i} position={[0, 5, -15 + i * 15]}>
          <Html transform distanceFactor={6} position={[0, 0, 0]}>
            <div className="w-96 p-8 bg-black/90 border-l-4 border-blue-600 text-white font-mono select-none backdrop-blur-md">
              <span className="text-blue-500 text-[8px] tracking-[0.3em] uppercase">{exp.period}</span>
              <h3 className="text-2xl font-bold mt-2 uppercase">{exp.title}</h3>
              <p className="text-white/40 text-[10px] tracking-widest mt-1">@ {exp.company}</p>
              <div className="mt-6 h-[1px] w-full bg-white/10" />
              <p className="mt-4 text-[9px] leading-relaxed opacity-60">
                IMPLEMENTING SCALABLE SOLUTIONS FOR COMPLEX DIGITAL INFRASTRUCTURES. 
                MANAGING CROSS-FUNCTIONAL TEAMS AND SYSTEM ARCHITECTURES.
              </p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
