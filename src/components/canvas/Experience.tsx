
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
          All sections are now aligned to x=0 for a consistent camera path.
          They are spaced vertically (Y) and by depth (Z) to prevent overlapping.
        */}
        <Entrance active={started} position={[0, 0, 0]} />
        <IdentityChamber position={[0, -40, -60]} />
        <ExperienceVault position={[0, -90, -140]} />
        <ProjectLab position={[0, -150, -250]} />
        <TechnologyMatrix position={[0, -220, -380]} />
        <RooftopHub position={[0, -300, -550]} />
      </group>

      {/* Global Background Elements */}
      <gridHelper args={[2000, 100, '#004488', '#050505']} position={[0, -5, 0]} opacity={0.05} transparent />
      
      {/* Distant fog-like particles for depth */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 100,
          -i * 20,
          -i * 30
        ]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#4488ff" transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
};

export default Experience;
