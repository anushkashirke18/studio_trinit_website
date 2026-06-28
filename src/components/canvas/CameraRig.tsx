
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
  const targetPos = useRef(new THREE.Vector3(0, 5, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 5, 0));

  // Waypoints for the camera journey
  // Each index corresponds to a section stop
  const waypoints = [
    { pos: [0, 5, 22], look: [0, 4, -10] },      // 0: Entrance (Resting)
    { pos: [0, 5, -10], look: [0, 4, -50] },     // 1: Past Entrance
    { pos: [0, -35, -45], look: [0, -40, -60] },  // 2: Identity Chamber (Stop)
    { pos: [0, -85, -125], look: [0, -90, -140] }, // 3: Experience Vault (Stop)
    { pos: [0, -145, -235], look: [0, -150, -250] }, // 4: Project Lab (Stop)
    { pos: [0, -215, -365], look: [0, -220, -380] }, // 5: Technology Matrix (Stop)
    { pos: [0, -295, -535], look: [0, -300, -550] }, // 6: Communication Hub (Stop)
  ];

  useFrame((state, delta) => {
    if (!started) {
      // Resting phase before user enters
      targetPos.current.set(0, 5, 25);
      targetLookAt.current.set(0, 5, 0);
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // Current scroll position 0 to 1
    
    // Segment the scroll into discrete chunks for the 6 waypoints
    const totalWaypoints = waypoints.length - 1;
    const scaledOffset = offset * totalWaypoints;
    const index = Math.min(Math.floor(scaledOffset), totalWaypoints - 1);
    const weight = scaledOffset - index;

    // Interpolate between current waypoint and next waypoint
    const start = waypoints[index];
    const end = waypoints[index + 1];

    targetPos.current.set(
      THREE.MathUtils.lerp(start.pos[0], end.pos[0], weight),
      THREE.MathUtils.lerp(start.pos[1], end.pos[1], weight),
      THREE.MathUtils.lerp(start.pos[2], end.pos[2], weight)
    );

    targetLookAt.current.set(
      THREE.MathUtils.lerp(start.look[0], end.look[0], weight),
      THREE.MathUtils.lerp(start.look[1], end.look[1], weight),
      THREE.MathUtils.lerp(start.look[2], end.look[2], weight)
    );

    // Apply smoothing to the camera position
    state.camera.position.lerp(targetPos.current, 0.08);

    // Smoothing the lookAt point
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    
    const smoothedLookAt = currentLookAt.lerp(targetLookAt.current, 0.08);
    state.camera.lookAt(smoothedLookAt);
  });

  return null;
};

export default CameraRig;
