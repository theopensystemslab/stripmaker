import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import anime from "animejs/lib/anime.es.js";
import React, { useState } from "react";
import * as THREE from "three";

const useStyles = makeStyles({
  root: {
    height: 300
  }
});

const marks = [
  {
    value: 8,
    label: "Roof"
  },
  {
    value: 4,
    label: "First Floor"
  },
  {
    value: 1,
    label: "Ground Floor"
  }
];

export const clipPlanes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 8)];

const ClippingSlider = () => {
  const [val, setVal] = useState(8);

  return (
    <div id="clipping-slider">
      <Slider
        orientation="vertical"
        value={val}
        aria-labelledby="vertical-slider"
        marks={marks}
        max={8}
        min={1}
        step={1}
        onChange={(e, v: number) => {
          if (v !== val) {
            const duration = Math.abs(val - v) * 300;
            anime({
              duration,
              constant: v,
              targets: clipPlanes[0],
              easing: "easeOutElastic(1,0.9)"
            });

            setVal(v);
          }
        }}
      />
    </div>
  );
};

export default ClippingSlider;
