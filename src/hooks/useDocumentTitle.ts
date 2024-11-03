import {TextKey, useLanguage} from '../contexts/language/Language';
import {useDocumentTitle} from '@mantine/hooks';
import {TranslationOptions} from '../contexts/language/TranslationTypes';
import {useState} from 'react';

/**
 * Sets the current translation for the given {@link TextKey} as document title
 *
 * @param key {@link TextKey} to translate and set as document title
 * @param args placeholder arguments
 * @param translated `true` if translation should be completely skipped
 */
export function useTranslatedDocumentTitle(key: TextKey, args?: TranslationOptions['args'], translated: boolean = false) {
	const {t} = useLanguage();
	useDocumentTitle(translated ? key : t(key, {args, skipKey: true}));
}

/**
 * Supports dynamic document titles. The specified title key will be used to set the document title.
 * The title can be overridden by calling the returned function.
 *
 * @param titleKey document title
 */
export function useDynamicDocumentTitle(titleKey: TextKey) {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t(titleKey));
	useDocumentTitle(title);
	return setTitle;
}

/**
 * Supports dynamic document titles. The specified title key will be used to set the document title.
 * By default, the specified default key is inserted, this value can be changed using the returned function.
 *
 * @param titleKey with placeholder to be set as the document title
 * @param defaultText default placeholder value for the `titleKey`
 */
export function useDynamicDocumentTitleForItem(titleKey: TextKey, defaultText: TextKey) {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t(defaultText));
	useTranslatedDocumentTitle(titleKey, [title]);
	return setTitle;
}
