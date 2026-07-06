'use client';

import React from 'react';
import { Html, Float } from '@react-three/drei';

export default function ProjectLab({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Industrial Lab Lab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Floating Project Cubes */}
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[(i - 1) * 6, 5, 0]}>
          <group>
            <mesh castShadow>
              <boxGeometry args={[4, 4, 4]} />
              <meshStandardMaterial color="#000" transparent opacity={0.4} />
            </mesh>
            <mesh>
              <boxGeometry args={[4.1, 4.1, 4.1]} />
              <meshBasicMaterial color="#4488ff" wireframe />
            </mesh>
            <Html transform distanceFactor={5} position={[0, 0, 2.1]}>
              <div className="w-48 p-4 bg-blue-600/10 border border-blue-500/40 text-white text-center font-mono">
                <h4 className="font-bold text-sm">PROJ_{i+1}</h4>
                <div className="text-[8px] mt-2 opacity-50 uppercase tracking-widest">Digital Twin Interface</div>
                <button className="mt-4 px-4 py-1 border border-white/20 text-[8px] hover:bg-white hover:text-black transition-colors uppercase">View Specs</button>
              </div>
            </Html>
          </group>
        </Float>
      ))}

      {/* Ceiling Detail */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <gridHelper args={[20, 10, '#222', '#111']} />
      </mesh>
    </group>
  );
}
