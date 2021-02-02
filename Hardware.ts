import { BuildEncoder } from "./drivers/Encoder";
import { IR_Receiver } from "./drivers/IR_Receiver";
import { M1, M2 } from "./drivers/Motorshield";
import { connectDisplay } from "./drivers/OLED";
import { BuildServo } from "./drivers/Servo";
import { BuildWheel } from "./drivers/Wheels";
import { HardwareEvents } from "./HardwareEvents";


const HardwareInit = () => {
  PrimaryI2C.setup({ sda: SDA, scl: SCL });
  const oled = connectDisplay(PrimaryI2C, () =>
    HardwareEvents.oledReady.publish()
  );
  const rightEncoder = BuildEncoder(P10);
  const leftEncoder = BuildEncoder(P11);
  IR_Receiver(P3, (code) => HardwareEvents.irCodes.publish(code));
  let leftWheel = BuildWheel(M1, leftEncoder, false);
  let rightWheel = BuildWheel(M2, rightEncoder, true);
  return {
    head: BuildServo(P8, 90),
    leftWheel,
    rightWheel,
    oled,
  };
};

export const Hardware = HardwareInit();