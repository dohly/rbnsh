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

const sayTripleDigits = (arr: number[], female: boolean) => {
  const [d100, d10, d1] = arr;
  const done = Promise.resolve();
  const p100 = d100 ? Mp3.play(Folders.hundreds, d100) : done;
  
  return p100.then(() => {
    const digit = female && d1 < 3 ? d1 + 100 : d1;
    const sayDigit = () => (d1 ? Mp3.play(Folders.smallNumbers, digit) : done);
    if (d10 > 1) {
      return Mp3.play(Folders.tens, d10 * 10).then(sayDigit);
    } else if (d10 == 1) {
      return Mp3.play(Folders.smallNumbers, d10 * 10 + d1);
    } else {
      return sayDigit();
    }
  });
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

export const sayNumber = (n: number, female?: boolean) => {
  const s = numberScenario(n);
  return sayTripleDigits(s.digits, female);
};

export const sayPhraze = (p: Phrazes) => Mp3.play(Folders.phrazes, p);
export const sayUnit = (u: Units) => Mp3.play(Folders.units, u);
