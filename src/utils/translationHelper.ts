import {useLanguage} from '../contexts/language/Language';

export function useTranslationIfPresent<T>(obj: T, keys: Array<keyof T>): T {
	const {t} = useLanguage();
	const newObj = structuredClone(obj);

	for (const key of keys) {
		if (newObj[key] !== undefined) {
			// @ts-ignore Caller should know what he is doing
			newObj[key] = t(newObj[key]);
		}
	}
	return newObj;
}
