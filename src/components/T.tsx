import {TextKey, TranslationOptions, useLanguage} from '../contexts/language/Language';

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

export function T(props: TProps): JSX.Element {
	const {k, args, count, countAsArgs} = props;
	const {t} = useLanguage();

	// @ts-ignore
	return <>{t(k, {args, count, countAsArgs})}</>;
}
