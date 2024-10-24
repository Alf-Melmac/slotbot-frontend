import {JSX} from 'react';
import {TextKey, useLanguage} from '../contexts/language/Language';
import {TranslationOptions} from '../contexts/language/TranslationTypes';
import {Text} from '@mantine/core';

type TProps = {
	k: TextKey;
	args?: TranslationOptions['args'];
	/**
	 * Wraps the translation into a text element and sets the translation as html code
	 */
	html?: boolean;
} & (
	{
		count?: TranslationOptions['count'];
		countAsArgs?: never;
	}
	|
	{
		count: number;
		countAsArgs?: TranslationOptions['countAsArgs']
	}
	);

export function T(props: Readonly<TProps>): JSX.Element {
	const {k, args, count, countAsArgs, html} = props;
	const {t} = useLanguage();

	// @ts-ignore
	const text = t(k, {args, count, countAsArgs});
	return <>
		{html ?
			<Text dangerouslySetInnerHTML={{__html: text}}/>
			:
			text
		}
	</>;
}
