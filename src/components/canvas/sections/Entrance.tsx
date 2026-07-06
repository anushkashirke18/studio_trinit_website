'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Entrance({ started, position }: { started: boolean, position: [number, number, number] }) {
  const leftDoor = useRef<THREE.Group>(null);
  const rightDoor = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (started && leftDoor.current && rightDoor.current) {
      leftDoor.current.position.x = THREE.MathUtils.lerp(leftDoor.current.position.x, -4, delta * 2);
      rightDoor.current.position.x = THREE.MathUtils.lerp(rightDoor.current.position.x, 4, delta * 2);
    }
  });

  return (
    <group position={position}>
      {/* Main Archway */}
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[10, 10, 2]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Hydraulic Doors */}
      <group ref={leftDoor} position={[-2, 5, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[4, 9, 0.5]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.8, 0, 0.3]}>
          <boxGeometry args={[0.2, 2, 0.1]} />
          <meshBasicMaterial color="#4488ff" />
        </mesh>
      </group>

      <group ref={rightDoor} position={[2, 5, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[4, 9, 0.5]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-1.8, 0, 0.3]}>
          <boxGeometry args={[0.2, 2, 0.1]} />
          <meshBasicMaterial color="#4488ff" />
        </mesh>
      </group>

      {/* Floor Detail */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 5]} receiveShadow>
        <planeGeometry args={[10, 20]} />
        <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}
