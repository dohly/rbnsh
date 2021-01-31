import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Handlers, Mode } from "./Mode";
import { Timer } from "./Timer";

const Menu = (items: Array<[string, () => void]>) => () => {
  const step = 20;
  let s_item = 0;

  const draw = () => {
    Hardware.oled.clear();
    for (let i = 0; i < items.length; i++) {
      const [item, _] = items[i];
      const text = i === s_item ? `> ${item}` : `  ${item}`;
      Hardware.oled.drawString(text, 0, i * step);
    }
    Hardware.oled.flip();
  };
  const up = () => {
    s_item = Math.max(0, s_item - 1);
    draw();
  };
  const down = () => {
    s_item = Math.min(items.length - 1, s_item + 1);
    draw();
  };
  const select = () => {
    const [_, onSelected] = items[s_item];
    onSelected();
  };
  const handlers: Handlers = {
    [KEY_CODES.TOP]: up,
    [KEY_CODES.BOTTOM]: down,
    [KEY_CODES.PLAY]: select,
  };
  draw();
  Mode(handlers);
};

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
      Mode({ [KEY_CODES.PLAY]: () => t.stop() });
    },
  ],
  ["Marsohod", () => {}],
  ["Else", () => {}],
]);
