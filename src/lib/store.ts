import produce from "immer";
import create from 'zustand';

export const [useStore, api] = create(set => ({
  nested: { structure: { contains: { a: "value" } } },
  set: fn => set(produce(fn)),
  grid: {
    "0,0,-1": "",
    "0,0,0": "",
    "0,0,1": "",
    "0,0,2": "temp"
  }
}));
