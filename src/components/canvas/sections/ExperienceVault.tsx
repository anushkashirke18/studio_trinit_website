'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ExperienceVault({ position }: { position: [number, number, number] }) {
  const experiences = [
    { title: "Senior Systems Engineer", company: "TechCore Global", period: "2022 - Present" },
    { title: "Lead Web Architect", company: "Nexus Systems", period: "2020 - 2022" },
    { title: "Front-End Developer", company: "Void Digital", period: "2018 - 2020" }
  ];

  return (
    <group position={position}>
      {/* Heavy Industrial Corridor */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[15, 12, 50]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Structural Ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <group key={i} position={[0, 5, -20 + i * 10]}>
          <mesh>
            <boxGeometry args={[15.2, 12.2, 0.5]} />
            <meshStandardMaterial color="#111" metalness={1} roughness={0} />
          </mesh>
          <mesh position={[0, 0, 0.3]}>
            <boxGeometry args={[15.3, 12.3, 0.1]} />
            <meshBasicMaterial color="#4488ff" wireframe />
          </mesh>
        </group>
      ))}

      {/* Experience Terminals */}
      {experiences.map((exp, i) => (
        <group key={i} position={[0, 5, -15 + i * 15]}>
          <mesh position={[0, 0, -0.5]}>
            <boxGeometry args={[8, 5, 0.2]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <Html transform distanceFactor={6} position={[0, 0, 0]}>
            <div className="w-[500px] p-10 bg-black/95 border-l-8 border-blue-600 text-white font-mono select-none backdrop-blur-2xl">
              <span className="text-blue-500 text-xs tracking-[0.5em] uppercase font-bold">{exp.period}</span>
              <h3 className="text-4xl font-black mt-2 uppercase tracking-tighter">{exp.title}</h3>
              <p className="text-white/50 text-sm tracking-widest mt-2">@ {exp.company}</p>
              <div className="mt-8 h-[1px] w-full bg-white/20" />
              <p className="mt-6 text-xs leading-relaxed opacity-80 uppercase">
                Leading the architectural vision for high-performance systems. 
                Integrating modern frameworks with robust backend infrastructure 
                to deliver seamless user experiences.
              </p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
