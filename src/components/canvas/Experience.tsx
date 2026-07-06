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
      {/* All sections aligned strictly on the Z-axis (Depth) */}
      
      {/* Entrance: Z: 0 to -15 */}
      <Entrance started={started} position={[0, 0, 0]} />

      {/* Identity Chamber: Z: -25 */}
      <IdentityChamber position={[0, 0, -25]} />

      {/* Experience Vault: Z: -45 to -70 */}
      <ExperienceVault position={[0, 0, -55]} />

      {/* Project Lab: Z: -85 */}
      <ProjectLab position={[0, 0, -85]} />

      {/* Rooftop/Communication Hub: Z: -125 */}
      <RooftopHub position={[0, 0, -125]} />

      {/* Global Floor to ground the facility */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -60]} receiveShadow>
        <planeGeometry args={[100, 300]} />
        <meshStandardMaterial color="#020202" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}
