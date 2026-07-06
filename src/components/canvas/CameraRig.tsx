'use client';

import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * WAYPOINTS
 * Each stop is precisely aligned on the Z-axis.
 * Y is locked at 5 for eye-level viewing.
 */
const WAYPOINTS = [
  { pos: [0, 5, 10], look: [0, 5, 0] },      // 0: Start (Outside)
  { pos: [0, 5, -2], look: [0, 5, -10] },    // 1: Entrance Interior
  { pos: [0, 5, -25], look: [0, 5, -25] },   // 2: Identity Chamber Center
  { pos: [0, 5, -55], look: [0, 5, -55] },   // 3: Experience Vault Start
  { pos: [0, 5, -70], look: [0, 5, -70] },   // 4: Experience Vault Middle
  { pos: [0, 5, -85], look: [0, 5, -85] },   // 5: Project Lab Center
  { pos: [0, 5, -105], look: [0, 5, -105] }, // 6: Transition Matrix
  { pos: [0, 5, -125], look: [0, 5, -125] }, // 7: Communication Hub
];

export default function CameraRig({ started }: { started: boolean }) {
  const scroll = useScroll();
  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!started) return;

    const offset = scroll.offset; // 0 to 1
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

      // Lock Y strictly to avoid drifting upwards/downwards
      targetPos.y = 5;
      targetLook.y = 5;

      state.camera.position.lerp(targetPos, delta * 3);
      state.camera.lookAt(targetLook);
    }
  });

  return null;
}
