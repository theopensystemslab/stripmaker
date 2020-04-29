import sample from "lodash/sample";
import React, { useRef, useState } from "react";
import * as THREE from "three";

import lineMaterial from "../materials/lineMaterial";
import placeholderMaterial from "../materials/placeholderMaterial";
import plywoodMaterial from "../materials/plywoodMaterial";

const pointsToShape = points => {
  const [start, ...rest] = points.map(([x, y]) => [x / 1000, y / 1000]);
  const shape = new THREE.Shape();
  shape.moveTo(...(start as [number, number]));
  rest.forEach((path: [number, number]) => shape.lineTo(...path));
  return shape;
};

const makeShape = ([points, holes = []]) => {
  const shape = pointsToShape(points);
  holes.forEach(hole => {
    shape.holes.push(pointsToShape(hole));
  });
  return shape;
};

const SHAPES = {
  a2_04: {
    geometry: [
      [
        [0, 0],
        [0, 6000],
        [2100, 8100],
        [2100, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [1600, 3064],
          [1600, 500]
        ],
        [
          [500, 3500],
          [500, 5793],
          [1600, 6893],
          [1600, 3500]
        ]
      ]
    ]
  },
  a2_03: {
    geometry: [
      [
        [0, 0],
        [0, 6000],
        [2850, 8850],
        [3300, 8400],
        [3300, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [2811, 3064],
          [2811, 500]
        ],
        [
          [500, 3500],
          [500, 5793],
          [2800, 8093],
          [2800, 3500]
        ]
      ]
    ]
  },
  a2_02: {
    geometry: [
      [
        [0, 0],
        [0, 6000],
        [2850, 8850],
        [4500, 7200],
        [4500, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [4000, 3064],
          [4000, 500]
        ],
        [
          [500, 3500],
          [500, 5793],
          [2850, 8143],
          [4000, 6993],
          [4000, 3500]
        ]
      ]
    ]
  },
  a2_01: {
    geometry: [
      [
        [0, 0],
        [0, 6000],
        [2850, 8850],
        [5700, 6000],
        [5700, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [5200, 3064],
          [5200, 500]
        ],
        [
          [500, 3500],
          [500, 5793],
          [2850, 8143],
          [5200, 5793],
          [5200, 3500]
        ]
      ]
    ]
  },
  d1_04: {
    geometry: [
      [
        [0, 0],
        [0, 4600],
        [500, 4600],
        [500, 3500],
        [1600, 3500],
        [1600, 4600],
        [2100, 4600],
        [2100, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [1600, 3064],
          [1600, 500]
        ]
      ]
    ]
  },
  d1_03: {
    geometry: [
      [
        [0, 0],
        [0, 4600],
        [500, 4600],
        [500, 3500],
        [2800, 3500],
        [2800, 4600],
        [3300, 4600],
        [3300, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [2800, 3064],
          [2800, 500]
        ]
      ]
    ]
  },
  d1_01: {
    geometry: [
      [
        [0, 0],
        [0, 4600],
        [500, 4600],
        [500, 3500],
        [5200, 3500],
        [5200, 4600],
        [5700, 4600],
        [5700, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [5200, 3064],
          [5200, 500]
        ]
      ]
    ]
  },
  e1_03: {
    geometry: [
      [
        [0, 0],
        [0, 3600],
        [500, 3600],
        [500, 3500],
        [2800, 3500],
        [2800, 3600],
        [3300, 3600],
        [3300, 0]
      ],
      [
        [
          [500, 500],
          [500, 3064],
          [2800, 3064],
          [2800, 500]
        ]
      ]
    ]
  }
};

function Module({ position, id }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)

  const key = id || sample(Object.keys(SHAPES));

  const shape = makeShape(SHAPES[key].geometry as any);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth: 1.2
  });

  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <group position={position}>
      <group
        position={
          hovered ? new THREE.Vector3(0, 0.3, 0) : new THREE.Vector3(0, 0, 0)
        }
      >
        <mesh
          ref={mesh}
          material={id ? plywoodMaterial : placeholderMaterial}
          geometry={geometry}
        />

        <lineSegments material={lineMaterial} geometry={edges} />
      </group>
    </group>
  );
}

export default Module;
