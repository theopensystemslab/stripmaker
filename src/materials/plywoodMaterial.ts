import * as THREE from "three";

const tl = new THREE.TextureLoader();

const rpt = function(texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(2, 2);
  // texture.mapping = THREE.CubeUVReflectionMapping;
};

const plywoodMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
  map: tl.load(
    "46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DIFFUSE.jpg",
    rpt
  ),
  displacementMap: tl.load(
    "46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_DISPL.jpg",
    rpt
  ),
  normalMap: tl.load(
    "46_plywood texture-seamless_hr/46_plywood texture-seamless_hr_NORM.jpg",
    rpt
  ),
  aoMap: tl.load(
    "46_plywood texture-seamless_hr/46_plywood texture-seamless_hr-AO.jpg",
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
  side: THREE.DoubleSide,
  polygonOffset: true,
  polygonOffsetFactor: 1
});

export default plywoodMaterial;
