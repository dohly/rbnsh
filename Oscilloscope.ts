import { KEY_CODES } from "./drivers/IR_Receiver";
import { Corellation } from "./dsp/Corellation";
import { oled } from "./Hardware";
import { Handle } from "./modes/Handle";
import { MainMenu } from "./modes/MainMenu";
import { Menu } from "./modes/Menu";
import { StartMenu } from "./modes/StartMenu";
import { Phrazes } from "./voice/Phrazes";
import { sayPhraze } from "./voice/Say";

export const Oscilloscope = () => {
  const size = 128;
  var w = new Waveform(size, { doubleBuffer: true });
  var SAMPLERATE = 2000; /* Hz */
  var data = new Uint8Array(size);
  var original: Uint8Array = null;
  // w.on("finish", (buf) => {
  //   oled.clear();
  //   data.set(buf);
  //   E.FFT(data);
  //   if (!original) {
  //     original = new Uint8Array(data);
  //     oled.drawString("recorded", 0, 0);
  //   } else {
  //     var diff = E.convolve(original, data, 0);
  //     oled.drawString(diff, 0, 0);
  //   }
  //   //oled.moveTo(0, 32);
  //   //data.forEach((y, x) => oled.lineTo(x, y / 4));
  //   oled.flip();
  //   listening = false;
  // });
  w.on("buffer", (buf) => {
    oled.clear();
    data.set(buf);
    oled.moveTo(0, 32);
    data.forEach((y, x) => oled.lineTo(x, y / 4));
    var l = data.length;
    E.FFT(data);
    var v = E.variance(data, E.sum(data) / l) / l / 4;
    oled.drawString(
      "............................................................".substr(
        0,
        v
      ),
      0,
      40
    );
    oled.flip();
    //listening = false;
  });
  let listening = false;
  oled.setFontVector(15);
  oled.clear();

  Handle({
    [KEY_CODES.PLAY]: () => {
      if (!listening) {
        listening = true;       
        oled.drawString("Started", 0, 0);
        oled.flip();
        w.startInput(A2, SAMPLERATE, { repeat: true });
      }
    },
    [KEY_CODES.CROSS]: () => {
      w.stop();
      MainMenu();
    },
    // [KEY_CODES.CROSS]: () => {
    //   original = null;
    //   oled.drawString("cleared", 0, 0);
    //   oled.flip();
    // },
  });
};
