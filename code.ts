import { LeftWheel, RightWheel } from "./Wheels";
import { connectDisplay } from "./OLED";
import { IR_Receiver } from "./IR_Receiver";
import { BuildServo } from "./Servo";
import { KEY_CODES } from "./KEY_CODES";

const VPERED = 6;
const NAZAD = -6;

const VPERED_SLOW = 1;
const NAZAD_SLOW = -1;

const golova = BuildServo(P8, 90);

var handlers = {};
var dontRun = true;
var oled: any;
handlers[KEY_CODES.TOP] = function () {
  if (dontRun) {
    if (y_strelki == 20) {
      y_strelki = 40;
    } else {
      y_strelki = 20;
    }

    vopros();
  } else {
    LeftWheel(VPERED);
    RightWheel(VPERED);
  }
};
handlers[KEY_CODES.BOTTOM] = function () {
  if (dontRun) {
    if (y_strelki == 20) {
      y_strelki = 40;
    } else {
      y_strelki = 20;
    }
    vopros();
  } else {
    LeftWheel(NAZAD);
    RightWheel(NAZAD);
  }
};
handlers[KEY_CODES.LEFT] = function () {
  LeftWheel(NAZAD_SLOW);
  RightWheel(VPERED_SLOW);
};
handlers[KEY_CODES.RIGHT] = function () {
  LeftWheel(VPERED_SLOW);
  RightWheel(NAZAD_SLOW);
};
handlers[KEY_CODES.PLUS] = function () {
  golova(55);
};
handlers[KEY_CODES.MINUS] = function () {
  golova(125);
};
handlers[KEY_CODES.GREEN] = function () {
  golova(90);
};
handlers[KEY_CODES.PLAY] = function () {
  oled.setFontVector(15);
  oled.clear();
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

    oled.drawImage(img, 0, 0);
    dontRun = false;
  } else {
    oled.drawString("=(", 0, 0);
    dontRun = false;
  }
  oled.flip();
};

IR_Receiver(P3, code => handlers[code]());
var y_strelki = 20;
function vopros() {
  oled.clear();
  oled.drawString("KAK DELA?", 0, 0);
  oled.drawString("GOOD", 20, 20);
  oled.drawString("TAK SEBE", 20, 40);
  oled.drawString(">", 0, y_strelki);
  oled.flip();
}
// настраиваем шину I²C
PrimaryI2C.setup({ sda: SDA, scl: SCL });
// подключаем библиотеку для работы с графическим дисплеем
oled = connectDisplay(PrimaryI2C, function () {
  if (oled) {
    oled.setFontVector(15);
    oled.clear();
    oled.drawString("PRIVET", 0, 0);
    oled.flip();
  }
  setTimeout(vopros, 5000);
});
