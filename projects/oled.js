const VPERED = -1;
const NAZAD = 1;

const KEY_VPERED=378101919;
const KEY_NAZAD=378124359;
const KEY_VPRAVO=378116199;
const KEY_VLEVO=378081519;

const PLUS=378132519;
const MINUS=378134559;
const GREEN=378126399;

const pryamo=90;

var golova=require('@amperka/servo').connect(P8);

var p_golovi;

function poverni_golovy(ugol){
  p_golovi=ugol;
 golova.write(p_golovi);
}

poverni_golovy(pryamo);
var receiver=require('@amperka/ir-receiver').connect(P3);
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

var koleco=require('@amperka/motor');
var levoe_koleco=koleco.connect(koleco.MotorShield.M1);
var pravoe_koleco=koleco.connect(koleco.MotorShield.M2);

var pid=require('@amperka/pid').create({
  target:0,
  kp:2,
  ki:0.5,
  kd:5,
  outputMin:-1,
  outputMax: 1
});

pid.run(function(){
  if (factSpeed!=0){
  var diff=levSectors-pravSectors;
  var correction=pid.update(diff);
  levoe_koleco.write(speed-correction);
  pravoe_koleco.write(speed+correction);}
}, 0.02);

const uskorenie=0.05;
const startSpeed=0.2;

var speed=startSpeed;
var factSpeed=0;

function stop(){
  print('stop');
  speed=startSpeed;
  factSpeed=0;
  levoe_koleco.write(0);
  pravoe_koleco.write(0);
}

function edNemnozhko(lev,prav){
  speed=Math.min(1, speed+uskorenie);
  factSpeed=speed;
  var ls=speed*lev;
    levoe_koleco.write(ls);
  var rs=-speed*prav;
    pravoe_koleco.write(rs);
  print('Left:'+ls+' Right:'+ rs);
    clearTimeout(sdelaiPozhe);//отмени задание
    sdelaiPozhe=setTimeout(stop, 200);// даем задание - останови колеса чуть позже
}

var sdelaiPozhe;

receiver.on('receive', function(code){
  print(code); 
  if (code==KEY_VPERED){ //если код, принятый приемником, равен коду кнопки "вперед"
    edNemnozhko(VPERED,VPERED);
  } else if (code==KEY_NAZAD){
    edNemnozhko(NAZAD,NAZAD);
  } else if (code==KEY_VLEVO){
    edNemnozhko(NAZAD,VPERED);
  } else if (code==KEY_VPRAVO){
    edNemnozhko(VPERED,NAZAD);
  } else if (code==PLUS){
    
    poverni_golovy(55);
  } else if (code==MINUS){
    poverni_golovy(125);
  } else if (code==GREEN){
    poverni_golovy(pryamo);
  }
});


    // настраиваем шину I²C
    PrimaryI2C.setup({sda: SDA, scl: SCL, bitrate: 100000});
    // подключаем библиотеку для работы с графическим дисплеем
    var screen = require("SSD1306").connect(PrimaryI2C);
    // выбираем размер шрифта
    screen.setFontVector(15);
    // записываем строку в буфер дисплея
    screen.drawString("Privet Sofia!", 0, 0);
    screen.drawString("Privet Veronika!", 0, 20);
    screen.drawString("Privet Nelly!", 0, 40);
    // отображаем содержимое буфера на экране
    screen.flip();




