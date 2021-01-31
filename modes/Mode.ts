import { HardwareEvents } from "../HardwareEvents";

export type Handlers = { [code: number]: () => void };
let currentMode: Handlers;
const onKeyReceived = (code: any) => {
  const h = currentMode[code];
  if (h) {
    h();
  }
};

export const Mode = (startMode: Handlers) => {
  currentMode = startMode;
  HardwareEvents.irCodes.unsubscribe(onKeyReceived);
  HardwareEvents.irCodes.subscribe(onKeyReceived);
};
