import { Motor } from "./Motorshield";
import { Encoder } from "./Encoder";

export type Wheel = (options: {
  direction: boolean;
  stopCondition: (ticks: number) => boolean;
  startSpeed?: number;
}) => Promise<number>;

const STOP = 0;
const START_SPEED = 0.3;
const ACCELERATION = 0.01;

export const BuildWheel = (
  motor: Motor,
  encoder: Encoder,
  clockwiseForward: boolean
): Wheel => {
  let currentSpeed = STOP;
  let step: 1 | -1 = 1;
  let onStopped: () => void = null;
  let shouldStop: (ticks: number) => boolean = null;
  let totalTicks = 0;
  encoder(() => {
    totalTicks = totalTicks + step;
    if (shouldStop && shouldStop(totalTicks)) {
      currentSpeed = STOP;
      motor(STOP);
      if (onStopped) {
        onStopped();
      }
    }
  });
  const speedUp = () => {
    currentSpeed = Math.min(1, currentSpeed * (1 + ACCELERATION));
    let direction = clockwiseForward ? 1 : -1;
    motor(currentSpeed * direction * step);
  };
  let promise: Promise<number> = null;
  return (options) => {
    step = options.direction ? 1 : -1;
    if (currentSpeed === STOP) {
      currentSpeed = options.startSpeed || START_SPEED;
    }
    shouldStop = options.stopCondition;
    speedUp();
    if (!promise) {
      promise = new Promise<number>((resolve, reject) => {
        onStopped = () => {
          resolve(totalTicks);
          totalTicks = 0;
          promise = null;
          onStopped = null;
        };
      });
    }
    return promise;
  };
};
