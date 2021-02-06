import { mp3 } from "./drivers/MP3";
import { Hardware } from "./Hardware";
import { HardwareEvents } from "./HardwareEvents";
import { Smile } from "./Images";
import { MainMenu } from "./modes/MainMenu";
HardwareEvents.oledReady.subscribe(() => {
  if (Hardware.oled) {
    Hardware.oled.clear();
    Hardware.oled.setFontVector(15);
    Hardware.oled.drawImage(Smile, 0, 0);
    Hardware.oled.flip();
  }
  setTimeout(MainMenu, 5000);
});
