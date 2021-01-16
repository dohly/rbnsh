export type Servo = (value: number, units?: "us" | "ms") => void;
export const BuildServo = (pin: Pin, startAngle: number): Servo => {
  // can be overriden in future using 'options' parameter
  let freq = 50;
  let pulseMin = 0.675;
  let pulseMax = 2.325;
  let valueMin = 0;
  let valueMax = 180;

  const period = 1000 / freq;
  const valueStart = pulseMin / period;
  const pulsDiff = pulseMax - pulseMin;
  const valueStep = pulsDiff / (valueMax - valueMin) / period;
  const servo = (value, units?) => {
    switch (units) {
      case "us":
        value = E.clip(value, pulseMin * 1000, pulseMax * 1000);
        analogWrite(pin, value / 1000 / period, { freq });
        break;
      case "ms":
        value = E.clip(value, pulseMin, pulseMax);
        analogWrite(pin, value / period, { freq });
        break;
      default:
        value = E.clip(value, valueMin, valueMax);
        analogWrite(pin, valueStart + valueStep * (value - valueMin), {
          freq,
        });
    }
  };
  servo(startAngle);
  return servo;
};
