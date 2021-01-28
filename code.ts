import { KEY_CODES } from "./drivers/IR_Receiver";
import { Hardware } from "./Hardware";
import { HardwareEvents } from "./HardwareEvents";
import { Smile } from "./Images";

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
var handlers = {};
var dontRun = true;
handlers[KEY_CODES.TOP] = () => {
  if (dontRun) {
    if (y_strelki > 0) {
      y_strelki = y_strelki - 20;
    } else {
      y_strelki = 20;
    }

    vopros();
  } else {
    runWheelsLogged(VPERED, VPERED);
  }
};
handlers[KEY_CODES.BOTTOM] = () => {
  if (dontRun) {
    if (y_strelki < 40) {
      y_strelki = y_strelki + 20;
    } else {
      y_strelki = 0;
    }
    vopros();
  } else {
    runWheelsLogged(NAZAD, NAZAD);
  }
};
handlers[KEY_CODES.LEFT] = () => {
  runWheelsLogged(NAZAD, VPERED);
};
handlers[KEY_CODES.RIGHT] = () => {
  runWheelsLogged(VPERED, NAZAD);
};
handlers[KEY_CODES.PLUS] = () => {
  Hardware.head(55);
};
handlers[KEY_CODES.MINUS] = () => {
  Hardware.head(125);
};
handlers[KEY_CODES.GREEN] = () => {
  Hardware.head(90);
};

handlers[KEY_CODES.PLAY] = () => {
  if (y_strelki == 0) {
    Hardware.oled.clear();
    Hardware.oled.setFontVector(40);
    Hardware.oled.drawString("00:00", 0, 10);
    Hardware.oled.flip();
    return;
  }
  if (!dontRun && !wheelsBusyTask) {
    rollbackRoute();
    return;
  }
  Hardware.oled.setFontVector(15);
  Hardware.oled.clear();
  if (y_strelki == 20) {
    dontRun = false;
  } else {
    Hardware.oled.drawString("=(", 0, 0);
    dontRun = false;
  }
  Hardware.oled.flip();
};

var y_strelki = 0;
function vopros() {
  Hardware.oled.clear();
  Hardware.oled.drawString("SECONDS", 20, 0);
  Hardware.oled.drawString("ZASHIBIS", 20, 20);
  Hardware.oled.drawString("TAK SEBE", 20, 40);
  Hardware.oled.drawString(">", 0, y_strelki);
  Hardware.oled.flip();
}

function hi() {
  if (Hardware.oled) {
    Hardware.oled.clear();
    Hardware.oled.setFontVector(15);
    Hardware.oled.drawImage(Smile, 0, 0);
    Hardware.oled.flip();
  }
  setTimeout(vopros, 5000);
}

HardwareEvents.oledReady.subscribe(hi);
HardwareEvents.irCodes.subscribe((x) => {
  if (noKeys) {
    clearTimeout(noKeys);
  }
  noKeys = setTimeout(() => {
    noKeys = null;
  }, 150);

  let handler = handlers[x];
  if (handler) {
    handler();
  }
});
