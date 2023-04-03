import Command from "../classes/bases/Command";
import cavalo from "./cavalo";
import ping from "./ping";
import play from "./play";

export default [ping, cavalo, play] as Command[];
