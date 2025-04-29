import { atom, selector } from "recoil";

export const counterAtom = atom({
  default: 0,
  key: "counter",
});

export const even = selector({
  key: "even",
  get: ({ get }) => {
    const count = get(counterAtom);
    return count % 2 == 0;
  },
});
