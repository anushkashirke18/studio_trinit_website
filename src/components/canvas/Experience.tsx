
'use client';

import React from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
      <color attach="background" args={['#010101']} />
      <fog attach="fog" args={['#010101', 10, 50]} />

      <Lighting />
      <CameraRig started={started} />

      <group>
        <Entrance active={started} />
        <IdentityChamber position={[0, -20, -20]} />
        <ExperienceVault position={[0, -40, -60]} />
        <ProjectLab position={[40, -60, -80]} />
        <TechnologyMatrix position={[0, -80, -120]} />
        <RooftopHub position={[0, -100, -160]} />
      </group>

      <EffectComposer disableNormalPass>
        <Bloom 
          intensity={1.0} 
          luminanceThreshold={0.8} 
          luminanceSmoothing={0.3} 
          mipmapBlur 
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default Experience;
