import { EventStream } from "./SimpleEventStream";

export const HardwareEvents = {
    oledReady: new EventStream(),
    irCodes: new EventStream<any>(0.1)
  };
  