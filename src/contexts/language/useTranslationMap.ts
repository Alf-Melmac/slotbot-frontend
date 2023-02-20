import {LanguageTag} from './Language';

type TranslationMap = Record<string, string>;

/**
 * Returns the {@link TranslationMap} for the given {@link LanguageTag}
 */
export function useTranslationMap(languageTag: LanguageTag): TranslationMap {
	const translationFiles = import.meta.glob('../../assets/locales/*/translation.json', {eager: true});
	// @ts-ignore
	return translationFiles[`../../assets/locales/${languageTag}/translation.json`].default;
}
