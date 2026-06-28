
'use client';

import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

const Lighting: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#4488ff" />
      <pointLight position={[-10, 10, 0]} intensity={1.5} color="#00ffff" />
      <spotLight
        position={[0, 25, 10]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <ContactShadows 
        position={[0, -1.99, 0]} 
        opacity={0.6} 
        scale={50} 
        blur={2} 
        far={5} 
      />
    </>
  );
};

export default Lighting;
