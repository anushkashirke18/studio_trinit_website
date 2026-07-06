'use client';

import React from 'react';
import { Html } from '@react-three/drei';

export default function IdentityChamber({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Solid Circular Foundation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[8, 8, 0.5, 32]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Structural Pillars */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 7, 5, Math.sin(i * Math.PI / 2) * 7]} castShadow>
          <boxGeometry args={[0.5, 10, 0.5]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}

      {/* Central Information Hub - Locked at Eye Level */}
      <group position={[0, 5, 0]}>
        {/* Bio Panel */}
        <group position={[-2.5, 0, 0]}>
          <mesh>
            <planeGeometry args={[4, 6]} />
            <meshStandardMaterial color="#000" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.2, 6.2]} />
            <meshBasicMaterial color="#4488ff" wireframe />
          </mesh>
          <Html transform distanceFactor={5} position={[0, 0, 0.1]}>
            <div className="w-64 p-6 bg-black/80 border border-blue-500/30 text-white font-mono select-none">
              <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-2">BIOGRAPHICAL</h2>
              <p className="text-[10px] leading-relaxed opacity-80 mb-4">
                DESIGNING IMMERSIVE DIGITAL REALITIES. SPECIALIZING IN THE INTERSECTION OF 3D ARCHITECTURE AND WEB TECHNOLOGY.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[8px] opacity-40">
                <span>// STATUS: ACTIVE</span>
                <span>// ORIGIN: LONDON</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Skills Panel */}
        <group position={[2.5, 0, 0]}>
          <mesh>
            <planeGeometry args={[4, 6]} />
            <meshStandardMaterial color="#000" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.2, 6.2]} />
            <meshBasicMaterial color="#4488ff" wireframe />
          </mesh>
          <Html transform distanceFactor={5} position={[0, 0, 0.1]}>
            <div className="w-64 p-6 bg-black/80 border border-blue-500/30 text-white font-mono select-none">
              <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-2">TECHNICAL</h2>
              <ul className="space-y-2 text-[10px]">
                <li className="flex justify-between"><span>REACT / NEXT.JS</span> <span className="text-blue-500">95%</span></li>
                <li className="flex justify-between"><span>THREE.JS / WEBGL</span> <span className="text-blue-500">88%</span></li>
                <li className="flex justify-between"><span>TYPESCRIPT</span> <span className="text-blue-500">92%</span></li>
                <li className="flex justify-between"><span>GEN AI / GENKIT</span> <span className="text-blue-500">85%</span></li>
              </ul>
            </div>
          </Html>
        </group>
      </group>

      {/* Atmosphere Detail */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 6, 64]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
