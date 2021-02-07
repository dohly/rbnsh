import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Menu } from "./Menu";
import { Handle } from "./Handle";
import { startUp, Timer, pause, stop } from "./Timer";
import { Marsohod } from "./Marsohod";

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
      Handle({
        [KEY_CODES.LEFT]: () => {
          Hardware.mp3
            .play(1, 1)
            .then(() => Hardware.mp3.play(1, 2))
            .then(() => Hardware.mp3.play(2, 1))
            .then(() => Hardware.mp3.play(2, 2))
            .then(() => Hardware.mp3.play(2, 3));
        },
        [KEY_CODES.RIGHT]: () => Hardware.mp3.playPrevious(),
        [KEY_CODES.TOP]: () => Hardware.mp3.increaseVolume(),
        [KEY_CODES.BOTTOM]: () => Hardware.mp3.decreaseVolume(),
        [KEY_CODES.CROSS]: () => {
          Hardware.mp3.pause();
          MainMenu();
        },
      });
    },
  ],
]);
