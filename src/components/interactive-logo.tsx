
'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractiveLogo() {
  const ref = useRef<THREE.Mesh>(null!);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (ref.current) {
      const x = (mouse.x * viewport.width) / 2.5;
      const y = (mouse.y * viewport.height) / 2.5;
      ref.current.position.set(x, y, 0);
      ref.current.rotation.set(-y, x, 0);
    }
  });

  return (
    <Icosahedron ref={ref} args={[1.5, 0]}>
      <meshStandardMaterial color="hsl(var(--primary))" wireframe />
    </Icosahedron>
  );
}
