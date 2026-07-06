'use client';

import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const WAYPOINTS = [
  { pos: [0, 5, 10], look: [0, 5, 0] },     // Start
  { pos: [0, 5, -10], look: [0, 5, -20] },   // Entrance Transition
  { pos: [0, 5, -25], look: [0, 5, -25] },   // Identity Chamber Center
  { pos: [0, 5, -45], look: [0, 5, -50] },   // Vault Corridor 1
  { pos: [0, 5, -65], look: [0, 5, -70] },   // Vault Corridor 2
  { pos: [0, 5, -85], look: [0, 5, -85] },   // Project Lab Center
  { pos: [0, 5, -105], look: [0, 5, -110] }, // Matrix Descent
  { pos: [0, 5, -125], look: [0, 5, -125] }, // Communication Hub
];

export default function CameraRig({ started }: { started: boolean }) {
  const scroll = useScroll();
  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!started) return;

    const offset = scroll.offset;
    const segment = offset * (WAYPOINTS.length - 1);
    const index = Math.floor(segment);
    const weight = segment - index;

    if (index < WAYPOINTS.length - 1) {
      const p1 = WAYPOINTS[index];
      const p2 = WAYPOINTS[index + 1];

      // Smooth step easing for waypoint transitions
      const t = THREE.MathUtils.smoothstep(weight, 0, 1);

      targetPos.lerpVectors(
        new THREE.Vector3(...p1.pos),
        new THREE.Vector3(...p2.pos),
        t
      );

      targetLook.lerpVectors(
        new THREE.Vector3(...p1.look),
        new THREE.Vector3(...p2.look),
        t
      );

      state.camera.position.lerp(targetPos, delta * 2);
      state.camera.lookAt(targetLook);
    }
  });

  return null;
}
