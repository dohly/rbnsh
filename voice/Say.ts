import { Mp3 } from "../Hardware";
import { Phrazes } from "./Phrazes";
import { Units } from "./Units";

enum Folders {
  smallNumbers = 1,
  phrazes = 2,
  units = 3,
  tens = 10,
  hundreds = 99,
}

const sayTripleDigits = (arr: number[]) => {
  const [d100, d10, d1] = arr;
  const done = Promise.resolve();
  const p100 = d100 ? Mp3.play(Folders.hundreds, d100) : done;
  return p100
    .then(() => (d10 ? Mp3.play(Folders.tens, d10 * 10) : done))
    .then(() => (d1 ? Mp3.play(Folders.smallNumbers, d1) : done));
};

const numberScenario = (n: number) => {
  const level = (x: number) => {
    const extracted = n - (n % x);
    n = n - extracted;
    return extracted / x;
  };
  let m100 = level(1e8);
  let m10 = level(1e7);
  let m1 = level(1e6);
  let t100 = level(1e5);
  let t10 = level(1e4);
  let t1 = level(1e3);
  let d100 = level(1e2);
  let d10 = level(1e1);
  let d1 = level(1);
  return {
    millions: [m100, m10, m1],
    thousands: [t100, t10, t1],
    digits: [d100, d10, d1],
  };
};

export const sayNumber = (n: number) => {
  const s = numberScenario(n);
  return sayTripleDigits(s.digits);
};

export const sayPhraze = (p: Phrazes) => Mp3.play(Folders.phrazes, p);
export const sayUnit = (u: Units) => Mp3.play(Folders.units, u);
