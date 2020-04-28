import { OrbitControls } from 'drei'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from "three"
import "./app.css"
import outlineMaterial from './materials/outlineMaterial'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)

  const points = [
    [0, 0],
    [0, 3],
    [2.85, 4.85],
    [5.7, 3],
    [5.7, 0],
  ];

  const [start, ...rest] = points.map(([x, y]) => ([x - 2.85, y]))

  const shape = new THREE.Shape();
  shape.moveTo(...(start as [number, number]));
  rest.forEach((path: [number, number]) => shape.lineTo(...path));

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth: 1.2
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      material={outlineMaterial}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={e => setActive(!active)}
      // onPointerOver={e => setHover(true)}
      // onPointerOut={e => setHover(false)}
      geometry={geometry}
    >
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
      {/* <meshStandardMaterial attach= color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [-10, 10, -10] }} >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <Suspense fallback={null}>
        <Box position={[0, 0, 0]} />
        {/* <Box position={[0, 0, -1.2]} /> */}
      </Suspense>
      <OrbitControls target={[0, 0.5, 0]} />
    </ Canvas>
  );
}

export default App;
