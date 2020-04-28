import "./app.css";

import { OrbitControls } from "drei";
import React, { useRef, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import * as THREE from "three";

import { useStore } from "./lib/store";
import lineMaterial from "./materials/lineMaterial";
import placeholderMaterial from "./materials/placeholderMaterial";
import plywoodMaterial from "./materials/plywoodMaterial";

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
    <group
      position={position}
      // onClick={e => {
      //   e.stopPropagation()
      //   // setActive(!active)
      // }}

      // scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
    >
      <group
        position={
          hovered ? new THREE.Vector3(0, 0.3, 0) : new THREE.Vector3(0, 0, 0)
        }
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
        />

        <lineSegments material={lineMaterial} geometry={edges} />
      </group>
    </group>
  );
}

const extract = (key: string): number[] =>
  key.split(",").map(x => Number(x) * 1.2);

const Stuff = () => {
  const grid = useStore(store => store.grid);
  return (
    <group>
      {Object.entries(grid).map(([k, v]) => (
        <Module key={k} temp={v === "temp"} position={extract(k)} />
      ))}
    </group>
  );
};

function createPlaneStencilGroup(geometry, plane, renderOrder) {
  const group = new THREE.Group();
  const baseMat = new THREE.MeshBasicMaterial();
  baseMat.depthWrite = false;
  baseMat.depthTest = false;
  baseMat.colorWrite = false;
  baseMat.stencilWrite = true;
  baseMat.stencilFunc = THREE.AlwaysStencilFunc;

  // back faces
  const mat0 = baseMat.clone();
  mat0.side = THREE.BackSide;
  mat0.clippingPlanes = [plane];
  mat0.stencilFail = THREE.IncrementWrapStencilOp;
  mat0.stencilZFail = THREE.IncrementWrapStencilOp;
  mat0.stencilZPass = THREE.IncrementWrapStencilOp;

  const mesh0 = new THREE.Mesh(geometry, mat0);
  mesh0.renderOrder = renderOrder;
  group.add(mesh0);

  // front faces
  const mat1 = baseMat.clone();
  mat1.side = THREE.FrontSide;
  mat1.clippingPlanes = [plane];
  mat1.stencilFail = THREE.DecrementWrapStencilOp;
  mat1.stencilZFail = THREE.DecrementWrapStencilOp;
  mat1.stencilZPass = THREE.DecrementWrapStencilOp;

  const mesh1 = new THREE.Mesh(geometry, mat1);
  mesh1.renderOrder = renderOrder;

  group.add(mesh1);

  return group;
}

const Things = () => {
  const { gl } = useThree();

  const planes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)];

  const planeGeom = new THREE.PlaneBufferGeometry(4, 4);
  const planeObjects = [];

  const object = new THREE.Group();
  const poGroup = new THREE.Group();

  const geometry = new THREE.TorusKnotBufferGeometry(0.4, 0.15, 220, 60);

  const stencilGroup = createPlaneStencilGroup(geometry, planes[0], 1);

  const planeMat = new THREE.MeshStandardMaterial({
    clippingPlanes: [],
    color: 0x000000,
    metalness: 0,
    roughness: 1,
    stencilFail: THREE.ReplaceStencilOp,
    stencilFunc: THREE.NotEqualStencilFunc,
    stencilRef: 0,
    stencilWrite: true,
    stencilZFail: THREE.ReplaceStencilOp,
    stencilZPass: THREE.ReplaceStencilOp
  });

  const po = new THREE.Mesh(planeGeom, planeMat);
  po.onAfterRender = function(renderer) {
    renderer.clearStencil();
  };
  po.renderOrder = 1.1;

  object.add(stencilGroup);
  poGroup.add(po);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffc107,
    metalness: 0.1,
    roughness: 0.75,
    clippingPlanes: planes,
    clipShadows: true,
    shadowSide: THREE.DoubleSide
  });
  const clippedColorFront = new THREE.Mesh(geometry, material);
  clippedColorFront.renderOrder = 6;
  object.add(clippedColorFront);
  planeObjects.push(po);

  gl.localClippingEnabled = true;

  for (let i = 0; i < planeObjects.length; i += 1) {
    const plane = planes[i];
    const planeOb = planeObjects[i];
    plane.coplanarPoint(planeOb.position);
    planeOb.lookAt(
      planeOb.position.x - plane.normal.x,
      planeOb.position.y - plane.normal.y,
      planeOb.position.z - plane.normal.z
    );
  }

  return (
    <>
      {/* <planeHelper plane={planes[0]} size={20} /> */}
      <primitive object={object} />
      <primitive object={poGroup} />
      {/* <primitive object={ground} /> */}
    </>
  );
};

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [-10, 10, -10] }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <Things />
      <OrbitControls target={[0, 0.5, 0]} />
    </Canvas>
  );
}

export default App;
