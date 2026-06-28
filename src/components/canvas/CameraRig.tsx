'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface CameraRigProps {
  started: boolean;
}

/**
 * CameraRig manages the cinematic movement of the camera through "The Core".
 * Optimized for a "Level-First" experience to ensure content visibility.
 */
const CameraRig: React.FC<CameraRigProps> = ({ started }) => {
  const scroll = useScroll();
  const targetPos = useRef(new THREE.Vector3(0, 5, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 4, 0));

  // Waypoints are mapped to Z and Y coordinates of sections.
  // Chamber locations:
  // Entrance: [0, 0, 0]
  // Identity: [0, -40, -60]
  // Vault: [0, -90, -140]
  // Lab: [0, -150, -250]
  // Matrix: [0, -220, -380]
  // Hub: [0, -300, -550]

  const waypoints = [
    { pos: [0, 5, 25], look: [0, 4, 0] },          // 0: Entrance Exterior
    { pos: [0, 5, -10], look: [0, 4, -20] },       // 1: Inside Entrance
    { pos: [0, -36, -40], look: [0, -40, -60] },   // 2: Identity Chamber Approach
    { pos: [0, -40, -52], look: [0, -40, -65] },   // 3: Identity Chamber - AT PANELS
    { pos: [0, -86, -120], look: [0, -90, -140] }, // 4: Career Vault Approach
    { pos: [0, -90, -150], look: [0, -90, -170] }, // 5: Career Vault - Card 1
    { pos: [0, -90, -185], look: [0, -90, -205] }, // 6: Career Vault - Card 2
    { pos: [0, -145, -230], look: [0, -150, -250] }, // 7: Project Lab Approach
    { pos: [0, -150, -260], look: [0, -150, -280] }, // 8: Project Lab - Inside
    { pos: [0, -220, -380], look: [0, -220, -400] }, // 9: Tech Matrix
    { pos: [0, -300, -535], look: [0, -300, -555] }, // 10: Communication Hub
  ];

  useFrame((state, delta) => {
    if (!started) {
      targetPos.current.set(0, 5, 30);
      targetLookAt.current.set(0, 4, 0);
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // 0 to 1
    const totalSegments = waypoints.length - 1;
    const scaledOffset = offset * totalSegments;
    const index = Math.min(Math.floor(scaledOffset), totalSegments - 1);
    const weight = scaledOffset - index;

    // Use smoothstep for a more tactile "click" into position at each waypoint
    const easedWeight = THREE.MathUtils.smoothstep(weight, 0, 1);

    const start = waypoints[index];
    const end = waypoints[index + 1];

    // Interpolate Position
    targetPos.current.set(
      THREE.MathUtils.lerp(start.pos[0], end.pos[0], easedWeight),
      THREE.MathUtils.lerp(start.pos[1], end.pos[1], easedWeight),
      THREE.MathUtils.lerp(start.pos[2], end.pos[2], easedWeight)
    );

    // Interpolate LookAt
    targetLookAt.current.set(
      THREE.MathUtils.lerp(start.look[0], end.look[0], easedWeight),
      THREE.MathUtils.lerp(start.look[1], end.look[1], easedWeight),
      THREE.MathUtils.lerp(start.look[2], end.look[2], easedWeight)
    );

    // Smooth movement and look
    state.camera.position.lerp(targetPos.current, 0.1);
    
    // We use a dummy vector to smooth the lookAt point
    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    currentLook.add(state.camera.position);
    const smoothedLook = currentLook.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(smoothedLook);
  });

  return null;
};

export default CameraRig;