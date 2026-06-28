'use client';

import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      {/* High-intensity ambient light for base visibility */}
      <ambientLight intensity={1.5} />
      
      {/* Key light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2} 
        castShadow 
      />

      {/* Fill lights for different chambers */}
      <pointLight position={[0, 5, 10]} intensity={10} color="#4488ff" distance={30} />
      <pointLight position={[0, -20, -30]} intensity={15} color="#00ffff" distance={50} />
      <pointLight position={[0, -40, -80]} intensity={15} color="#ffffff" distance={50} />
      
      {/* Soft blue wash */}
      <hemisphereLight args={['#4488ff', '#050505', 1]} />
    </>
  );
};

export default Lighting;