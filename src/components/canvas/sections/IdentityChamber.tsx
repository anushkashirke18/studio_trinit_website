'use client';

import React from 'react';

const IdentityChamber: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[5, 6, 0.5, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Holographic Placeholder (Box instead of Html/Text to avoid Suspense hang) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 5, 0.1]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.4} 
          color="#4488ff" 
          emissive="#4488ff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Reference Sphere for visibility check */}
      <mesh position={[0, 6, -5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#4488ff" wireframe />
      </mesh>
    </group>
  );
};

export default IdentityChamber;
