export type Encoder = (callback: () => void) => void;
const BuildEncoder = (pin: Pin):Encoder => (callback) => {
  pin.mode("input");
  setWatch(callback, pin, {
    repeat: true,
    edge: "both",
    debounce: 10,
  });
};

export const RightEncoder = BuildEncoder(P10);
export const LeftEncoder = BuildEncoder(P11);
