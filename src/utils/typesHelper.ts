export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

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

/**
 * Replaces boolean strings ('true' and 'false') with their values at the given key.
 *
 * @param obj to update
 * @param key to replace the boolean strings in
 */
export function replaceBooleanStringWithBoolean<T>(obj: T, key: keyof T): T {
	if (obj[key] === 'true') {
		// @ts-ignore Caller should know what he is doing
		obj[key] = true;
	}
	if (obj[key] === 'false') {
		// @ts-ignore Caller should know what he is doing
		obj[key] = false;
	}
	return obj;
}
