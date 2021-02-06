import { BuildEncoder } from "./drivers/Encoder";
import { IR_Receiver } from "./drivers/IR_Receiver";
import { M1, M2 } from "./drivers/Motorshield";
import { mp3 } from "./drivers/MP3";
import { connectDisplay } from "./drivers/OLED";
import { BuildServo } from "./drivers/Servo";
import { BuildWheel } from "./drivers/Wheels";
import { HardwareEvents } from "./HardwareEvents";

const HardwareInit = () => {
  setTimeout(() => {
    mp3.setGain(1);
    mp3
      .play(1)
      .then(() => mp3.play(2))
      .then(() => mp3.play(3))
      .then(() => mp3.play(5));
  }, 1000);

  PrimaryI2C.setup({ sda: SDA, scl: SCL });
  const oled = connectDisplay(PrimaryI2C, () =>
    HardwareEvents.oledReady.publish()
  );
  const rightEncoder = BuildEncoder(P10);
  const leftEncoder = BuildEncoder(P11);
  IR_Receiver(P3, (code) => HardwareEvents.irCodes.publish(code));
  let leftWheel = BuildWheel(M2, leftEncoder, false);
  let rightWheel = BuildWheel(M1, rightEncoder, true);
  return {
    head: BuildServo(P8, 90),
    leftWheel,
    rightWheel,
    oled,
  };
};

export const Hardware = HardwareInit();
