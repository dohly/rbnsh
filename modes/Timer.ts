import { EventStream } from "../SimpleEventStream";
import { Phrazes } from "../voice/Phrazes";
import { sayNumber, sayPhraze, sayUnit } from "../voice/Say";
import { Units } from "../voice/Units";

export const Timer = new EventStream<string>();
let seconds = 0;
let minutes = 0;
let t_interval;
let started = false;

const tick = (increment: number) => {
  seconds += increment;
  if (seconds > 59) {
    seconds = 0;
    minutes++;
    let p: Promise<void>;
    if (minutes == 1) {
      p = sayUnit(Units.Minuta);
    } else if (minutes < 5) {
      p = sayNumber(minutes).then(() => sayUnit(Units.Minuti));
    } else {
      p = sayNumber(minutes).then(() => sayUnit(Units.Minut));
    }
    p.then(() => sayPhraze(Phrazes.BeFaster));
  } else if (seconds < 0) {
    seconds = 59;
    minutes--;
  }
  Timer.publish(toString());
};
const toString = () => {
  const leadingZero = (v) => (v > 9 ? `${v}` : `0${v}`);
  return `${leadingZero(minutes)}:${leadingZero(seconds)}`;
};

export const startUp = () =>
  new Promise<void>((resolve, reject) => {
    if (!t_interval) {
      started = false;
      t_interval = setInterval(() => {
        tick(1);
        if (!started) {
          started = true;
          resolve();
        }
      }, 1000);
    }
  });

export const pause = () => {
  if (t_interval) {
    clearInterval(t_interval);
    t_interval = null;
  } else {
    startUp();
  }
};

export const stop = () => {
  clearInterval(t_interval);
  t_interval = null;
  seconds = 0;
  minutes = 0;
};
