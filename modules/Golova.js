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
