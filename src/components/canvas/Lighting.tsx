'use client';

import React from 'react';
import { Environment } from '@react-three/drei';

const Lighting: React.FC = () => {
  return (
    <>
      {/* Using a standard preset but with explicit intensity */}
      <Environment preset="night" blur={0.8} />
      
      <ambientLight intensity={0.5} />
      
      {/* Strong entrance fill light */}
      <pointLight position={[0, 5, 10]} intensity={3} color="#ffffff" distance={30} />
      
      {/* Blue accent light for the vault */}
      <pointLight position={[5, 10, 5]} intensity={5} color="#00ffff" distance={20} />
      
      {/* Secondary cyan light */}
      <pointLight position={[-5, 2, 0]} intensity={4} color="#4488ff" distance={20} />
      
      {/* Spot light for the hydraulic door */}
      <spotLight
        position={[0, 15, 5]}
        angle={0.4}
        penumbra={1}
        intensity={10}
        castShadow
        color="#ffffff"
      />
    </>
  );
};

export default Lighting;