const REPEAT_CODE = 1;
export const IR_Receiver = (
  pin: Pin,
  onReceive: (code: any, keepedPressed: boolean) => void
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
