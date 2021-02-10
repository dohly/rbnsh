import { StartMenu } from "./modes/StartMenu";
import { Phrazes } from "./voice/Phrazes";
import { sayPhraze } from "./voice/Say";

setTimeout(
  () =>
    sayPhraze(Phrazes.Hi)
      .then(() => sayPhraze(Phrazes.Sofia))
      .then(() => sayPhraze(Phrazes.Hi))
      .then(() => sayPhraze(Phrazes.Veronika))
      .then(() => sayPhraze(Phrazes.MainQuestion))
      .then(StartMenu),
  4000
);
