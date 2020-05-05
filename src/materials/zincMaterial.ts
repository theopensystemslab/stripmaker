import * as THREE from "three";

import { clipPlanes } from "../components/ClippingSlider";

const tl = new THREE.TextureLoader();

const rpt = function(texture: THREE.Texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.025, 0.025);
  texture.rotation = Math.PI / 2;
};

const zincMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
  map: tl.load(
    "materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_DIFF.jpg",
    rpt
  ),
  displacementMap: tl.load(
    "materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_DISPL.jpg",
    rpt
  ),
  normalMap: tl.load(
    "materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated_NORM.jpg",
    rpt
  ),
  aoMap: tl.load(
    "materials/16_steel zinc coated corrugated metal texture-seamless_hr/16_steel zinc coated-AO.jpg",
    rpt
  ),
  // side: THREE.DoubleSide
  // specularMap: tl.load('/46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_SPEC.jpg', rpt),
  // shininess: 0,
  // normalScale: 1.0,

  // ambientIntensity: 0.3,
  // aoMapIntensity: 3.0,
  // envMapIntensity: 10.5,
  // https://discourse.threejs.org/t/material-displacement-map-makes-the-texture-unwrap-the-models-surfaces/5119/11
  displacementScale: 0,
  // displacementBias: 1,
  roughness: 0.8,
  metalness: 0.4,
  // side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: 1,

  // flatShading: true,
  clippingPlanes: clipPlanes,
  clipIntersection: true,
  // shadowSide: THREE.DoubleSide,
  side: THREE.FrontSide,
  clipShadows: true
  // clipShadows: true
});

export default zincMaterial;
