const uskorenie = 0.05;
const startSpeed = 0.2;

var counter = function(pin, callback) {
  this._pin = pin;
  this._pin.mode('input');
  var self = this;
  setWatch(
    callback,
    this._pin,
    {
      repeat: true,
      edge: 'rising',
      debounce: 10
    }
  );
};

var Shassi = function (debug) {
  var koleco = require("@amperka/motor");
  var self=this;
  this.RightTicks=0;
  this.LeftTicks=0;
  this.RightCounter=new counter(P10, function(){self.RightTicks++;})
  this.LeftCounter=new counter(P11, function(){self.LeftTicks++;})
  this._speed = startSpeed;
  this._factSpeed = 0;
  this.Levoe = koleco.connect(koleco.MotorShield.M1);
  this.Pravoe = koleco.connect(koleco.MotorShield.M2);
};

Shassi.prototype.Stop = function () {
  this.Levoe.write(0);
  this.Pravoe.write(0);
  this._factSpeed = 0;
  this._speed = startSpeed;
};

Shassi.prototype.edNemnozhko = function (lev, prav) {
  var speed = Math.min(1, this._speed + uskorenie);
  this._speed = speed;
  this._factSpeed = speed;
  var ls = speed * lev;
  this.Levoe.write(ls);
  var rs = -speed * prav;
  this.Pravoe.write(rs);
  clearTimeout(this._sdelaiPozhe); //отмени задание
  var self = this;
  this._sdelaiPozhe = setTimeout(function () {
    self.Stop();
  }, 200); // даем задание - останови колеса чуть позже
};

exports.connect = function (debug) {
  return new Shassi(debug);
};
