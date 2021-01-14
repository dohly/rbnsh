const VPERED = -1;
const NAZAD = 1;

const PLUS = 378132519;
const MINUS = 378134559;
const GREEN = 378126399;
const PLAY = 378091719;

const KEY_VPERED = 378101919;
const KEY_NAZAD = 378124359;
const KEY_VPRAVO = 378116199;
const KEY_VLEVO = 378081519;

var golova = require("Golova").connect();
var shassi = require("Shassi").connect();

var handlers = {};
var dontRun = true;
handlers[KEY_VPERED] = function () {
  if (dontRun) {
    if (y_strelki == 20) {
      y_strelki = 40;
    } else {
      y_strelki = 20;
    }

    vopros();
  } else {
    shassi.edNemnozhko(VPERED, VPERED);
  }
};
handlers[KEY_NAZAD] = function () {
  if (dontRun) {
    if (y_strelki == 20) {
      y_strelki = 40;
    } else {
      y_strelki = 20;
    }
    vopros();
  }else{
    shassi.edNemnozhko(NAZAD, NAZAD);
  }
};
handlers[KEY_VLEVO] = function () {
  shassi.edNemnozhko(NAZAD, VPERED);
};
handlers[KEY_VPRAVO] = function () {
  shassi.edNemnozhko(VPERED, NAZAD);
};
handlers[PLUS] = function () {
  golova.Poverni(55);
};
handlers[MINUS] = function () {
  golova.Poverni(125);
};
handlers[GREEN] = function () {
  golova.Pryamo();
};
handlers[PLAY] = function () {
  screen.setFontVector(15);
  screen.clear();
  if (y_strelki == 20) {
    var img = {
      width: 128,
      height: 64,
      bpp: 1,
      buffer: require("heatshrink").decompress(
        atob(
          "AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A=="
        )
      ),
    };

    screen.drawImage(img, 0, 0);
    dontRun=false;
  } else {
    screen.drawString("=(", 0, 0);
    dontRun=false;
  }
  screen.flip();
};

var pult = require("Pult").connect(P3, handlers, false);
var menuLib = require("Menu");
var menu;
var y_strelki = 20;
function vopros() {
  screen.clear();
  screen.drawString("KAK DELA?", 0, 0);
  screen.drawString("XOPOSHO", 20, 20);
  screen.drawString("TAK SEBE", 20, 40);
  screen.drawString(">", 0, y_strelki);
  screen.flip();
}
// настраиваем шину I²C
PrimaryI2C.setup({ sda: SDA, scl: SCL });
// подключаем библиотеку для работы с графическим дисплеем
var screen = require("SSD1306").connect(PrimaryI2C, function () {
  //menu = menuLib.connect(screen);
  // menu.Main(2);
  screen.setFontVector(15);
  screen.clear();
  screen.drawString("PRIVET", 0, 0);
  screen.flip();
  setTimeout(vopros, 5000);
});
