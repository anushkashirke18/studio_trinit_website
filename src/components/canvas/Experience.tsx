
'use client';

import React from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
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
  const scroll = useScroll();

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 30]} />

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
          intensity={1.5} 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.025} 
          mipmapBlur 
        />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default Experience;
