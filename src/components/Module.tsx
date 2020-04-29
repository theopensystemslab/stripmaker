import React, { useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const types = ["A2", "B2", "C2", "D1", "E1", "A1", "B1", "C1"];

const variations = ["04", "03", "02", "01", "05", "06", "07"];

const Module = ({ type, variation }) => {
  const [obj, set] = useState();
  const url = "/models/Toolbox_Stripmaker_WHAlm_v1.5_kaal-SU18.obj";
  useMemo(() => {
    console.log("loading model");
    new OBJLoader().load(url, set);
  }, [url]);

  if (obj) {
    const children = obj.children.filter(c =>
      c.name.includes(`Module_${type}_${variation}`)
    );
    return (
      <group
        onClick={e => {
          e.stopPropagation();
          console.log(e.object);
        }}
      >
        <group
          position={[
            types.findIndex(t => t === type) * -10 - 3,
            0,
            variations.findIndex(v => v === variation) * 10.8 + 0.6
          ]}
        >
          {children.map(child => (
            <primitive key={child.name} object={child} />
          ))}
        </group>
      </group>
    );
  }
  return null;
};

export default Module;
