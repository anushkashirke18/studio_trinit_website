
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

  useFrame((state) => {
    if (!started) return;

    const offset = scroll.offset; // 0 to 1

    // Simple spline path logic based on sections
    // Section 1: Entrance (0 to 0.1)
    // Section 2: Identity (0.1 to 0.3)
    // Section 3: Experience (0.3 to 0.5)
    // Section 4: Projects (0.5 to 0.7)
    // Section 5: Tech (0.7 to 0.9)
    // Section 6: Contact (0.9 to 1.0)

    if (offset < 0.1) {
      targetPos.current.set(0, 0, 10 - offset * 100);
      targetLookAt.current.set(0, 0, 0);
    } else if (offset < 0.3) {
      const p = (offset - 0.1) / 0.2;
      targetPos.current.set(0, -20 * p, -20 * p);
      targetLookAt.current.set(0, -20 * p, -20 * p - 10);
    } else if (offset < 0.5) {
      const p = (offset - 0.3) / 0.2;
      targetPos.current.set(0, -20 - 20 * p, -20 - 40 * p);
      targetLookAt.current.set(0, -40, -70);
    } else if (offset < 0.7) {
      const p = (offset - 0.5) / 0.2;
      targetPos.current.set(40 * p, -40 - 20 * p, -60 - 20 * p);
      targetLookAt.current.set(40, -60, -80);
    } else {
      const p = (offset - 0.7) / 0.3;
      targetPos.current.set(40 * (1-p), -60 - 40 * p, -80 - 80 * p);
      targetLookAt.current.set(0, -100, -160);
    }

    state.camera.position.lerp(targetPos.current, 0.05);
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

export default CameraRig;
