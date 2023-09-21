import Command from "../classes/base/Command";
import attack from "./attack.ts";
import config from "./config/index";
import meme from "./memes/index";
import ping from "./ping";
import termos from "./termos";

export const commands = [ping, meme, termos, config, attack] as Command[];
