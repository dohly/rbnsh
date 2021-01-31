import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Menu } from "./Menu";
import { Handle } from "./Handle";
import { Timer } from "./Timer";
import { Marsohod } from "./Marsohod";

export const MainMenu = Menu([
  [
    "Timer",
    () => {
      Hardware.oled.setFontVector(40);
      const t = new Timer((x) => {
        Hardware.oled.clear();
        Hardware.oled.drawString(x, 0, 10);
        Hardware.oled.flip();
      });
      t.startUp();
      Handle({
        [KEY_CODES.PLAY]: () => t.stop(),
        [KEY_CODES.LEFT]: MainMenu,
      });
    },
  ],
  ["Marsohod", Marsohod],
  ["Else", () => {}],
]);
