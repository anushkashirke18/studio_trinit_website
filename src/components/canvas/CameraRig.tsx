
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
  const targetPos = useRef(new THREE.Vector3(0, 5, 18));
  const targetLookAt = useRef(new THREE.Vector3(0, 5, 0));

  useFrame((state, delta) => {
    if (!started) {
      targetPos.current.set(0, 5, 22);
      targetLookAt.current.set(0, 5, 0);
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // 0 to 1

    // Refined Pathing: Camera now stops and frames UI panels correctly
    if (offset < 0.15) {
      // Entrance
      const p = offset / 0.15;
      targetPos.current.set(0, 5, 22 - p * 25);
      targetLookAt.current.set(0, 4, -50);
    } else if (offset < 0.3) {
      // Identity Chamber Framing
      const p = (offset - 0.15) / 0.15;
      targetPos.current.set(0, -20 + p * 2, -25 - p * 10);
      targetLookAt.current.set(0, -20, -30);
    } else if (offset < 0.5) {
      // Experience Vault Framing
      const p = (offset - 0.3) / 0.2;
      targetPos.current.set(0, -45 + 5, -70 - p * 30);
      targetLookAt.current.set(0, -45, -110);
    } else if (offset < 0.7) {
      // Project Lab Framing
      const p = (offset - 0.5) / 0.2;
      targetPos.current.set(40, -80 + 8, -120 - p * 20);
      targetLookAt.current.set(40, -80, -150);
    } else if (offset < 0.9) {
      // Technology Matrix Framing
      const p = (offset - 0.7) / 0.2;
      targetPos.current.set(0, -120 + 10, -190 - p * 20);
      targetLookAt.current.set(0, -120, -230);
    } else {
      // Communication Hub (Rooftop) Framing
      const p = (offset - 0.9) / 0.1;
      targetPos.current.set(0, -160 + 5, -270 - p * 10);
      targetLookAt.current.set(0, -160, -310);
    }

    state.camera.position.lerp(targetPos.current, 0.1);
    
    // Smoothly lerp lookAt
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    
    const newLookAt = currentLookAt.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(newLookAt);
  });

  return null;
};

export default CameraRig;
