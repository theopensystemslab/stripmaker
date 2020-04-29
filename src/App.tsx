import "./app.css";

import { OrbitControls } from "drei";
import React from "react";
import { Canvas } from "react-three-fiber";

import Module from "./components/Module";

const Building = () => {
  return (
    <>
      <Module type="C2" variation="04" />
      <Module type="D1" variation="01" />
    </>
  );
};

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [-2, 10, 10] }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <axesHelper />
      <Building />
      <OrbitControls target={[0, 2, 0]} />
    </Canvas>
  );
}

export default App;
