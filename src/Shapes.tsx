import Shape from "clipper-js";
import React from "react";

const profiles = {
  A: [
    [0, 0],
    [0, 6000],
    [2850, 8850],
    [5700, 6000],
    [5700, 0]
  ],

  B: [
    [0, 0],
    [0, 6000],
    [1142.5, 8468],
    [5700, 6000],
    [5700, 0]
  ],

  C: [
    [0, 0],
    [0, 6000],
    [1142.5, 7465],
    [5700, 6000],
    [5700, 0]
  ]
};

const Profile = ({ type, color }) => {
  const points = profiles[type].map(([x, y]) => [x / 100, y / 100]);
  const [first, ...rest] = points;
  return <path d={`M ${first} L ${rest} Z`} stroke={color} fill="none" />;
};

const Profile2 = () => {
  const A = new Shape([profiles.A.map(([X, Y]) => ({ X, Y }))]);
  const C = new Shape([profiles.C.map(([X, Y]) => ({ X, Y }))]);
  const diff = A.difference(C);

  const points = diff.paths[0].map(({ X, Y }) => [X / 100, Y / 100]);
  const [first, ...rest] = points;
  return <path d={`M ${first} L ${rest} Z`} fill="red" />;
};

const Shapes = () => {
  return (
    <div id="two">
      <svg viewBox={`-1 -1 100 100`}>
        <Profile2 />
        <Profile type="A" color="red" />
        <Profile type="C" color="green" />
      </svg>
    </div>
  );
};

export default Shapes;
