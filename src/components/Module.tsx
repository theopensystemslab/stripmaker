import React, { useRef, useState } from "react";
import * as THREE from "three";

import lineMaterial from "../materials/lineMaterial";
import placeholderMaterial from "../materials/placeholderMaterial";
import plywoodMaterial from "../materials/plywoodMaterial";

function Module({ position, temp }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)

  const points = [
    [0, 0],
    [0, 3],
    [2.85, 4.85],
    [5.7, 3],
    [5.7, 0]
  ];

  const [start, ...rest] = points.map(([x, y]) => [x - 2.85, y]);

  const shape = new THREE.Shape();
  shape.moveTo(...(start as [number, number]));
  rest.forEach((path: [number, number]) => shape.lineTo(...path));

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth: 1.2
  });

  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <group position={position}>
      <group
        position={
          hovered ? new THREE.Vector3(0, 0.3, 0) : new THREE.Vector3(0, 0, 0)
        }
      >
        <mesh
          ref={mesh}
          material={temp ? placeholderMaterial : plywoodMaterial}
          geometry={geometry}
        />

        <lineSegments material={lineMaterial} geometry={edges} />
      </group>
    </group>
  );
}

export default Module;
