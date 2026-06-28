'use client';

import React from 'react';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[8, 10, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glowing Ring on floor */}
      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 6.2, 32]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Holographic Display Panels (represented by glass-like boxes) */}
      <group position={[0, 3, 0]}>
        {/* Bio Panel */}
        <mesh position={[-4, 0, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[4, 6, 0.1]} />
          <meshStandardMaterial transparent opacity={0.3} color="#4488ff" emissive="#4488ff" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Stats Panel */}
        <mesh position={[4, 0, 0]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[4, 6, 0.1]} />
          <meshStandardMaterial transparent opacity={0.3} color="#4488ff" emissive="#4488ff" emissiveIntensity={0.5} />
        </mesh>

        {/* Central Portrait Holder */}
        <mesh position={[0, 1, 1]}>
          <boxGeometry args={[3, 4, 0.2]} />
          <meshStandardMaterial color="#222" metalness={1} />
        </mesh>
      </group>

      {/* Decorative ceiling ring */}
      <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.2, 16, 50]} />
        <meshBasicMaterial color="#4488ff" />
      </mesh>
    </group>
  );
};

export default IdentityChamber;