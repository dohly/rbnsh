import { DFPlayer } from "./drivers/DFPlayer/DFPlayer";
import { BuildEncoder } from "./drivers/Encoder";
import { IR_Receiver } from "./drivers/IR_Receiver";
import { M1, M2 } from "./drivers/Motorshield";
import { connectDisplay } from "./drivers/OLED";
import { BuildServo } from "./drivers/Servo";
import { BuildWheel } from "./drivers/Wheels";
import { HardwareEvents } from "./HardwareEvents";

const HardwareInit = () => {
  PrimaryI2C.setup({ sda: SDA, scl: SCL });
  const oled = connectDisplay(PrimaryI2C, () => {
    try {
      HardwareEvents.oledReady.publish();
    } catch {
      setTimeout(() => HardwareEvents.oledReady.publish(), 400);
    }
  });
  const rightEncoder = BuildEncoder(P10);
  const leftEncoder = BuildEncoder(P11);
  IR_Receiver(P3, (code) => HardwareEvents.irCodes.publish(code));
  let leftWheel = BuildWheel(M2, leftEncoder, false);
  let rightWheel = BuildWheel(M1, rightEncoder, true);
  let mp3 = new DFPlayer(P1, P0, P2, PrimarySerial);
  return {
    head: BuildServo(P8, 90),
    leftWheel,
    rightWheel,
    oled,
    mp3,
  };
};

export const Hardware = HardwareInit();
export const Mp3 = Hardware.mp3;
export const oled = Hardware.oled;
