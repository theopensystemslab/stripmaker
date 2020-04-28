import { OrbitControls } from 'drei'
import React, { useRef, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from "three"
import "./app.css"
import { useStore } from './lib/store'
import lineMaterial from './materials/lineMaterial'
import placeholderMaterial from './materials/placeholderMaterial'
import plywoodMaterial from './materials/plywoodMaterial'

function Module({ position, temp }) {
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

  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <group
      position={position}
    // onClick={e => {
    //   e.stopPropagation()
    //   // setActive(!active)
    // }}

    // scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}

    >
      <group
        position={hovered ? new THREE.Vector3(0, 0.3, 0) : new THREE.Vector3(0, 0, 0)}
      // onPointerOver={e => {
      //   e.stopPropagation();
      //   setHover(true)
      //   geometry.computeBoundingBox()
      // }}
      // onPointerOut={e => {
      //   e.stopPropagation();
      //   setHover(false)
      //   geometry.computeBoundingBox()
      // }}
      >
        <mesh
          ref={mesh}
          material={temp ? placeholderMaterial : plywoodMaterial}
          geometry={geometry}
        >
          {/* <meshBasicMaterial color="white" attach="material" /> */}
          {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
          {/* <meshStandardMaterial attach= color={hovered ? 'hotpink' : 'orange'} /> */}
        </mesh>

        <lineSegments material={lineMaterial} geometry={edges} />
      </group>
    </group>
  )
}

const extract = (key: string): number[] => key.split(",").map(x => Number(x) * 1.2)

const Stuff = () => {
  const grid = useStore(store => store.grid)
  return <>{Object.entries(grid).map(([k, v]) => <Module key={k} temp={v === "temp"} position={extract(k)} />)}</>
}

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [-10, 10, -10] }} >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <Stuff />
      <OrbitControls target={[0, 0.5, 0]} />
    </ Canvas>
  );
}

export default App;
