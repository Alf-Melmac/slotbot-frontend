import {TextKey, useLanguage} from '../contexts/language/Language';
import {useDocumentTitle} from '@mantine/hooks';

/**
 * Sets the current translation for the given {@link TextKey} as document title
 *
 * @param key {@link TextKey} to translate and set as document title
 * @param translated `true` if translation should be completely skipped
 */
export function useTranslatedDocumentTitle(key: TextKey, translated: boolean = false) {
	const {t} = useLanguage();
	useDocumentTitle(translated ? key : t(key, {skipKey: true}));
}
