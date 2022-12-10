import {availableLanguages, LanguageTag} from './Language';
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

	return translations?.[languageTag];
}

/**
 * Loads all {@link Translations}
 */
function loadTranslationFiles(): Translations {
	const translationFiles = import.meta.glob('../../assets/locales/*/translation.json', {eager: true});

	let translations: Partial<Translations> = {};
	availableLanguages.forEach(locale => {
		// @ts-ignore
		translations[locale] = translationFiles[`../../assets/locales/${locale}/translation.json`].default;
	});

	return translations as Translations;
}
