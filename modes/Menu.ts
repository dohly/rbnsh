import { KEY_CODES } from "../drivers/IR_Receiver";
import { Hardware } from "../Hardware";
import { Handlers, Handle } from "./Handle";

export const Menu = (items: Array<[string, () => void]>) => () => {
  const step = 20;
  let s_item = 0;
  const draw = () => {
    const y_offset = Math.max(0, (s_item - 2) * step);
    Hardware.oled.setFontVector(15);
    Hardware.oled.clear();
    for (let i = 0; i < items.length; i++) {
      const [item, _] = items[i];
      const text = i === s_item ? `> ${item}` : `  ${item}`;
      Hardware.oled.drawString(text, 0, i * step - y_offset);
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
  Handle(handlers);
};
