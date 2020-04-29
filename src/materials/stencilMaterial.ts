import * as THREE from "three";

const stencilMaterial = new THREE.MeshStandardMaterial({
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

export default stencilMaterial;
