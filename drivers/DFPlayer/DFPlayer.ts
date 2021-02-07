import { EventStream } from "../../SimpleEventStream";
import { Command } from "./Command";
import { EQ } from "./EQ";
import { Mode } from "./Mode";
import { Source } from "./Source";

//const toBytes = (value: number) => [getHighByte(value), getLowByte(value)];

const between = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const instruction = (cmd: Command, ack: boolean, p1: number, p2: number) => {
  const START_BYTE = 0x7e;
  const END_BYTE = 0xef;
  const VERSION_BYTE = 0xff;
  const DATA_LENGTH = 0x06;
  const highByte = (checksum: number) => checksum >> 8;
  const lowByte = (checksum: number) => checksum & 0xff;

  const checksum = -(
    VERSION_BYTE +
    DATA_LENGTH +
    cmd +
    (ack ? 1 : 0) +
    p1 +
    p2
  );
  return [
    START_BYTE,
    VERSION_BYTE,
    DATA_LENGTH,
    cmd,
    ack ? 1 : 0,
    p1,
    p2,
    highByte(checksum),
    lowByte(checksum),
    END_BYTE,
  ];
};
export class DFPlayer {
  private busyStream = new EventStream<any>();
  private busy = false;
  constructor(tx: Pin, rx: Pin, busyPin: Pin, private serial: Serial) {
    busyPin.mode("input");
    this.busyStream.subscribe(() => (this.busy = false));
    setWatch((x) => this.busyStream.publish(x), busyPin, {
      repeat: true,
      edge: "rising",
      debounceTime: 100,
    });
    let buffer: string = "";

    serial.setup(9600, { tx, rx });
    serial.on("data", (data) => {
      buffer += data;

      while (buffer.length >= 10) {
        const packet: any[] = buffer
          .slice(0, 10)
          .split("")
          .map((x) =>
            (256 + x.charCodeAt(0)).toString(16).substr(-2).toUpperCase()
          );
        buffer = buffer.slice(10);
        console.log("resp", packet.join(" "));
      }
    });
    setTimeout(() => serial.write(instruction(Command.Init, true, 0, 0)), 3000);
  }

  public run(command: Command, value: number = 0, p1: number = 0) {
    const payload = instruction(command, true, p1, value);
    console.log("req", payload.map((x) => x.toString(16)).join(" "));
    this.serial.write(payload);
  }

  playNext = () => this.run(Command.Next);
  playPrevious = () => this.run(Command.Previous);
  increaseVolume = () => this.run(Command.IncreaseVolume);
  decreaseVolume = () => this.run(Command.DecreaseVolume);
  volume = (volume: number) => {
    if (typeof volume !== "undefined") {
      this.run(Command.SetVolume, volume);
    } else {
      this.run(Command.QueryVolume);
    }
  };
  eq = (genre?: EQ) => {
    if (typeof genre !== "undefined") {
      this.run(Command.SetEQ, genre);
    } else {
      this.run(Command.QueryEQ);
    }
    this.run(Command.SetEQ, genre);
  };
  mode = (mode?: Mode) => {
    if (typeof mode !== "undefined") {
      this.run(Command.SetMode, mode);
    } else {
      this.run(Command.QueryMode);
    }
  };
  setSource = (source: Source) => this.run(Command.SetSource, source);
  standby = () => this.run(Command.Standby);
  resume = () => this.run(Command.Resume);
  reset = () => this.run(Command.Reset);

  play = (folder, track) =>
    new Promise<void>((resolve, reject) => {
      if (this.busy) {
        reject("DFPlayer is busy");
      } else {
        this.busy = true;
        this.busyStream.once(resolve);
        this.run(Command.SetFolder, track, folder);
      }
    });
  pause = () => this.run(Command.Pause);
  setPlaybackFolder = (folder: number) =>
    this.run(Command.SetFolder, between(folder, 1, 10));
  setGain = (gain: number) => {
    const g = Math.max(0, Math.min(31, gain));
    this.run(Command.SetGain, g);
  };
  setRepeat = (repeat: boolean = false) => {
    this.run(Command.RepeatPlay, Number(repeat));
  };
  getStatus = () => {
    this.run(Command.QueryStatus);
  };
  // getSoftwareVersion= () => run(Command.QuerySoftwareVersion),
  // getTotalFilesOnTFCard: () => run(Command.QueryTotalFilesOnTFCard),
  // getTotalFilesOnUDisk: () => run(Command.QueryTotalFilesOnUDisk),
  // getTotalFilesOnFlash: () => run(Command.QueryTotalFilesOnFlash),
  // getCurrentTrackOnTFCard: () => run(Command.QueryCurrentTrackOnTFCard),
  // getCurrentTrackOnUDisk: () => run(Command.QueryCurrentTrackOnUDisk),
  // getCurrentTrackOnFlash: () => run(Command.QueryCurrentTrackOnFlash),
}
