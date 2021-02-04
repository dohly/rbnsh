// IskraJS pins
const tx = P1;
const rx = P0;
const serial = PrimarySerial;

const START_BYTE = 0x7E;
const END_BYTE = 0xEF;
const VERSION_BYTE = 0xFF;
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
    console.log(`Returned: 0x${parseByte(packet[3])}`);
    console.log(
      `Parameter: 0x${parseByte(packet[5])}, 0x${parseByte(packet[6])}`
    );
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
  serial.write(payload);
};

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

  play: (trackNumber?: number) => {
    if (typeof trackNumber !== "undefined") {
      run(Command.SetTrack, trackNumber);
    } else {
      run(Command.Play);
    }
  },
  pause: () => run(Command.Pause),
  setPlaybackFolder: (folder: number) => {
    const f = Math.max(1, Math.min(10, folder));
    run(Command.SetFolder, f);
  },
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
