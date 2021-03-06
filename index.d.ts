// webpack hack
declare function __non_webpack_require__(s: string): any;

// Espruino missing typings
declare var Graphics: Graphics;
declare interface EspruinoI2C extends I2C {
  writeTo(address, ...data);
}
declare class Waveform {
  constructor(
    samples: number,
    opts?: { doubleBuffer?: boolean; bits?: 8 | 16 }
  );
  on(event: string, handler: (buf: Uint8Array) => void);
}
declare namespace E {
  const FFT: (arrReal: any, arrImage?: any, inverse?: boolean) => void;
}
// Iskra JS typings
declare const LED1: Pin;
declare const SDA: Pin;
declare const SCL: Pin;
declare const A0: Pin;
declare const A1: Pin;
declare const A2: Pin;

declare const P0: Pin;
declare const P1: Pin;
declare const P2: Pin;
declare const P3: Pin;
declare const P4: Pin;
declare const P5: Pin;
declare const P6: Pin;
declare const P7: Pin;
declare const P8: Pin;
declare const P9: Pin;
declare const P10: Pin;
declare const P11: Pin;
declare const PrimaryI2C: I2C;
declare const PrimarySerial: Serial;
