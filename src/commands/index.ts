import Command from "../classes/base/Command";
import meme from "./meme";
import ping from "./ping";
import termos from "./termos";

export const commands = [ping, meme, termos] as Command[];
