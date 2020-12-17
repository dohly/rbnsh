const VPERED = -1;
const NAZAD = 1;

const KEY_VPERED=378101919;
const KEY_NAZAD=378124359;
const KEY_VPRAVO=378116199;
const KEY_VLEVO=378081519;

const PLUS=378132519;
const MINUS=378134559;
const GREEN=378126399;

var golova=require('Golova').connect();
var shassi=require('Shassi').connect();

var handlers={};
handlers[KEY_VPERED]=function(){shassi.edNemnozhko(VPERED,VPERED);};
handlers[KEY_NAZAD]=function(){shassi.edNemnozhko(NAZAD,NAZAD);};
handlers[KEY_VLEVO]=function(){shassi.edNemnozhko(NAZAD,VPERED);};
handlers[KEY_VPRAVO]=function(){shassi.edNemnozhko(VPERED,NAZAD);};
handlers[PLUS]=function(){golova.Poverni(55);};
handlers[MINUS]=function(){golova.Poverni(125);};
handlers[GREEN]=function(){golova.Pryamo();};

var pult=require('Pult').connect(P3, handlers, true);


var x=0;
function print_N(){
    // выбираем размер шрифта
    screen.setFontVector(15);
  screen.clear();
    // записываем строку в буфер дисплея
    screen.drawString('N', x, 0);
    // отображаем содержимое буфера на экране
    screen.flip();
}

function begi_N(){
  x=x+1;
  print_N();
  setTimeout(begi_N, 200);
}


function menu(cursor){
    // выбираем размер шрифта
  screen.setFontVector(15);
  screen.clear();
    // записываем строку в буфер дисплея
    screen.drawString('MARSOHOD', 10, 0);
    screen.drawString('PRILIPALA', 10, 20);
    screen.drawString('SLEDOPIT', 10, 40);
    screen.drawString('>',0,cursor*10);
    // отображаем содержимое буфера на экране
    screen.flip();
}


/*
// настраиваем шину I²C
PrimaryI2C.setup({sda: SDA, scl: SCL});
// подключаем библиотеку для работы с графическим дисплеем
var screen = require("SSD1306").connect(PrimaryI2C, ()=>menu(20));
*/

/*
var ultrasonic=require('@amperka/ultrasonic').connect({  trigPin:P12, echoPin:P13});

var lineSensor=require('@amperka/analog-line-sensor');
var leftSensor=lineSensor.connect(A0);
var rightSensor=lineSensor.connect(A1);

var pravSectors=0;
var levSectors=0;

var odometer=require('@amperka/digital-line-sensor');
var levOdometer=odometer.connect(P11);
levOdometer.on('white', function(){
  levSectors++;
});

var pravOdometer=odometer.connect(P10);
pravOdometer.on('white', function(){
  pravSectors++;
});
*/
