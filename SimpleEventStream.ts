type Subscription<TEvent> = (event?: TEvent) => void;
export class EventStream<TEvent> {
  private previousTime: number;
  constructor(private debounceTime?: number) {}
  private subscribers: Array<Subscription<TEvent>> = [];
  public subscribe = (s: Subscription<TEvent>) => this.subscribers.push(s);
  public once = (s: Subscription<TEvent>) => {
    const wrapper = (x: TEvent) => {
      s(x);
      this.unsubscribe(wrapper);
    };
    this.subscribers.push(wrapper);
  };
  public unsubscribe = (s: Subscription<TEvent>) =>
    (this.subscribers = this.subscribers.filter((x) => x !== s));
  public publish = (e?: TEvent) => {
    if (this.debounceTime) {
      const time = getTime();
      const difference = this.previousTime
        ? time - this.previousTime
        : this.debounceTime;
      if (difference >= this.debounceTime) {
        this.previousTime = time;
        this.subscribers.forEach((x) => x(e));
      }
    } else {
      this.subscribers.forEach((x) => x(e));
    }
  };
}
