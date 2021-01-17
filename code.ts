import { KEY_CODES } from "./drivers/IR_Receiver";
import { Hardware } from "./Hardware";
import { HardwareEvents } from "./HardwareEvents";

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
    if (y_strelki == 20) {
      y_strelki = 40;
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
    if (y_strelki == 20) {
      y_strelki = 40;
    } else {
      y_strelki = 20;
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
  if (!dontRun && !wheelsBusyTask) {
    rollbackRoute();
    return;
  }
  Hardware.oled.setFontVector(15);
  Hardware.oled.clear();
  if (y_strelki == 20) {
    var img = {
      width: 128,
      height: 64,
      bpp: 1,
      buffer: __non_webpack_require__("heatshrink").decompress(
        atob(
          "AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="
        )
      ),
    };

    Hardware.oled.drawImage(img, 0, 0);
    dontRun = false;
  } else {
    Hardware.oled.drawString("=(", 0, 0);
    dontRun = false;
  }
  Hardware.oled.flip();
};

var y_strelki = 20;
function vopros() {
  Hardware.oled.clear();
  Hardware.oled.drawString("KAK DELA?", 0, 0);
  Hardware.oled.drawString("ZASHIBIS", 20, 20);
  Hardware.oled.drawString("TAK SEBE", 20, 40);
  Hardware.oled.drawString(">", 0, y_strelki);
  Hardware.oled.flip();
}

function hi() {
  if (Hardware.oled) {
    Hardware.oled.setFontVector(15);
    Hardware.oled.clear();
    Hardware.oled.drawString("PRIVET", 0, 0);
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