import produce from "immer";
import create from "zustand";

export const [useStore, api] = create(set => ({
  nested: { structure: { contains: { a: "value" } } },
  set: fn => set(produce(fn)),
  grid: {
    "0,0,-3": "",
    "0,0,-2": "",
    "0,0,-1": "a2_01",
    "0,0,0": "a2_01",
    "0,0,1": "a2_01",
    "0,0,2": "a2_01",
    "0,0,3": "a2_01",
    "0,0,4": "d1_01",
    "0,0,5": "e1_03"
  }
}));
