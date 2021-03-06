import * as THREE from "three";

import { clipPlanes } from "../components/ClippingSlider";

export const fill = new THREE.MeshLambertMaterial({
  color: "white",
  // flatShading: true,
  clippingPlanes: clipPlanes,
  clipIntersection: true,
  clipShadows: true
  // side: THREE.DoubleSide,
  // shadowSide: THREE.DoubleSide
});

const tl = new THREE.TextureLoader();

const rpt = function(texture: THREE.Texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.025, 0.025);
};

const plywoodMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
  map: tl.load(
    "materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DIFFUSE.jpg",
    rpt
  ),
  displacementMap: tl.load(
    "materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DISPL.jpg",
    rpt
  ),
  normalMap: tl.load(
    "materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_NORM.jpg",
    rpt
  ),
  aoMap: tl.load(
    "materials/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr-AO.jpg",
    rpt
  ),
  // side: THREE.DoubleSide
  // specularMap: tl.load('/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_SPEC.jpg', rpt),
  // shininess: 0,
  // normalScale: 1.0,

  // ambientIntensity: 0.3,
  aoMapIntensity: 3.0,
  envMapIntensity: 1.5,
  // https://discourse.threejs.org/t/material-displacement-map-makes-the-texture-unwrap-the-models-surfaces/5119/11
  displacementScale: 0,
  roughness: 0.8,
  metalness: 0,
  // side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: 1,

  // flatShading: true,
  clippingPlanes: clipPlanes,
  clipIntersection: true,
  // shadowSide: THREE.DoubleSide,
  side: THREE.FrontSide
  // clipShadows: true
});

export default plywoodMaterial;
