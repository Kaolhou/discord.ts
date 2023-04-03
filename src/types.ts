import { Locale } from "discord.js";

export type LocaleResponses = Record<
  string,
  Partial<Record<Locale, string>> & { "en-US": string }
>;
