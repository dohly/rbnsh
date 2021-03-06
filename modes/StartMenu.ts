import { oled } from "../Hardware";
import { Smile } from "../Images";
import { Phrazes } from "../voice/Phrazes";
import { sayPhraze } from "../voice/Say";
import { MainMenu } from "./MainMenu";
import { Menu } from "./Menu";

export const StartMenu = Menu([
  [
    "DA",
    () => {
      oled.clear();
      oled.setFontVector(15);
      oled.drawImage(Smile, 0, 0);
      oled.flip();
      sayPhraze(Phrazes.Very)
      .then(() => sayPhraze(Phrazes.Good))
      .then(MainMenu);
    },
  ],
  ["NET", () => sayPhraze(Phrazes.Very).then(() => sayPhraze(Phrazes.Bad))],
]);
