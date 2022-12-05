import {availableLanguageTags, LanguageTag} from './Language';
import {useEffect, useState} from 'react';

type TranslationMap = Record<string, string>;
type Translations = Record<LanguageTag, TranslationMap>;

/**
 * Returns the {@link TranslationMap} for the given {@link LanguageTag}
 */
export function useTranslationMap(languageTag: LanguageTag): TranslationMap | undefined {
	const [translations, setTranslations] = useState<Translations>();

	useEffect(() => {
		setTranslations(loadTranslationFiles());
	}, []);

	if (!translations) console.warn('undefinde'); //TODO delete
	return translations?.[languageTag];
}

/**
 * Loads all {@link Translations}
 */
function loadTranslationFiles(): Translations {
	console.warn('load'); //TODO delete
	const translationFiles = import.meta.glob('../../assets/locales/*/translation.json', {eager: true});

	let translations: Partial<Translations> = {};
	Object.keys(availableLanguageTags).forEach(locale => {
		// @ts-ignore
		translations[locale] = translationFiles[`../../assets/locales/${locale}/translation.json`].default;
	});

	return translations as Translations;
}
