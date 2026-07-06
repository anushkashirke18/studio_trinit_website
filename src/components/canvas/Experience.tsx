'use client';

import React from 'react';
import Entrance from './sections/Entrance';
import IdentityChamber from './sections/IdentityChamber';
import ExperienceVault from './sections/ExperienceVault';
import ProjectLab from './sections/ProjectLab';
import RooftopHub from './sections/RooftopHub';

export default function Experience({ started }: { started: boolean }) {
  return (
    <group>
      {/* 
        Linear facility layout along the Z-axis.
        All Y-positions are relative to the floor at Y=0.
      */}
      
      {/* Entrance: Z: 0 */}
      <Entrance started={started} position={[0, 0, 0]} />

      {/* Identity Chamber: Z: -25 */}
      <IdentityChamber position={[0, 0, -25]} />

      {/* Experience Vault: Z: -55 */}
      <ExperienceVault position={[0, 0, -55]} />

      {/* Project Lab: Z: -85 */}
      <ProjectLab position={[0, 0, -85]} />

      {/* Communication Hub: Z: -125 */}
      <RooftopHub position={[0, 0, -125]} />

      {/* Heavy Industrial Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -60]} receiveShadow>
        <planeGeometry args={[200, 400]} />
        <meshStandardMaterial color="#020202" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
