
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

    // 6 Distinct Zones with dedicated framing
    if (offset < 0.16) {
      // 01: Entrance
      const p = offset / 0.16;
      targetPos.current.set(0, 5, 22 - p * 20);
      targetLookAt.current.set(0, 4, -50);
    } else if (offset < 0.32) {
      // 02: Identity Chamber (Bio/Skills)
      const p = (offset - 0.16) / 0.16;
      targetPos.current.set(0, -20 + 4, -22 - p * 12);
      targetLookAt.current.set(0, -20, -40);
    } else if (offset < 0.48) {
      // 03: Experience Vault (Career Cards)
      const p = (offset - 0.32) / 0.16;
      targetPos.current.set(0, -45 + 5, -75 - p * 30);
      targetLookAt.current.set(0, -45, -110);
    } else if (offset < 0.64) {
      // 04: Project Lab (Interactive Cubes)
      const p = (offset - 0.48) / 0.16;
      targetPos.current.set(0, -80 + 15, -130 - p * 30);
      targetLookAt.current.set(0, -80, -170);
    } else if (offset < 0.82) {
      // 05: Tech Matrix (Orbiting Core)
      const p = (offset - 0.64) / 0.18;
      targetPos.current.set(0, -120 + 12, -190 - p * 40);
      targetLookAt.current.set(0, -120, -240);
    } else {
      // 06: Rooftop Hub (Contact Form)
      const p = (offset - 0.82) / 0.18;
      targetPos.current.set(0, -160 + 8, -270 - p * 20);
      targetLookAt.current.set(0, -160, -320);
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
