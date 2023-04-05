import Command from "../classes/bases/Command.js";
import cavalo from "./cavalo.js";
import meme from "./meme.js";
import next from "./next.js";
import pause from "./pause.js";
import ping from "./ping.js";
import play from "./play.js";
import queue from "./queue.js";
import shuffle from "./shuffle.js";
import unpause from "./unpause.js";

export default [
  ping,
  cavalo,
  play,
  next,
  pause,
  unpause,
  shuffle,
  queue,
  meme,
] as Command[];
