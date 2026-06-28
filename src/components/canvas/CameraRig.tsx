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
 * It maps the scroll offset (0 to 1) to a predefined path of waypoints.
 */
const CameraRig: React.FC<CameraRigProps> = ({ started }) => {
  const scroll = useScroll();
  const targetPos = useRef(new THREE.Vector3(0, 5, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 4, 0));

  // Waypoints are now strictly centered on the information panels of each section
  // Chamber locations:
  // Entrance: [0, 0, 0]
  // Identity: [0, -40, -60]
  // Vault: [0, -90, -140]
  // Lab: [0, -150, -250]
  // Matrix: [0, -220, -380]
  // Hub: [0, -300, -550]

  const waypoints = [
    { pos: [0, 5, 25], look: [0, 4, 0] },         // 0: Entrance Exterior
    { pos: [0, 5, -5], look: [0, 4, -15] },       // 1: Entering the Core
    { pos: [0, -36, -45], look: [0, -36, -60] },  // 2: Identity Chamber (Directly facing panels)
    { pos: [0, -86, -145], look: [0, -86, -160] }, // 3: Experience Vault - Entry
    { pos: [0, -86, -185], look: [0, -86, -200] }, // 4: Experience Vault - Card 2
    { pos: [0, -86, -215], look: [0, -86, -230] }, // 5: Experience Vault - Card 3
    { pos: [0, -146, -240], look: [0, -146, -260] }, // 6: Project Lab (Facing cubes)
    { pos: [0, -216, -370], look: [0, -216, -390] }, // 7: Tech Matrix (Facing energy core)
    { pos: [0, -296, -540], look: [0, -296, -560] }, // 8: Communication Hub (Facing console)
  ];

  useFrame((state, delta) => {
    if (!started) {
      targetPos.current.set(0, 5, 30);
      targetLookAt.current.set(0, 5, 0);
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // 0 to 1
    const totalSegments = waypoints.length - 1;
    const scaledOffset = offset * totalSegments;
    const index = Math.min(Math.floor(scaledOffset), totalSegments - 1);
    const weight = scaledOffset - index;

    // Smoothstep for cinematic ease between waypoints
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

    // Smooth follow
    state.camera.position.lerp(targetPos.current, 0.1);
    
    // Smooth LookAt transition
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    const smoothedLookAt = currentLookAt.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(smoothedLookAt);
  });

  return null;
};

export default CameraRig;