const C = {
  OLED_WIDTH: 128,
  OLED_CHAR: 0x40,
  OLED_CHUNK: 128,
};

// commands sent when initialising the display
var extVcc = false; // if true, don't start charge pump

export interface OLED_Options {
  rst: any;
  address?: any;
  height?: number;
  width?: number;
  contrast?: number;
}

export interface OLED_SSD1306 extends Graphics {
  flip();
  on();
  off();
  setContrast(c: number);
}

export const connectDisplay = (
  i2c: EspruinoI2C,
  callback?: () => void,
  options?: OLED_Options
): OLED_SSD1306 => {
  const initCmds = new Uint8Array([
    0xae, // 0 disp off
    0xd5, // 1 clk div
    0x80, // 2 suggested ratio
    0xa8,
    63, // 3 set multiplex, height-1
    0xd3,
    0x0, // 5 display offset
    0x40, // 7 start line
    0x8d,
    extVcc ? 0x10 : 0x14, // 8 charge pump
    0x20,
    0x0, // 10 memory mode
    0xa1, // 12 seg remap 1
    0xc8, // 13 comscandec
    0xda,
    0x12, // 14 set compins, height==64 ? 0x12:0x02,
    0x81,
    extVcc ? 0x9f : 0xcf, // 16 set contrast
    0xd9,
    extVcc ? 0x22 : 0xf1, // 18 set precharge
    0xdb,
    0x40, // 20 set vcom detect
    0xa4, // 22 display all on
    0xa6, // 23 display normal (non-inverted)
    0xaf, // 24 disp on
  ]);

  // commands sent when sending data to the display
  const flipCmds = [
    0x21, // columns
    0,
    C.OLED_WIDTH - 1,
    0x22, // pages
    0,
    7 /* (height>>3)-1 */,
  ];

  if (options) {
    if (options.height) {
      initCmds[4] = options.height - 1;
      initCmds[15] = options.height == 64 || options.height == 48 ? 0x12 : 0x02;
      flipCmds[5] = (options.height >> 3) - 1;
    }
    if (options.width) {
      C.OLED_WIDTH = options.width;
      flipCmds[1] = (128 - options.width) / 2; // 0x20 for 64, 0 for 128;
      flipCmds[2] = flipCmds[1] + options.width - 1; // 0x5f;
    }
    if (options.contrast !== undefined) initCmds[17] = options.contrast;
  }

  let oled = Graphics.createArrayBuffer(C.OLED_WIDTH, initCmds[4] + 1, 1, {
    vertical_byte: true,
  }) as OLED_SSD1306;
  oled.setRotation(2, false);
  var addr = 0x3c;
  if (options) {
    if (options.address) addr = options.address;
    // reset display if 'rst' is part of options
    if (options.rst) digitalPulse(options.rst, false, 10);
  }

  setTimeout(function () {
    // configure the OLED
    initCmds.forEach(function (d) {
      i2c.writeTo(addr, [0, d]);
    });
  }, 50);

  // if there is a callback, call it now(ish)
  if (callback !== undefined) setTimeout(callback, 100);

  // write to the screen
  oled.flip = function () {
    // set how the data is to be sent (whole screen)
    flipCmds.forEach(function (d) {
      i2c.writeTo(addr, [0, d]);
    });
    var chunk = new Uint8Array(C.OLED_CHUNK + 1);

    chunk[0] = C.OLED_CHAR;
    for (var p = 0; p < this.buffer.length; p += C.OLED_CHUNK) {
      chunk.set(new Uint8Array(this.buffer, p, C.OLED_CHUNK), 1);
      i2c.writeTo(addr, chunk);
    }
  };

  // set contrast, 0..255
  oled.setContrast = (c) => i2c.writeTo(addr, 0, 0x81, c);

  // set off
  oled.off = () => i2c.writeTo(addr, 0, 0xae);

  // set on
  oled.on = () => i2c.writeTo(addr, 0, 0xaf);

  return oled;
};
