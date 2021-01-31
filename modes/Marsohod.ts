import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Handle } from "./Handle";

const VPERED = true;
const NAZAD = false;
let noKeys;

let Route: Array<number[]> = [];
let wheelsBusyTask: Promise<[number, number]> = null;
const runWheelsLogged = (l: boolean, r: boolean) => {
  const stopCondition = () => noKeys == null;
  let lp = Hardware.leftWheel({
    direction: l,
    stopCondition,
  });
  let rp = Hardware.rightWheel({
    direction: r,
    stopCondition,
  });

  if (!wheelsBusyTask) {
    wheelsBusyTask = Promise.all([lp, rp]);
    wheelsBusyTask.then(([ls, rs]) => {
      Route.push([ls, rs]);
      wheelsBusyTask = null;
    });
  }
};

const rollbackRoute = () => {
  if (Route.length === 0 || wheelsBusyTask) {
    return;
  }
  let [l, r] = Route[Route.length - 1];

  let done = Promise.resolve(0);
  let lp =
    l == 0
      ? done
      : Hardware.leftWheel({
          direction: l < 0,
          stopCondition: (x) => x + l == 0,
        });

  let rp =
    r == 0
      ? done
      : Hardware.rightWheel({
          direction: r < 0,
          stopCondition: (x) => x + r == 0,
        });
  wheelsBusyTask = Promise.all([lp, rp]);
  wheelsBusyTask.then(() => {
    setTimeout(() => {
      Route.splice(-1, 1);
      wheelsBusyTask = null;
      rollbackRoute();
    }, 1000);
  });
};
export const Marsohod = () =>
  Handle({
    [KEY_CODES.TOP]: () => runWheelsLogged(VPERED, VPERED),
    [KEY_CODES.BOTTOM]: () => runWheelsLogged(NAZAD, NAZAD),
    [KEY_CODES.LEFT]: () => runWheelsLogged(NAZAD, VPERED),
    [KEY_CODES.RIGHT]: () => runWheelsLogged(VPERED, NAZAD),
    [KEY_CODES.PLUS]: () => Hardware.head(55),
    [KEY_CODES.MINUS]: () => Hardware.head(125),
    [KEY_CODES.GREEN]: () => Hardware.head(90),

    [KEY_CODES.PLAY]: () => {
      if (!wheelsBusyTask) {
        rollbackRoute();
        return;
      }
    },
    default: () => {
      if (noKeys) {
        clearTimeout(noKeys);
      }
      noKeys = setTimeout(() => {
        noKeys = null;
      }, 150);
    },
  });
