'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function IdentityChamber({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Solid Circular Foundation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[10, 10, 0.5, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Structural Pillars */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 9, 5, Math.sin(i * Math.PI / 2) * 9]} castShadow>
          <boxGeometry args={[0.8, 10, 0.8]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Info Panels - Perfectly Centered at Camera Y=5 */}
      <group position={[0, 5, 0]}>
        {/* Bio Panel */}
        <group position={[-3.5, 0, 0]}>
          <mesh>
            <planeGeometry args={[5, 7]} />
            <meshStandardMaterial color="#000" metalness={1} roughness={0} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[5.2, 7.2]} />
            <meshBasicMaterial color="#4488ff" />
          </mesh>
          <Html transform distanceFactor={5} position={[0, 0, 0.1]}>
            <div className="w-80 p-8 bg-black/90 border-l-4 border-blue-600 text-white font-mono select-none backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-tighter">Biographical</h2>
              <p className="text-xs leading-relaxed opacity-90 mb-6">
                Specializing in the intersection of immersive 3D architectures and scalable web technologies. 
                Designing digital systems that redefine user experience.
              </p>
              <div className="space-y-2 text-[10px] opacity-50 uppercase tracking-widest border-t border-white/10 pt-4">
                <div className="flex justify-between"><span>Status</span> <span className="text-white">Active</span></div>
                <div className="flex justify-between"><span>Location</span> <span className="text-white">London, UK</span></div>
              </div>
            </div>
          </Html>
        </group>

        {/* Skills Panel */}
        <group position={[3.5, 0, 0]}>
          <mesh>
            <planeGeometry args={[5, 7]} />
            <meshStandardMaterial color="#000" metalness={1} roughness={0} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[5.2, 7.2]} />
            <meshBasicMaterial color="#4488ff" />
          </mesh>
          <Html transform distanceFactor={5} position={[0, 0, 0.1]}>
            <div className="w-80 p-8 bg-black/90 border-l-4 border-blue-600 text-white font-mono select-none backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-tighter">Technical Stack</h2>
              <div className="space-y-4">
                {[
                  { name: 'React / Next.js', val: '98%' },
                  { name: 'Three.js / WebGL', val: '92%' },
                  { name: 'TypeScript', val: '95%' },
                  { name: 'Firebase / GenAI', val: '88%' }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1 opacity-70">
                      <span>{s.name}</span>
                      <span>{s.val}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10">
                      <div className="h-full bg-blue-500" style={{ width: s.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Html>
        </group>
      </group>

      {/* Ceiling Detail */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[10, 10, 0.5, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
