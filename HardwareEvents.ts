import { EventStream } from "./SimpleEventStream";

export const HardwareEvents = {
    oledReady: new EventStream(),
    irCodes: new EventStream<any>(),
    leftWheelDone: new EventStream<number>(),
    rightWheelDone: new EventStream<number>(),
  };
  