export type Motor = (speed: number) => void;

const Motor = (pwmPin: Pin, phasePin: Pin, freq: number): Motor => {
  phasePin.mode("output");
  pwmPin.mode("output");
  analogWrite(pwmPin, 0, { freq });
  return (speed: number) => {
    phasePin.write(speed > 0);
    analogWrite(pwmPin, E.clip(Math.abs(speed), 0, 1), null);
  };
};

export const M1 = Motor(P5, P4, 100);
export const M2 = Motor(P6, P7, 100);
