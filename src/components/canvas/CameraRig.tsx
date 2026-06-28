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
  const targetLookAt = useRef(new THREE.Vector3(0, 4, 0));

  // Waypoints are mapped to precise Z positions for each section hub.
  const waypoints = [
    { pos: [0, 5, 25], look: [0, 4, 0] },          // 0: Entrance Exterior
    { pos: [0, 5, -15], look: [0, 4, -50] },       // 1: Inside Entrance
    { pos: [0, 4, -72], look: [0, 4, -85] },       // 2: Identity Chamber Hub
    { pos: [0, 4, -165], look: [0, 4, -185] },     // 3: Experience Vault Card 1
    { pos: [0, 4, -205], look: [0, 4, -225] },     // 4: Experience Vault Card 2
    { pos: [0, 5, -310], look: [0, 5, -330] },     // 5: Project Lab
    { pos: [0, 6, -470], look: [0, 6, -490] },     // 6: Technology Matrix
    { pos: [0, 5, -640], look: [0, 5, -660] },     // 7: Communication Hub
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

    // Smoothstep for tactile snapping into each room
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

    // Precise lerping for a high-end cinematic feel
    state.camera.position.lerp(targetPos.current, 0.1);
    
    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    currentLook.add(state.camera.position);
    const smoothedLook = currentLook.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(smoothedLook);
  });

  return null;
};

export default CameraRig;