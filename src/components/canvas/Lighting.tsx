
'use client';

import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

const Lighting: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4488ff" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <ContactShadows 
        position={[0, -5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={4.5} 
      />
    </>
  );
};

export default Lighting;
