import { Motor } from "./Motorshield";
import { Encoder } from "./Encoder";

export type Wheel = (steps: number, constantSpeed?: number) => Promise<number>;

const STOP = 0;
const START_SPEED = 0.3;
const ACCELERATION = 0.01;

export const BuildWheel = (
  motor: Motor,
  encoder: Encoder,
  clockwiseForward: boolean
): Wheel => {
  let ticks = 0;
  let currentSpeed = START_SPEED;
  let direction: 1 | -1 = 1;
  let stopper: () => void = null;
  let totalTicks = 0;
  encoder(() => {
    if (ticks > 0) {
      ticks--;
      speedUp();
    } else {
      currentSpeed = START_SPEED;
      motor(STOP);
      if (stopper) {
        stopper();
      }
    }
  });
  const speedUp = () => {
    currentSpeed = Math.min(1, currentSpeed + ACCELERATION);
    motor(currentSpeed * direction);
  };
  let promise: Promise<number> = null;
  return (steps, constantSpeed?) => {
    if (clockwiseForward) {
      direction = steps > 0 ? 1 : -1;
    } else {
      direction = steps > 0 ? -1 : 1;
    }
    ticks = ticks + Math.abs(steps);
    totalTicks = totalTicks + steps;
    if (currentSpeed === START_SPEED) {
      currentSpeed = constantSpeed || START_SPEED;
      speedUp();
    }

    if (!promise) {
      promise = new Promise<number>((resolve, reject) => {
        stopper = () => {
          resolve(totalTicks);
          totalTicks = 0;
          promise = null;
          stopper = null;
        };
      });
    }
    return promise;
  };
};
