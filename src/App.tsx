import "./app.css";

import { OrbitControls } from "drei";
import React from "react";
import { Canvas, useThree } from "react-three-fiber";
import * as THREE from "three";

import ClippingSlider from "./components/ClippingSlider";
import Module from "./components/Module";

const Building = () => {
  const { gl } = useThree();
  gl.localClippingEnabled = true;

  const grid = {
    "0,-4": {
      type: "D1",
      variation: "03"
    },
    "0,-3": {
      type: "C2",
      variation: "03"
    },
    "0,-2": {
      type: "C2",
      variation: "03"
    },
    "0,-1": {
      type: "C2",
      variation: "01"
    },
    "0,0": {
      type: "C2",
      variation: "01"
    },
    "0,1": {
      type: "C2",
      variation: "02"
    },
    "0,2": {
      type: "D1",
      variation: "02"
    }
  };

  return (
    <>
      {Object.entries(grid).map(([k, v]) => (
        <Module key={k} pos={k} {...v} />
      ))}
    </>
  );
};

function App() {
  return (
    <div id="three">
      <ClippingSlider />
      <Canvas
        camera={{ fov: 45, position: [8, 12, 14] }}
        shadowMap={{ enabled: true, type: THREE.PCFSoftShadowMap }}
        gl={{ antialias: true }}
        pixelRatio={window.devicePixelRatio}
      >
        <ambientLight intensity={0.85} />
        <pointLight
          position={[40, 90, 45]}
          castShadow
          intensity={0.1}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          shadowBias={-0.0004}
        />
        <Building />
        {/* <Ground /> */}
        <mesh name="ground" rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[30, 30, 1, 1]} />
          <shadowMaterial
            attach="material"
            color={0}
            opacity={0.2}
            side={THREE.DoubleSide}
          />
          {/* <meshBasicMaterial color="red" side={THREE.DoubleSide} attach="material" /> */}
        </mesh>
        <OrbitControls
          target={[0, 3, 0]}
          // enableDamping
          // dampingFactor={0.2}
          rotateSpeed={0.7}
          maxPolarAngle={1.49}
          enabled
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}

export default App;
