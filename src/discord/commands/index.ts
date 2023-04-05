import Command from "../classes/bases/Command";
import cavalo from "./cavalo";
import meme from "./meme";
import next from "./next";
import pause from "./pause";
import ping from "./ping";
import play from "./play";
import queue from "./queue";
import shuffle from "./shuffle";
import unpause from "./unpause";

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
