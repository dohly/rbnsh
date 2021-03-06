import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware, oled } from "../Hardware";
import { Menu } from "./Menu";
import { Handle } from "./Handle";
import { startUp, Timer, pause, stop } from "./Timer";
import { Marsohod } from "./Marsohod";
import { sayNumber, sayPhraze } from "../voice/Say";
import { Phrazes } from "../voice/Phrazes";
import { Smile } from "../Images";
import { Oscilloscope } from "../Oscilloscope";

export const MainMenu = Menu([
  [
    "Timer",
    () => {
      Hardware.oled.setFontVector(40);
      const t = Timer.subscribe((x) => {
        Hardware.oled.clear();
        Hardware.oled.drawString(x, 0, 10);
        Hardware.oled.flip();
      });
      startUp().then(() =>
        Handle({
          [KEY_CODES.PLAY]: () => pause(),
          [KEY_CODES.CROSS]: () => {
            stop();
            MainMenu();
          },
        })
      );
    },
  ],
  ["Listen", Oscilloscope],
  ["Marsohod", Marsohod],
  [
    "Pozdravit",
    () => {
      Handle({ [KEY_CODES.CROSS]: MainMenu });
      oled.clear();
      oled.setFontVector(15);
      oled.drawImage(Smile, 0, 0);
      oled.flip();

      sayPhraze(Phrazes.Sofia).then(() => sayPhraze(Phrazes.HappyBirthday));
    },
  ],
  [
    "1, 2, 3..",
    () => {
      let number = 1;
      const drawNumber = () => {
        Hardware.oled.clear();
        Hardware.oled.drawString(number, 0, 10);
        Hardware.oled.flip();
      };
      const sayN = () => sayNumber(number);
      drawNumber();
      Handle({
        [KEY_CODES.LEFT]: () =>
          sayN()
            .then(() => number--)
            .then(drawNumber),
        [KEY_CODES.RIGHT]: () =>
          sayN()
            .then(() => number++)
            .then(drawNumber),
        [KEY_CODES.TOP]: () => Hardware.mp3.increaseVolume(),
        [KEY_CODES.BOTTOM]: () => Hardware.mp3.decreaseVolume(),
        [KEY_CODES.CROSS]: () => {
          Hardware.mp3.pause();
          MainMenu();
        },
        [KEY_CODES.X]: () => sayNumber(536),
      });
    },
  ],
]);
