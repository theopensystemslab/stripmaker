import React from "react";
import { useThree } from "react-three-fiber";
import * as THREE from "three";

import OldModule from "../components/OldModule";
import createPlaneStencilGroup from "../lib/createPlaneStencilGroup";
import extractGridPosition from "../lib/extractGridPosition";
import { useStore } from "../lib/store";
import stencilMaterial from "../materials/stencilMaterial";

export const Stuff = () => {
  const grid = useStore(store => store.grid);
  return (
    <group>
      {Object.entries(grid).map(([k, v]) => (
        <OldModule key={k} id={v} position={extractGridPosition(k)} />
      ))}
    </group>
  );
};

const Things = () => {
  const { gl } = useThree();

  const planes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.5)];

  const planeGeom = new THREE.PlaneBufferGeometry(20, 20);
  const planeObjects = [];

  const object = new THREE.Group();
  const poGroup = new THREE.Group();

  const geometry = new THREE.TorusKnotBufferGeometry(2.8, 0.3, 220, 60);

  const stencilGroup = createPlaneStencilGroup(geometry, planes[0], 1);

  const po = new THREE.Mesh(planeGeom, stencilMaterial);

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

export default Things;
