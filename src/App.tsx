import "./app.css";

import { OrbitControls } from "drei";
import React from "react";
import { Canvas, useThree } from "react-three-fiber";
import * as THREE from "three";

import Module from "./components/Module";
import createPlaneStencilGroup from "./lib/createPlaneStencilGroup";
import extractGridPosition from "./lib/extractGridPosition";
import { useStore } from "./lib/store";

const Stuff = () => {
  const grid = useStore(store => store.grid);
  return (
    <group>
      {Object.entries(grid).map(([k, v]) => (
        <Module key={k} temp={v === "temp"} position={extractGridPosition(k)} />
      ))}
    </group>
  );
};

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
      <primitive object={object} />
      <primitive object={poGroup} />
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
