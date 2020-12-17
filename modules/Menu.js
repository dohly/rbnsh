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
