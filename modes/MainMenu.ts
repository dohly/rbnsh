import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Menu } from "./Menu";
import { Handle } from "./Handle";
import { startUp, Timer, pause, stop } from "./Timer";
import { Marsohod } from "./Marsohod";
import { mp3 } from "../drivers/MP3";

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
          mp3
            .play(200)
            .then(() => mp3.play(1003))
            .then(() => mp3.play(300))
            .then(() => mp3.play(40))
            .then(() => mp3.play(5));
        },
        [KEY_CODES.RIGHT]: () => mp3.playPrevious(),
        [KEY_CODES.TOP]: () => mp3.increaseVolume(),
        [KEY_CODES.BOTTOM]: () => mp3.decreaseVolume(),
        [KEY_CODES.CROSS]: () => {
          mp3.pause();
          MainMenu();
        },
      });
    },
  ],
]);
