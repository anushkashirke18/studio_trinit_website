'use client';

import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2} 
      />

      <pointLight position={[0, 5, 5]} intensity={20} color="#4488ff" distance={50} />
      <pointLight position={[0, -20, -30]} intensity={30} color="#00ffff" distance={100} />
      <pointLight position={[0, -40, -80]} intensity={30} color="#ffffff" distance={100} />
      
      <hemisphereLight args={['#4488ff', '#050505', 1]} />
    </>
  );
};

export default Lighting;
