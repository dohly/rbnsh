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
