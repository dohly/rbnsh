const REPEAT_CODE = 1;

export enum KEY_CODES {
  POWER = 378130479,
  MINUS = 378134559,
  PLUS = 378132519,
  RED = 378077439,
  GREEN = 378126399,
  BLUE = 378110079,
  CROSS = 378114159,
  SQUARE = 378118239,
  TRIANGLE = 378093759,
  TOP_LEFT = 378097839,
  TOP = 378101919,
  TOP_RIGHT = 378099879,
  LEFT = 378081519,
  PLAY = 378091719,
  RIGHT = 378116199,
  BOTTOM_LEFT = 378083559,
  BOTTOM = 378124359,
  BOTTOM_RIGHT = 378085599,
  X = 378089679,
  Y = 378122319,
  Z = 378105999,
}

export const IR_Receiver = (
  pin: Pin,
  onReceive: (code: any, repeat: boolean) => void
) => {
  pin.mode("input_pullup");
  let currentCode = 0;
  let lastCode = 0;
  let timeout = null;
  const complete = () => {
    if (currentCode == 0) {
      return;
    } else if (currentCode === REPEAT_CODE) {
      onReceive(lastCode, true);
    } else {
      onReceive(currentCode, false);
      lastCode = currentCode;
    }
    currentCode = 0;
  };
  const dataHandler = (e: {
    lastTime: number;
    time: number;
    state: boolean;
  }) => {
    let dt = e.time - e.lastTime;
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (dt > 0.04) {
      complete();
    } else {
      currentCode = (currentCode << 1) | +(dt > 0.0008);
      timeout = setTimeout(() => {
        timeout = null;
        complete();
      }, 50);
    }
  };
  setWatch(dataHandler, pin, {
    repeat: true,
    edge: "falling",
  });
};
