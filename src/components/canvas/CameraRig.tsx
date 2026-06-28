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
  const targetPos = useRef(new THREE.Vector3(0, 5, 15));
  const targetLookAt = useRef(new THREE.Vector3(0, 2, 0));

  useFrame((state, delta) => {
    if (!started) {
      // Keep a stable, interesting view of the facility exterior
      targetPos.current.set(0, 2, 18);
      targetLookAt.current.set(0, 3, 0);
      
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // 0 to 1

    // Redefined Path with deeper coordinates for better spacing
    if (offset < 0.1) {
      // Approach and pass through vault
      const p = offset / 0.1;
      targetPos.current.set(0, 2, 18 - p * 25);
      targetLookAt.current.set(0, 2, -10);
    } else if (offset < 0.3) {
      // Descend into the Identity Chamber
      const p = (offset - 0.1) / 0.2;
      targetPos.current.set(0, -20 * p, -7 - p * 23);
      targetLookAt.current.set(0, -20 * p, -30);
    } else if (offset < 0.5) {
      // Transition to Experience Vault
      const p = (offset - 0.3) / 0.2;
      targetPos.current.set(0, -20 - 20 * p, -30 - 50 * p);
      targetLookAt.current.set(0, -40, -80);
    } else if (offset < 0.7) {
      // Project Lab
      const p = (offset - 0.5) / 0.2;
      targetPos.current.set(40 * p, -40 - 30 * p, -80 - 40 * p);
      targetLookAt.current.set(40, -70, -120);
    } else if (offset < 0.9) {
      // Technology Matrix
      const p = (offset - 0.7) / 0.2;
      targetPos.current.set(40 * (1 - p), -70 - 30 * p, -120 - 60 * p);
      targetLookAt.current.set(0, -100, -180);
    } else {
      // Rooftop Hub
      const p = (offset - 0.9) / 0.1;
      targetPos.current.set(0, -100 - 30 * p, -180 - 70 * p);
      targetLookAt.current.set(0, -130, -250);
    }

    state.camera.position.lerp(targetPos.current, 0.1);
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

export default CameraRig;