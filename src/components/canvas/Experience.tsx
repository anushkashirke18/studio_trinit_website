'use client';

import React from 'react';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

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
      <color attach="background" args={['#000000']} />
      {/* Lightened fog to prevent blank screen */}
      <fog attach="fog" args={['#000000', 20, 100]} />

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

      <EffectComposer disableNormalPass>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.025} 
          mipmapBlur 
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
};

export default Experience;