import {TextKey} from './Language';

export type TranslationOptions = {
	/**
	 * Placeholder replacements
	 */
	args?: (string | number)[];
	/**
	 * Return empty string instead of key if current translation isn't available
	 * @default false
	 */
	skipKey?: boolean;
} & (
	{
		/**
		 * If count is present, {@link TextKey} is appended with `.singular` if count is 1, otherwise `.plural`
		 */
		count?: number;
		countAsArgs?: never;
	}
	|
	{
		/**
		 * {@link TextKey} is appended with `.singular` if count is 1, otherwise `.plural`
		 */
		count: number;
		/**
		 * If no `args` are present, `count` is used as args
		 * @default false
		 */
		countAsArgs?: boolean;
	}
	);

export type TranslationFunction = (key: TextKey, options?: TranslationOptions) => string;
