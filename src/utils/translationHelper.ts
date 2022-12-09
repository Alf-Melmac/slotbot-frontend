import {useLanguage} from '../contexts/language/Language';

export function useTranslationIfPresent<T>(obj: T, keys: Array<keyof T>): void {
	const {t} = useLanguage();

	for (const key of keys) {
		if (obj[key] !== undefined) {
			// @ts-ignore Caller should know what he is doing
			obj[key] = t(obj[key]);
		}
	}
}
