export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function replaceNullWithUndefined<T>(obj: T, keys: Array<keyof T>): T {
	return replaceNullWith(obj, keys, undefined);
}

export function replaceNullWithEmpty<T>(obj: T, keys: Array<keyof T>): T {
	return replaceNullWith(obj, keys, '');
}

function replaceNullWith<T>(obj: T, keys: Array<keyof T>, replacement: unknown): T {
	for (const key of keys) {
		if (obj[key] === null) {
			// @ts-ignore Caller should know what he is doing
			obj[key] = replacement;
		}
	}
	return obj;
}
