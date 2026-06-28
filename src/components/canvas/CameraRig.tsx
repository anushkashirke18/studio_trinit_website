'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface CameraRigProps {
  started: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({ started }) => {
  const scroll = useScroll();
  const targetPos = useRef(new THREE.Vector3(0, 5, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 5, 0));

  // Waypoints are strictly horizontal now (Y is ALWAYS 5.0)
  // We navigate exclusively through the Z depth of the facility.
  const waypoints = [
    { pos: [0, 5, 25], look: [0, 5, 0] },          // 0: Entrance Exterior
    { pos: [0, 5, -15], look: [0, 5, -50] },       // 1: Inside Entrance
    { pos: [0, 5, -80], look: [0, 5, -95] },       // 2: Identity Chamber (STOP)
    { pos: [0, 5, -130], look: [0, 5, -150] },     // 3: Corridor to Vault
    { pos: [0, 5, -200], look: [0, 5, -220] },     // 4: Experience Vault Card 1
    { pos: [0, 5, -240], look: [0, 5, -260] },     // 5: Experience Vault Card 2
    { pos: [0, 5, -320], look: [0, 5, -340] },     // 6: Project Lab Hub
    { pos: [0, 5, -480], look: [0, 5, -500] },     // 7: Technology Matrix
    { pos: [0, 5, -650], look: [0, 5, -670] },     // 8: Communication Hub
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

    // Use smoothstep for clear "snapping" into each waypoint
    const easedWeight = THREE.MathUtils.smoothstep(weight, 0, 1);

    const start = waypoints[index];
    const end = waypoints[index + 1];

    // Interpolate Position - HARD LOCK Y AT 5.0
    targetPos.current.set(
      THREE.MathUtils.lerp(start.pos[0], end.pos[0], easedWeight),
      5.0,
      THREE.MathUtils.lerp(start.pos[2], end.pos[2], easedWeight)
    );

    // Interpolate LookAt - HARD LOCK Y AT 5.0
    targetLookAt.current.set(
      THREE.MathUtils.lerp(start.look[0], end.look[0], easedWeight),
      5.0,
      THREE.MathUtils.lerp(start.look[2], end.look[2], easedWeight)
    );

    // Final smooth lerp for the camera
    state.camera.position.lerp(targetPos.current, 0.1);
    
    // We stabilize the lookAt by lerping a target point instead of raw camera.lookAt
    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    currentLook.add(state.camera.position);
    const smoothedLook = currentLook.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(smoothedLook);
  });

  return null;
};

export default CameraRig;