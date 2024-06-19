import {createContext, JSX, PropsWithChildren, useContext, useMemo} from 'react';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import en from 'dayjs/locale/en';
import {useTranslationMap} from './useTranslationMap';
import {TranslationFunction, TranslationOptions} from './TranslationTypes';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export type TextKey = string;

const DE: LanguageTag = 'de';
const EN: LanguageTag = 'en';
const availableLanguages: LanguageTag[] = [DE, EN];

export type LanguageTag = 'de' | 'en';

/**
 * Evaluates the {@link LanguageTag} by the users browser locale. Fallbacks to `EN`
 */
export function currentLanguageTag(): LanguageTag {
	const languageTag = navigator.language.substring(0, 2);
	return availableLanguages.find(v => v === languageTag) ?? EN;
}

export function isGerman(): boolean {
	return currentLanguageTag() === DE;
}

/**
 * Sets the root language attribute to the {@link currentLanguageTag}
 */
function setLocale(): void {
	const root = document.documentElement;
	root.setAttribute('lang', currentLanguageTag());
}

/**
 * Sets dayjs locale matching the {@link currentLanguageTag} and extends dayjs with plugins
 */
function currentDayJsLocale(): string {
	dayjs.extend(localizedFormat);
	dayjs.extend(utc);
	dayjs.extend(customParseFormat);
	dayjs.extend(isSameOrBefore)
	switch (currentLanguageTag()) {
		case DE:
			return dayjs.locale(de);
		case EN:
		default:
			return dayjs.locale(en);
	}
}

export function LanguageProvider(props: Readonly<PropsWithChildren>): JSX.Element {
	setLocale();
	currentDayJsLocale();
	const translationMap = useTranslationMap(currentLanguageTag());

	const translationFunction: TranslationFunction = (key: TextKey, options?: TranslationOptions): string => {
		const {args, count, countAsArgs = false, skipKey = false} = options ?? {};
		let translationKey = key;
		if (count !== undefined) {
			translationKey = count === 1 ? `${key}.singular` : `${key}.plural`;
		}

		let translation = translationMap[translationKey];
		if (translation === undefined) {
			console.error(`Text key ${translationKey} does not exist`);
			translation = skipKey ? '' : translationKey;
		}

		if (args || countAsArgs) {
			// @ts-ignore If args are undefined, we know count existent because otherwise countAsArgs wouldn't be truthy
			return resolvePlaceholders(translation, args ?? [count]);
		}
		return translation;
	};

	const languageContext = useMemo(() => ({t: translationFunction}), [translationMap]);
	return (
		<LanguageContext.Provider value={languageContext}>{props.children}</LanguageContext.Provider>
	);
}

/**
 * Replaces all placeholders {n} inside a translation with the arguments
 *
 * @param str translation with placeholders
 * @param args values to replace the placeholders with
 * @returns translation with replaced placeholders
 */
function resolvePlaceholders(str: string, args: (string | number)[]): string {
	let newString = str;
	args.forEach((arg, index) => {
		newString = newString.replace(`{${index}}`, arg.toString());
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
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
}
