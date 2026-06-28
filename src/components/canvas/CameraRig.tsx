
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
  const targetPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // If not started, keep the camera static at the entrance view
    if (!started) {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 12), delta * 2);
      state.camera.lookAt(0, 1, 0);
      return;
    }

    const offset = scroll.offset; // 0 to 1

    // Path Logic
    if (offset < 0.1) {
      // Move through the entrance
      const p = offset / 0.1;
      targetPos.current.set(0, 0, 12 - p * 15);
      targetLookAt.current.set(0, 1, -5);
    } else if (offset < 0.3) {
      // Descend into the Identity Chamber
      const p = (offset - 0.1) / 0.2;
      targetPos.current.set(0, -20 * p, -3 - p * 17);
      targetLookAt.current.set(0, -20 * p, -3 - p * 20);
    } else if (offset < 0.5) {
      // Transition to Experience Vault
      const p = (offset - 0.3) / 0.2;
      targetPos.current.set(0, -20 - 20 * p, -20 - 40 * p);
      targetLookAt.current.set(0, -40, -60);
    } else if (offset < 0.7) {
      // Move to Project Lab (Offset to the right)
      const p = (offset - 0.5) / 0.2;
      targetPos.current.set(40 * p, -40 - 20 * p, -60 - 20 * p);
      targetLookAt.current.set(40, -60, -80);
    } else if (offset < 0.9) {
      // Technology Matrix
      const p = (offset - 0.7) / 0.2;
      targetPos.current.set(40 * (1 - p), -60 - 20 * p, -80 - 40 * p);
      targetLookAt.current.set(0, -80, -120);
    } else {
      // Final descent to Rooftop Hub
      const p = (offset - 0.9) / 0.1;
      targetPos.current.set(0, -80 - 20 * p, -120 - 40 * p);
      targetLookAt.current.set(0, -100, -160);
    }

    state.camera.position.lerp(targetPos.current, 0.05);
    
    // Smoothly update lookAt target
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    const targetDirection = targetLookAt.current.clone().sub(state.camera.position).normalize();
    
    // Instead of immediate lookAt, we lerp the direction slightly if needed, 
    // but standard lookAt works better with lerped target points
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

export default CameraRig;
