import { oled } from "./Hardware";
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
    var w = new Waveform(128, { doubleBuffer: true });
    var SAMPLERATE = 2000; /* Hz */
    w.on("buffer", (buf) => {
      oled.clear();
      oled.moveTo(0, 32);
      buf.forEach((y, x) => oled.lineTo(x, y / 4));
      oled.flip();
    }); 

    w.startInput(A2, SAMPLERATE, { repeat: true });
  }, 4000);
