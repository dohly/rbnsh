import { KEY_CODES } from "./drivers/IR_Receiver";
import { HardwareEvents, Hardware } from "./Hardware";

const VPERED = 6;
const NAZAD = -6;

const VPERED_SLOW = 1;
const NAZAD_SLOW = -1;
let Route: Array<number[]> = [];
const wheels = (l: number, r: number) => {
  Route.push([l, r]);
  Hardware.leftWheel(l);
  Hardware.rightWheel(r);
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
    wheels(VPERED, VPERED);
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
    wheels(NAZAD, NAZAD);
  }
};
handlers[KEY_CODES.LEFT] = () => {
  wheels(NAZAD_SLOW, VPERED_SLOW);
};
handlers[KEY_CODES.RIGHT] = () => {
  wheels(VPERED_SLOW, NAZAD_SLOW);
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
handlers[KEY_CODES.CROSS] = () => {
  for (let index = Route.length - 1; index > 0; index--) {
    const [l, r] = Route[index];
    Hardware.leftWheel(-1 * l);
    Hardware.rightWheel(-1 * r);
  }
  Route = [];
};
handlers[KEY_CODES.PLAY] = () => {
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
  let handler = handlers[x];
  if (handler) {
    handler();
  }
});

const testPromise = () =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Hardware.head(45);
      resolve();
    }, 7000);
  });

testPromise().then(() => {
  Hardware.oled.clear();
  Hardware.oled.drawString("Ok, PROMISE", 0, 0);
  Hardware.oled.flip();
});
