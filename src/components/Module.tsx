import React, { useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import plywoodMaterial, { fill } from "../materials/plywoodMaterial";
import zincMaterial from "../materials/zincMaterial";

const types = ["A2", "B2", "C2", "D1", "E1", "A1", "B1", "C1"];

const variations = ["04", "03", "02", "01", "05", "06", "07"];

const Module = ({ pos, type, variation }) => {
  const [obj, set] = useState();

  const [x, z] = pos.split(",").map(Number);

  const url = "models/Toolbox_Stripmaker_WHAlm_v1.5_kaal-SU18.obj";

  useMemo(() => {
    console.log("loading model");
    new OBJLoader().load(url, set);
  }, [url]);

  if (obj) {
    const children = obj.children.filter(
      c => c.name.includes(`Module_${type}_${variation}`) && c.type === "Mesh"
    );

    return (
      <group
        position={[x * 1.2, 0, z * 1.2]}
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
          {children.map((child, i) => {
            const isWood = child.material.name.includes("Wood");
            const isMetal = !isWood && (type !== "C2" ? i < 2 : i > 2);

            // const plane = clipPlanes[0]
            // const stencilGroup = createPlaneStencilGroup(child.geometry, plane, i + 1);
            // const po = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20), stencilMaterial)

            // po.onAfterRender = function (renderer) {
            //   renderer.clearStencil();
            // }
            // po.renderOrder = i + 1.1

            // plane.coplanarPoint(po.position);

            // po.lookAt(
            //   po.position.x - plane.normal.x,
            //   po.position.y - plane.normal.y,
            //   po.position.z - plane.normal.z
            // );

            return (
              <React.Fragment key={child.name}>
                {/* <primitive object={stencilGroup} /> */}

                <mesh
                  geometry={child.geometry}
                  material={
                    isWood ? plywoodMaterial : isMetal ? zincMaterial : fill
                  }
                  receiveShadow={!isWood}
                  castShadow={!isWood}
                  // renderOrder={3}
                />

                {/* <primitive object={po} /> */}
              </React.Fragment>
            );
          })}
        </group>
      </group>
    );
  }
  return null;
};

export default Module;
