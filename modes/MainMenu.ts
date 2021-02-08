import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Menu } from "./Menu";
import { Handle } from "./Handle";
import { startUp, Timer, pause, stop } from "./Timer";
import { Marsohod } from "./Marsohod";
import { sayNumber } from "../voice/Say";

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
  ["Marsohod", Marsohod],
  [
    "music",
    () => {
      let number = 1;
      Handle({
        [KEY_CODES.LEFT]: () => {
          sayNumber(number);
          number--;
        },
        [KEY_CODES.RIGHT]: () => {
          sayNumber(number);
          number++;
        },
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
