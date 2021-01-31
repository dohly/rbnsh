export class Timer {
  private seconds = 0;
  private minutes = 0;
  private interval;
  constructor(private changed: (s: string) => void) {}

  private tick(increment: number) {
    this.seconds += increment;
    if (this.seconds > 59) {
      this.seconds = 0;
      this.minutes++;
    } else if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
    }
    this.changed(this.toString());
  }
  private toString() {
    const leadingZero = (v) => (v > 9 ? `${v}` : `0${v}`);
    return `${leadingZero(this.minutes)}:${leadingZero(this.seconds)}`;
  }

  public startUp() {
    if (!this.interval) {
      this.interval = setInterval(() => this.tick(1), 1000);
    }
  }

  public stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
