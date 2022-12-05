import {createContext, PropsWithChildren, useContext} from 'react';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import en from 'dayjs/locale/en';
import {useTranslationMap} from './useTranslationMap';

export type TextKey = string;

export const availableLanguageTags: LanguageTags = {
	en: "en",
	de: "de",
};

type LanguageTagKeys = "de" | "en";
export type LanguageTag = keyof LanguageTags;
type LanguageTags = { [k in LanguageTagKeys]: LanguageTag };

/**
 * Evaluates the {@link LanguageTag} by the users browser locale. Fallbacks to {@link availableLanguageTags#en}
 */
function currentLanguageTag(): LanguageTag {
	const languageTag = navigator.language;
	// @ts-ignore Will check presence
	let language: LanguageTag = availableLanguageTags[languageTag];
	if (!language) {
		console.warn(`Language ${languageTag} not supported. Falllack to en`);
		language = availableLanguageTags.en;
	}
	return language;
}

/**
 * Sets the root language attribute to the {@link currentLanguageTag}
 */
function setLocale(): void {
	const root = document.documentElement;
	root.setAttribute("lang", currentLanguageTag());
}

/**
 * Sets dayjs locale matching the {@link currentLanguageTag}
 */
function currentDayJsLocale(): string {
	console.log('dayjs'); //TODO delete
	switch (currentLanguageTag()) {
		case availableLanguageTags.de:
			return dayjs.locale(de);
		case availableLanguageTags.en:
		default:
			return dayjs.locale(en);
	}
}

export type TranslationOptions = {
	args?: string[];
	skipKey?: boolean;
};
type TranslationFunction = (key: TextKey, options?: TranslationOptions) => string;

export function LanguageProvider(props: PropsWithChildren): JSX.Element {
	setLocale();
	currentDayJsLocale();
	const translationMap = useTranslationMap(currentLanguageTag());

	const translationFunction: TranslationFunction = (key: TextKey, options?: TranslationOptions): string => {
		const {args, skipKey = false} = options ?? {};
		if (translationMap === undefined) return skipKey ? '' : key;

		let translation = translationMap?.[key];
		if (!translation) {
			console.error(`Text key ${key} does not exist`);
			translation = skipKey ? '' : key;
		}

		if (args) {
			return resolvePlaceholders(translation, args);
		}
		return translation;
	};

	return (
		<LanguageContext.Provider value={{t: translationFunction}}>{props.children}</LanguageContext.Provider>
	);
}

/**
 * Replaces all placeholders {n} inside a translation with the arguments
 *
 * @param str translation with placeholders
 * @param args values to replace the placeholders with
 * @returns translation with replaced placeholders
 */
function resolvePlaceholders(str: string, args: string[]): string {
	let newString = str;
	args.forEach((arg, index) => {
		newString = newString.replace(`{${index}}`, arg);
	});
	return newString;
}

type LanguageContextValues = {
	/**
	 * function to resolve language key
	 */
	t: TranslationFunction;
};

const LanguageContext = createContext<LanguageContextValues | undefined>(undefined);

export function useLanguage(): LanguageContextValues {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
