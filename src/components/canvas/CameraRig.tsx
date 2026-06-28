
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

  // Precise waypoints for each chamber and sub-section
  // [x, y, z]
  const waypoints = [
    { pos: [0, 5, 25], look: [0, 4, -10] },      // 0: Entrance
    { pos: [0, 5, -5], look: [0, 4, -20] },       // 1: Entering Entrance
    { pos: [0, -36, -48], look: [0, -40, -60] },  // 2: Identity Chamber (Framing panels)
    { pos: [0, -86, -155], look: [0, -90, -170] }, // 3: Experience Vault - Card 1
    { pos: [0, -86, -185], look: [0, -90, -200] }, // 4: Experience Vault - Card 2
    { pos: [0, -86, -215], look: [0, -90, -230] }, // 5: Experience Vault - Card 3
    { pos: [0, -145, -250], look: [0, -150, -265] }, // 6: Project Lab
    { pos: [0, -215, -380], look: [0, -220, -395] }, // 7: Technology Matrix
    { pos: [0, -295, -550], look: [0, -300, -565] }, // 8: Communication Hub
  ];

  useFrame((state, delta) => {
    if (!started) {
      // Idle state before entry
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

    // Smooth movement between waypoints
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

    // Apply smooth tracking
    state.camera.position.lerp(targetPos.current, 0.1);
    
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    const smoothedLookAt = currentLookAt.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(smoothedLookAt);
  });

  return null;
};

export default CameraRig;
