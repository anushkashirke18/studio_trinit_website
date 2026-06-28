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
        <Entrance active={started} />
        <IdentityChamber position={[0, -20, -30]} />
        <ExperienceVault position={[0, -40, -80]} />
        <ProjectLab position={[40, -70, -120]} />
        <TechnologyMatrix position={[0, -100, -180]} />
        <RooftopHub position={[0, -130, -250]} />
      </group>
    </>
  );
};

export default Experience;
