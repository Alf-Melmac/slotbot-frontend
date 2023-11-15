import {TextKey, useLanguage} from '../contexts/language/Language';
import {TranslationOptions} from '../contexts/language/TranslationTypes';
import {JSX} from 'react';

type TProps = {
	k: TextKey;
	args?: TranslationOptions['args'];
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
	const {k, args, count, countAsArgs} = props;
	const {t} = useLanguage();

	// @ts-ignore
	return <>{t(k, {args, count, countAsArgs})}</>;
}
