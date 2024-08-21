import type { LocaleString } from "discord.js";

type Json = { [key: string]: Json | string };

export default class Locales {
  languages = new Map<string, Json>();

  constructor(data: [string, Json][]) {
    for (const lang of data) {
      this.languages.set(...lang);
    }
  }

  // recursively access keys from json object
  // return the value or undefined
  private findFromKeys(json: Json | string, keys: string[]) {
    let result = json;
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return undefined;
      }
    }

    return typeof result != "string" ? undefined : result;
  }

  //replace all %s for arguments
  parse(template: string, ...values: any[]) {
    values.forEach((value) => {
      template = template.replace("%s", String(value));
    });

    return template;
  }

  private getEnglish(keys: string[], ...args: any[]) {
    const parseIfNecessary = (argument: string) =>
      args.length ? this.parse(argument, args) : argument;

    const contentInEnglish =
      this.findFromKeys(this.languages.get("en")!, keys) ?? keys.join(".");

    return parseIfNecessary(contentInEnglish);
  }

  get(data: string, language: LocaleString, ...args: any[]) {
    console.debug(language);
    // idc for locales, only for language
    const parsedPreferredLanguageName = language.split("-")[0];

    const keys = data.split(".");
    console.debug(parsedPreferredLanguageName, keys);

    const parseIfNecessary = (data: string) =>
      args.length ? this.parse(data, args) : data;

    //check if preferred language is in language set
    if (this.languages.has(parsedPreferredLanguageName)) {
      let data = this.languages.get(parsedPreferredLanguageName) as
        | Json
        | string;

      const dataPreferredLanguage = this.findFromKeys(data, keys);

      //if preferred language word is not available the code tries to find at least
      //in english, which is the main language
      if (!dataPreferredLanguage) return this.getEnglish(keys, ...args);

      return parseIfNecessary(dataPreferredLanguage);
    } else {
      return this.getEnglish(keys, ...args);
    }
  }
}
