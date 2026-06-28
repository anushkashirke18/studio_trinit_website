
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
      // Resting position looking at the vault
      targetPos.current.set(0, 5, 22);
      targetLookAt.current.set(0, 5, 0);
      
      state.camera.position.lerp(targetPos.current, delta * 2);
      state.camera.lookAt(targetLookAt.current);
      return;
    }

    const offset = scroll.offset; // 0 to 1

    // Detailed Spline-like navigation through the facility
    if (offset < 0.15) {
      // Approach and pass through vault
      const p = offset / 0.15;
      targetPos.current.set(0, 5, 22 - p * 35);
      targetLookAt.current.set(0, 4, -50);
    } else if (offset < 0.3) {
      // Descend into Identity Chamber
      const p = (offset - 0.15) / 0.15;
      targetPos.current.set(0, 5 - 25 * p, -13 - 17 * p);
      targetLookAt.current.set(0, -20, -30);
    } else if (offset < 0.5) {
      // Transition through Experience corridor
      const p = (offset - 0.3) / 0.2;
      targetPos.current.set(0, -20 - 25 * p, -30 - 50 * p);
      targetLookAt.current.set(0, -45, -80);
    } else if (offset < 0.7) {
      // Turn into Project Lab
      const p = (offset - 0.5) / 0.2;
      targetPos.current.set(40 * p, -45 - 35 * p, -80 - 50 * p);
      targetLookAt.current.set(40, -80, -130);
    } else if (offset < 0.9) {
      // Re-center for Technology Matrix
      const p = (offset - 0.7) / 0.2;
      targetPos.current.set(40 * (1 - p), -80 - 40 * p, -130 - 70 * p);
      targetLookAt.current.set(0, -120, -200);
    } else {
      // Final Descent to Rooftop Hub
      const p = (offset - 0.9) / 0.1;
      targetPos.current.set(0, -120 - 40 * p, -200 - 80 * p);
      targetLookAt.current.set(0, -160, -280);
    }

    state.camera.position.lerp(targetPos.current, 0.1);
    
    // Smoothly lerp lookAt to prevent jerky camera rotations
    const lookAtPos = new THREE.Vector3().copy(targetLookAt.current);
    state.camera.lookAt(lookAtPos);
  });

  return null;
};

export default CameraRig;
