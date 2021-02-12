import { KEY_CODES } from "./drivers/IR_Receiver";
import { Corellation } from "./dsp/Corellation";
import { oled } from "./Hardware";
import { Handle } from "./modes/Handle";
import { Menu } from "./modes/Menu";
import { StartMenu } from "./modes/StartMenu";
import { Phrazes } from "./voice/Phrazes";
import { sayPhraze } from "./voice/Say";

setTimeout(() =>
  // sayPhraze(Phrazes.Hi)
  //   .then(() => sayPhraze(Phrazes.Sofia))
  //   .then(() => sayPhraze(Phrazes.Hi))
  //   .then(() => sayPhraze(Phrazes.Veronika))
  //   .then(() => sayPhraze(Phrazes.MainQuestion))
  //   .then(StartMenu),
  {
    const size = 2048;
    var w = new Waveform(size, { doubleBuffer: true });
    var SAMPLERATE = 2000; /* Hz */
    var data = new Uint8Array(size);
    var original: Uint8Array = null;
    w.on("finish", (buf) => {
      oled.clear();
      data.set(buf);
      E.FFT(data);
      if (!original) {
        original = new Uint8Array(data);
        oled.drawString("recorded", 0, 0);
      } else {
        var diff = Corellation(original, data);
        oled.drawString(diff, 0, 0);
      }
      //oled.moveTo(0, 32);
      //data.forEach((y, x) => oled.lineTo(x, y / 4));
      oled.flip();
      listening = false;
    });
    let listening = false;
    Handle({
      [KEY_CODES.PLAY]: () => {
        if (!listening) {
          listening = true;
          oled.setFontVector(15);
          oled.drawString("Started", 0, 0);
          oled.flip();
          w.startInput(A2, SAMPLERATE, { repeat: false });
        }
      },
      [KEY_CODES.CROSS]: () => {
        original = null;
        oled.drawString("cleared", 0, 0);
        oled.flip();
      },
    });
  }, 4000);
