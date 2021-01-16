import { Motor, M1, M2 } from "./Motorshield";
import { Encoder, LeftEncoder, RightEncoder } from "./Encoder";

export type Wheel = (steps: number) => void;

const STOP = 0;
const START_SPEED = 0.25;
const ACCELERATION = 0.01;

const BuildWheel = (
  motor: Motor,
  encoder: Encoder,
  clockwiseForward: boolean
): Wheel => {
  let ticks = 0;
  let currentSpeed = START_SPEED;
  let direction: 1 | -1 = 1;
  encoder(() => {
    if (ticks > 0) {
      ticks--;
    } else {
      currentSpeed = START_SPEED;
      motor(STOP);
    }
  });
  const speedUp = () => {
    currentSpeed = Math.min(1, currentSpeed + ACCELERATION);
    motor(currentSpeed * direction);
  };
  return (steps) => {
    if (clockwiseForward) {
      direction = steps > 0 ? 1 : -1;
    } else {
      direction = steps > 0 ? -1 : 1;
    }
    ticks = ticks + Math.abs(steps);
    speedUp();
  };
};

export const LeftWheel = BuildWheel(M1, LeftEncoder, false);
export const RightWheel = BuildWheel(M2, RightEncoder, true);