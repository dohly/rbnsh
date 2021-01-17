export type Encoder = (callback: () => void) => void;
export const BuildEncoder = (pin: Pin):Encoder => (callback) => {
  pin.mode("input");
  setWatch(callback, pin, {
    repeat: true,
    edge: "both",
    debounce: 10,
  });
};