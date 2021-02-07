import { HardwareEvents } from "../HardwareEvents";

// IskraJS pins
const tx = P1;
const rx = P0;
const serial = PrimarySerial;

const START_BYTE = 0x7e;
const END_BYTE = 0xef;
const VERSION_BYTE = 0xff;
const DATA_LENGTH = 0x06;
const REQUEST_ACK = rx ? 0x01 : 0x00;

enum Command {
  Next = 1,
  Previous,
  SetTrack,
  IncreaseVolume,
  DecreaseVolume,
  SetVolume,
  SetEQ,
  SetMode,
  SetSource,
  Standby,
  Resume,
  Reset,
  Play,
  Pause,
  SetFolder,
  SetGain,
  RepeatPlay,
  QueryStatus = 66,
  QueryVolume,
  QueryEQ,
  QueryMode,
  QuerySoftwareVersion,
  QueryTotalFilesOnTFCard,
  QueryTotalFilesOnUDisk,
  QueryTotalFilesOnFlash,
  QueryCurrentTrackOnTFCard = 75,
  QueryCurrentTrackOnUDisk,
  QueryCurrentTrackOnFlash,
}

enum EQ {
  Normal,
  Pop,
  Rock,
  Jazz,
  Classic,
  Bass,
}

enum Mode {
  Repeat,
  FolderRepeat,
  SingleRepeat,
  Random,
}

enum Source {
  U,
  TF,
  AUX,
  Sleep,
  Flash,
}

let buffer: string = "";
let mp3timer;
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
    const byte1 = parseByte(packet[3]);
    console.log("resp", packet.join(" "));
    // console.log(
    //   `Returned: 0x${byte1} Parameter: 0x${parseByte(packet[5])}, 0x${parseByte(
    //     packet[6]
    //   )}`
    // );
    if (packet[3] == "3D" && !mp3timer) {
      mp3timer = setTimeout(() => {
        HardwareEvents.mp3Played.publish(packet[6]);
        clearTimeout(mp3timer);
        mp3timer = null;
      }, 150);
    }
  }
});

const parseByte = (byte: string) => {
  const value = parseInt(byte, 16);
  return `${byte} (${value})`;
};

const getHighByte = (checksum: number) => checksum >> 8;
const getLowByte = (checksum: number) => checksum & 0xff;
const toBytes = (value: number) => [getHighByte(value), getLowByte(value)];

const getChecksum = (command: Command, p1: number, p2: number) =>
  -(VERSION_BYTE + DATA_LENGTH + command + REQUEST_ACK + p1 + p2);

const run = (command: Command, value: number = 0) => {
  const [p1, p2] = toBytes(value);
  const checksum = getChecksum(command, p1, p2);
  const payload = [
    START_BYTE,
    VERSION_BYTE,
    DATA_LENGTH,
    command,
    REQUEST_ACK,
    p1,
    p2,
    getHighByte(checksum),
    getLowByte(checksum),
    END_BYTE,
  ];
  console.log("req", payload.map((x) => x.toString(16)).join(" "));
  serial.write(payload);
};

const runCmd = (command: Command, p1: number, p2: number, ack) => {
  const checksum = getChecksum(command, p1, p2);
  const payload = [
    START_BYTE,
    VERSION_BYTE,
    DATA_LENGTH,
    command,
    ack,
    p1,
    p2,
    getHighByte(checksum),
    getLowByte(checksum),
    END_BYTE,
  ];
  console.log("req", payload.map((x) => x.toString(16)).join(" "));
  serial.write(payload);
};
const between = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
export const mp3 = {
  playNext: () => run(Command.Next),
  playPrevious: () => run(Command.Previous),
  increaseVolume: () => run(Command.IncreaseVolume),
  decreaseVolume: () => run(Command.DecreaseVolume),
  volume: (volume: number) => {
    if (typeof volume !== "undefined") {
      run(Command.SetVolume, volume);
    } else {
      run(Command.QueryVolume);
    }
  },
  eq: (genre?: EQ) => {
    if (typeof genre !== "undefined") {
      run(Command.SetEQ, genre);
    } else {
      run(Command.QueryEQ);
    }
    run(Command.SetEQ, genre);
  },
  mode: (mode?: Mode) => {
    if (typeof mode !== "undefined") {
      run(Command.SetMode, mode);
    } else {
      run(Command.QueryMode);
    }
  },
  setSource: (source: Source) => run(Command.SetSource, source),
  standby: () => run(Command.Standby),
  resume: () => run(Command.Resume),
  reset: () => run(Command.Reset),

  play: (trackNumber?: number) =>
    new Promise<void>((resolve, _) => {
      HardwareEvents.mp3Played.once((x) => {
        if (x == trackNumber) {
          resolve();
        }
      });
      run(Command.SetTrack, trackNumber);
    }),
  pause: () => run(Command.Pause),
  setPlaybackFolder: (folder: number) =>
    run(Command.SetFolder, between(folder, 1, 10)),
  playFolder: (f, t) => runCmd(Command.SetFolder, f, t, 0),
  setGain: (gain: number) => {
    const g = Math.max(0, Math.min(31, gain));
    run(Command.SetGain, g);
  },
  setRepeat: (repeat: boolean = false) => {
    run(Command.RepeatPlay, Number(repeat));
  },
  getStatus: () => {
    run(Command.QueryStatus);
  },
  getSoftwareVersion: () => run(Command.QuerySoftwareVersion),
  getTotalFilesOnTFCard: () => run(Command.QueryTotalFilesOnTFCard),
  getTotalFilesOnUDisk: () => run(Command.QueryTotalFilesOnUDisk),
  getTotalFilesOnFlash: () => run(Command.QueryTotalFilesOnFlash),
  getCurrentTrackOnTFCard: () => run(Command.QueryCurrentTrackOnTFCard),
  getCurrentTrackOnUDisk: () => run(Command.QueryCurrentTrackOnUDisk),
  getCurrentTrackOnFlash: () => run(Command.QueryCurrentTrackOnFlash),
};
