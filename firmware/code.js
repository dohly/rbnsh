/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/Golova.js":
/*!***************************!*\
  !*** ./modules/Golova.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

const pryamo = 90;
var Golova = function () {
  this._servo = require("@amperka/servo").connect(P8);
  this._servo.write(pryamo);
};

Golova.prototype.Pryamo = function () {
  this._servo.write(pryamo);
};

Golova.prototype.Poverni = function (ugol) {
  this._servo.write(ugol);
};

exports.connect = function () {
  return new Golova();
};


/***/ }),

/***/ "./modules/Menu.js":
/*!*************************!*\
  !*** ./modules/Menu.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

var Menu = function (screen) {
  this._screen = screen;
  this._position = 0;
};

Menu.prototype.Main = function () {
  var cursor = this._position;
  var screen = this._screen;
  // выбираем размер шрифта
  screen.setFontVector(15);
  screen.clear();
  // записываем строку в буфер дисплея
  screen.drawString("MARSOHOD", 10, 0);
  screen.drawString("PRILIPALA", 10, 20);
  screen.drawString("SLEDOPIT", 10, 40);
  screen.drawString(">", 0, cursor * 10);
  // отображаем содержимое буфера на экране
  screen.flip();
};

Menu.prototype.Up = function () {
  this._position--;
  this._position = Math.max(0, this._position);
  this.Main();
};

Menu.prototype.Down = function () {
  this._position++;
  this._position = Math.min(3, this._position);
  this.Main();
};

exports.connect = function (screen) {
  return new Menu(screen);
};


/***/ }),

/***/ "./modules/Pult.js":
/*!*************************!*\
  !*** ./modules/Pult.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

var Pult = function (pin, handlers, show_code) { // handlers - словарь с обработчиками
  var receiver = require("@amperka/ir-receiver").connect(pin);
  receiver.on("receive", function (code) {
    if (show_code) {
      print(code);
    }
    var handler=handlers[code];
    if (handler){
        handler();
    }
  });
};

exports.connect = function (pin, handlers, show_code) {
  return new Pult(pin, handlers, show_code);
};


/***/ }),

/***/ "./modules/SSD1306.js":
/*!****************************!*\
  !*** ./modules/SSD1306.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

/* Copyright (c) 2014 Sam Sykes, Gordon Williams. See the file LICENSE for copying permission. */
/* 
Module for the SSD1306 OLED controller in displays like the Crius CO-16
```
function go(){
 // write some text
 g.drawString("Hello World!",2,2);
 // write to the screen
 g.flip(); 
}
// I2C
I2C1.setup({scl:B6,sda:B7});

var g = require("SSD1306").connect(I2C1, go);
// or
var g = require("SSD1306").connect(I2C1, go, { address: 0x3C });
// or 
var g = connect(I2C1,start, { height : 48, width:64 });  // for 64x48 LCD
// or 
var g = connect(I2C1,start, { height : 32 });  // for 128x32 LCD

// SPI
var s = new SPI();
s.setup({mosi: B6, sck:B5});
var g = require("SSD1306").connectSPI(s, A8, B7, go);
```
*/
var C = {
 OLED_WIDTH                 : 128,
 OLED_CHAR                  : 0x40,
 OLED_CHUNK                 : 128
};

// commands sent when initialising the display
var extVcc=false; // if true, don't start charge pump 
var initCmds = new Uint8Array([ 
             0xAe, // 0 disp off
             0xD5, // 1 clk div
             0x80, // 2 suggested ratio
             0xA8, 63, // 3 set multiplex, height-1
             0xD3,0x0, // 5 display offset
             0x40, // 7 start line
             0x8D, extVcc?0x10:0x14, // 8 charge pump
             0x20,0x0, // 10 memory mode
             0xA1, // 12 seg remap 1
             0xC8, // 13 comscandec
             0xDA, 0x12, // 14 set compins, height==64 ? 0x12:0x02,
             0x81, extVcc?0x9F:0xCF, // 16 set contrast
             0xD9, extVcc?0x22:0xF1, // 18 set precharge
             0xDb, 0x40, // 20 set vcom detect
             0xA4, // 22 display all on
             0xA6, // 23 display normal (non-inverted)
             0xAf // 24 disp on
            ]);
// commands sent when sending data to the display
var flipCmds = [
     0x21, // columns
     0, C.OLED_WIDTH-1,
     0x22, // pages
     0, 7 /* (height>>3)-1 */];
function update(options) {
  if (options) {
    if (options.height) {
      initCmds[4] = options.height-1;
      initCmds[15] = options.height==64 || options.height==48 ? 0x12 : 0x02;
      flipCmds[5] = (options.height>>3)-1;
    }
    if (options.width) {
      C.OLED_WIDTH = options.width;
      flipCmds[1] = (128-options.width)/2; // 0x20 for 64, 0 for 128;
      flipCmds[2] = flipCmds[1]+options.width-1; // 0x5f;
    }
    if (options.contrast!==undefined) initCmds[17] = options.contrast;
  }
}


