import type { LocaleString } from 'discord.js';
import pt from '../locales/pt-BR.json';
import en from '../locales/en-US.json';

type Json = { [key: string]: Json | string };

export class Locales {
	languages = new Map<LocaleString, Json>();

	constructor(data: [LocaleString, Json][]) {
		for (const lang of data) {
			this.languages.set(...lang);
		}
	}

	// recursively access keys from json object
	// return the value or undefined
	private findFromKeys(json: Json | string, keys: string[]) {
		let result = json;
		for (const key of keys) {
			if (result && typeof result === 'object' && key in result) {
				result = result[key];
			} else {
				return undefined;
			}
		}

		return typeof result != 'string' ? undefined : result;
	}

	//replace all %s for arguments
	parse(template: string, ...values: any[]) {
		values.forEach((value) => {
			template = template.replace('%s', String(value));
		});

		return template;
	}

	private getEnglish(keys: string[], ...args: any[]) {
		const parseIfNecessary = (argument: string) =>
			args.length ? this.parse(argument, args) : argument;

		const contentInEnglish =
			this.findFromKeys(this.languages.get('en-US')!, keys) ?? keys.join('.');

		return parseIfNecessary(contentInEnglish);
	}
	getAllButEnglish(data: string, ...args: any[]) {
		const result: Partial<Record<LocaleString, string>> = {};
		for (const lang of this.languages.keys()) {
			if (lang == 'en-US') continue;
			result[lang] = this.get(data, lang, ...args);
		}
		return result;
	}

	get(data: string, language: LocaleString, ...args: any[]) {
		console.debug(language);
		// idc for locales, only for language

		const keys = data.split('.');
		console.debug(language, keys);

		const parseIfNecessary = (data: string) => (args.length ? this.parse(data, args) : data);

		//check if preferred language is in language set
		if (this.languages.has(language)) {
			let data = this.languages.get(language) as Json | string;

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

export default new Locales([
	['pt-BR', pt],
	['en-US', en],
	['en-GB', en],
]);
