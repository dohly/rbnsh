const VPERED = -1;
const NAZAD = 1;

const PLUS = 378132519;
const MINUS = 378134559;
const GREEN = 378126399;
const PLAY= 378091719;

var golova = require("Golova").connect();
var shassi = require("Shassi").connect();

var handlers = {};
handlers[KEY_VPERED] = function () {
  //shassi.edNemnozhko(VPERED, VPERED);
  if (y_strelki==20)
  {
    y_strelki=40;
  } else{
    y_strelki=20;
  }
  vopros();
};
handlers[KEY_NAZAD] = function () {
  //shassi.edNemnozhko(NAZAD, NAZAD);
  if (y_strelki==20)
  {
    y_strelki=40;
  } else{
    y_strelki=20;
  }
  vopros();
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
handlers[PLAY]=function(){
  
};

var pult = require("Pult").connect(P3, handlers, true);
var menuLib = require("Menu");
var menu;
var y_strelki=20;
function vopros(){
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
