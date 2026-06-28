'use client';

import React from 'react';
import Lighting from './Lighting';
import CameraRig from './CameraRig';
import Entrance from './sections/Entrance';
import IdentityChamber from './sections/IdentityChamber';
import ExperienceVault from './sections/ExperienceVault';
import ProjectLab from './sections/ProjectLab';
import TechnologyMatrix from './sections/TechnologyMatrix';
import RooftopHub from './sections/RooftopHub';

interface ExperienceProps {
  started: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ started }) => {
  return (
    <>
      <color attach="background" args={['#020202']} />
      
      <Lighting />
      <CameraRig started={started} />

      <group>
        {/* 
          Standardized Depth-First Layout: 
          All chambers aligned on X=0 and Y=0.
          Navigation moves strictly along the Z-axis for maximum stability.
        */}
        <Entrance active={started} position={[0, 0, 0]} />
        <IdentityChamber position={[0, 0, -80]} />
        <ExperienceVault position={[0, 0, -180]} />
        <ProjectLab position={[0, 0, -320]} />
        <TechnologyMatrix position={[0, 0, -480]} />
        <RooftopHub position={[0, 0, -650]} />
      </group>

      {/* Global Environment Details */}
      <gridHelper args={[2000, 100, '#004488', '#050505']} position={[0, -2, 0]} opacity={0.1} transparent />
      
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(1000 * 3).map(() => (Math.random() - 0.5) * 1000)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#4488ff" size={0.5} transparent opacity={0.2} />
      </points>
    </>
  );
};

export default Experience;