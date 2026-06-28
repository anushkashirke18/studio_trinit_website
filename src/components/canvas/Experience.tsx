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
      <color attach="background" args={['#050505']} />
      
      <Lighting />
      <CameraRig started={started} />

      <group>
        {/* Each section is placed along a deep 3D path */}
        <Entrance active={started} />
        <IdentityChamber position={[0, -20, -30]} />
        <ExperienceVault position={[0, -45, -80]} />
        <ProjectLab position={[40, -80, -130]} />
        <TechnologyMatrix position={[0, -120, -200]} />
        <RooftopHub position={[0, -160, -280]} />
      </group>

      {/* Global Background Grid to help orientation */}
      <gridHelper args={[1000, 100, '#4488ff', '#111111']} position={[0, -5, 0]} rotation={[0, 0, 0]} opacity={0.1} transparent />
    </>
  );
};

export default Experience;