exports.connect = function(i2c, callback, options) {
  update(options);
  var oled = Graphics.createArrayBuffer(C.OLED_WIDTH,initCmds[4]+1,1,{vertical_byte : true});

  var addr = 0x3C;
  if(options) {
    if (options.address) addr = options.address;  
    // reset display if 'rst' is part of options 
    if (options.rst) digitalPulse(options.rst, 0, 10); 
  }
  
  setTimeout(function() {
    // configure the OLED
    initCmds.forEach(function(d) {i2c.writeTo(addr, [0,d]);});
  }, 50);

  // if there is a callback, call it now(ish)
  if (callback !== undefined) setTimeout(callback, 100);

  // write to the screen
  oled.flip = function() { 
    // set how the data is to be sent (whole screen)
    flipCmds.forEach(function(d) {i2c.writeTo(addr, [0,d]);});
    var chunk = new Uint8Array(C.OLED_CHUNK+1);

    chunk[0] = C.OLED_CHAR;
    for (var p=0; p<this.buffer.length; p+=C.OLED_CHUNK) {
      chunk.set(new Uint8Array(this.buffer,p,C.OLED_CHUNK), 1);
      i2c.writeTo(addr, chunk);
    } 
  };

  // set contrast, 0..255
  oled.setContrast = function(c) { i2c.writeTo(addr, 0, 0x81, c); };

  // set off
  oled.off = function() { i2c.writeTo(addr, 0, 0xAE); }

  // set on
  oled.on = function() { i2c.writeTo(addr, 0, 0xAF); }

  // return graphics
  return oled;
};

exports.connectSPI = function(spi, dc,  rst, callback, options) {
  update(options);
  var cs = options?options.cs:undefined;
  var oled = Graphics.createArrayBuffer(C.OLED_WIDTH,initCmds[4]+1,1,{vertical_byte : true});

  if (rst) digitalPulse(rst,0,10);
  setTimeout(function() {
    if (cs) digitalWrite(cs,0);
    // configure the OLED
    digitalWrite(dc,0); // command
    spi.write(initCmds);
    digitalWrite(dc,1); // data
    if (cs) digitalWrite(cs,10);
    // if there is a callback, call it now(ish)
    if (callback !== undefined) setTimeout(callback, 10);
  }, 50);

  // write to the screen
  oled.flip = function() { 
    // set how the data is to be sent (whole screen)
    if (cs) digitalWrite(cs,0);
    digitalWrite(dc,0);// command
    spi.write(flipCmds);
    digitalWrite(dc,1);// data
    spi.write(this.buffer);
    if (cs) digitalWrite(cs,1);
  };

  // set contrast, 0..255
  oled.setContrast = function(c) { 
    if (cs) cs.reset();
    spi.write(0x81,c,dc);
    if (cs) cs.set();
  };

  // set off
  oled.off = function() { 
    if (cs) cs.reset();
    spi.write(0xAE,dc);
    if (cs) cs.set();
  };

  // set on
  oled.on = function() { 
    if (cs) cs.reset();
    spi.write(0xAF,dc);
    if (cs) cs.set();
  };

  // return graphics
  return oled;
};


/***/ }),

/***/ "./modules/Shassi.js":
/*!***************************!*\
  !*** ./modules/Shassi.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

const uskorenie = 0.01;
const startSpeed = 0.3;

var counter = function (pin, callback) {
  pin.mode("input");
  setWatch(callback, pin, {
    repeat: true,
    edge: "both",
    debounce: 10,
  });
};

var Shassi = function () {
  var koleco = require("@amperka/motor");
  var self = this;
  this.RightTicks = 0;
  this.LeftTicks = 0;
  this._speedLeft = startSpeed;
  this._speedRight = startSpeed;
  this.Levoe = koleco.connect(koleco.MotorShield.M1);
  this.Pravoe = koleco.connect(koleco.MotorShield.M2);
  this.RightCounter = new counter(P10, function () {
    if (self.RightTicks > 0) {
      self.RightTicks--;
      //self._speedUpRight();
    } else {
      self._speedRight = startSpeed;
      self.Pravoe.write(0);
    }
  });
  this.LeftCounter = new counter(P11, function () {
    if (self.LeftTicks > 0) {
      self.LeftTicks--;
      //self._speedUpLeft();
    } else {
      self._speedLeft = startSpeed;
      self.Levoe.write(0);
    }
  });
};

Shassi.prototype._speedUpRight = function () {
  this._speedRight = Math.min(1, this._speedRight + uskorenie);
  this.Pravoe.write(this._rightDirection * this._speedRight);
};
Shassi.prototype._speedUpLeft = function () {
  this._speedLeft = Math.min(1, this._speedLeft + uskorenie);
  this.Levoe.write(this._leftDirection * this._speedLeft);
};
Shassi.prototype.edNemnozhko = function (lev, prav) {
  this.RightTicks = this.RightTicks + Math.abs(prav);
  this.LeftTicks = this.LeftTicks + Math.abs(lev);
  this._rightDirection = prav > 0 ? 1 : -1;
  this._leftDirection = lev > 0 ? -1 : 1;
  this._speedUpLeft();
  this._speedUpRight();
};

exports.connect = function () {
  return new Shassi();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************!*\
  !*** ./code.ts ***!
  \*****************/
