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
