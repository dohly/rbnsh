type Subscription<TEvent> = (event?: TEvent) => void;
export class EventStream<TEvent> {
  private subscribers: Array<Subscription<TEvent>> = [];
  public subscribe = (s: Subscription<TEvent>) => this.subscribers.push(s);
  public unsubscribe = (s: Subscription<TEvent>) =>
    (this.subscribers = this.subscribers.filter((x) => x !== s));
  public publish = (e?: TEvent) => this.subscribers.forEach((x) => x(e));
}