var VPERED = 6;
var NAZAD = -6;
var VPERED_SLOW = 1;
var NAZAD_SLOW = -1;
var PLUS = 378132519;
var MINUS = 378134559;
var GREEN = 378126399;
var PLAY = 378091719;
var KEY_VPERED = 378101919;
var KEY_NAZAD = 378124359;
var KEY_VPRAVO = 378116199;
var KEY_VLEVO = 378081519;
var golova = __webpack_require__(/*! ./modules/Golova */ "./modules/Golova.js").connect();
var shassi = __webpack_require__(/*! ./modules/Shassi */ "./modules/Shassi.js").connect();
var handlers = {};
var dontRun = true;
var oled;
handlers[KEY_VPERED] = function () {
    if (dontRun) {
        if (y_strelki == 20) {
            y_strelki = 40;
        }
        else {
            y_strelki = 20;
        }
        vopros();
    }
    else {
        shassi.edNemnozhko(VPERED, VPERED);
    }
};
handlers[KEY_NAZAD] = function () {
    if (dontRun) {
        if (y_strelki == 20) {
            y_strelki = 40;
        }
        else {
            y_strelki = 20;
        }
        vopros();
    }
    else {
        shassi.edNemnozhko(NAZAD, NAZAD);
    }
};
handlers[KEY_VLEVO] = function () {
    shassi.edNemnozhko(NAZAD_SLOW, VPERED_SLOW);
};
handlers[KEY_VPRAVO] = function () {
    shassi.edNemnozhko(VPERED_SLOW, NAZAD_SLOW);
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
    oled.setFontVector(15);
    oled.clear();
    if (y_strelki == 20) {
        var img = {
            width: 128,
            height: 64,
            bpp: 1,
            buffer: require("heatshrink").decompress(atob("AA0f/ANLgP/AAWAB5N/B4f+BxEPBwYAB+APHBYXgg4ECBwwKCCovgB4s/BAoWB/guGA4wXBMQgXBE4wIGj5HHFAKUEv6aIj6CEFw4wDIAUDVBK2B4CcCU5I6BUQTZLBYc/HxBACFYQzDgIXCj5LEIYQHDUIU/C4YMBCQQnFv43Dv/ADQZjBCgT+EJgMHLwYPIj/gh4PFIgIPEh/wj4GEB5H4EIIvLHoKOEB5BdBOwZvJB4JxBAwYPCDAkB/1/doavHB44AIB6H/B57eDABQPQH75veB4KmDB5S2DVoQADj7fEawIUBB4o6CB4MfB4MDfoR7EFQMH/Ef+BkCKYgGDh/4AIIYCEYIACEwcP+AhBHAQjBAAUPIwQ9BIIIFBn4DCAopdBEohADHwIlCRoJFDCYI0Cj5eCBgYGCeoXwEYIoCFgaQCAYIMBAAI+Cg5SDFYUHB4YXCBYZmDGAQuDPAgzBLgQEBDwZOBdgadFAAY2BXAd/dww+CdAh4BB46GDEoYwGBA55DYAj3FA4QXEDwIXGRoQmENBCcDUQZXHZYQADTgQAGv4ODPggAFVAIACLgqaHUg4A==")),
        };
        oled.drawImage(img, 0, 0);
        dontRun = false;
    }
    else {
        oled.drawString("=(", 0, 0);
        dontRun = false;
    }
    oled.flip();
};
var pult = __webpack_require__(/*! ./modules/Pult */ "./modules/Pult.js").connect(P3, handlers, false);
var menuLib = __webpack_require__(/*! ./modules/Menu */ "./modules/Menu.js");
var menu;
var y_strelki = 20;
function vopros() {
    oled.clear();
    oled.drawString("KAK DELA?", 0, 0);
    oled.drawString("VESELO", 20, 20);
    oled.drawString("TAK SEBE", 20, 40);
    oled.drawString(">", 0, y_strelki);
    oled.flip();
}
// настраиваем шину I²C
PrimaryI2C.setup({ sda: SDA, scl: SCL });
// подключаем библиотеку для работы с графическим дисплеем
oled = __webpack_require__(/*! ./modules/SSD1306 */ "./modules/SSD1306.js").connect(PrimaryI2C, function () {
    //menu = menuLib.connect(screen);
    // menu.Main(2);
    oled.setFontVector(15);
    oled.clear();
    oled.drawString("PRIVET", 0, 0);
    oled.flip();
    setTimeout(vopros, 5000);
});

})();

/******/ })()
;