'use client';

import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      {/* High-intensity baseline lighting */}
      <ambientLight intensity={0.8} />
      
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight position={[0, 10, 15]} intensity={5} color="#ffffff" distance={50} />
      
      {/* Accent volumetric feel without post-processing */}
      <spotLight
        position={[0, 20, 10]}
        angle={0.5}
        penumbra={1}
        intensity={10}
        castShadow
        color="#4488ff"
      />
    </>
  );
};

export default Lighting;
