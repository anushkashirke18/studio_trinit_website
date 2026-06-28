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
          Vertical/Depth Stack: All chambers centered on X=0.
          Spaced consistently to prevent visual bleed between sections.
        */}
        <Entrance active={started} position={[0, 0, 0]} />
        <IdentityChamber position={[0, -40, -60]} />
        <ExperienceVault position={[0, -90, -140]} />
        <ProjectLab position={[0, -150, -250]} />
        <TechnologyMatrix position={[0, -220, -380]} />
        <RooftopHub position={[0, -300, -550]} />
      </group>

      {/* Global Background Grid */}
      <gridHelper args={[2000, 100, '#004488', '#050505']} position={[0, -5, 0]} opacity={0.05} transparent />
      
      {/* Distant Particle System */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 1000)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#4488ff" size={0.5} transparent opacity={0.1} />
      </points>
    </>
  );
};

export default Experience;