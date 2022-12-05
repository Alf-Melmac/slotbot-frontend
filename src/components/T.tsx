import {TextKey, TranslationOptions, useLanguage} from '../contexts/language/Language';

type TProps = {
	k: TextKey;
	args?: TranslationOptions['args'];
};

export function T(props: TProps): JSX.Element {
	const {k, args} = props;
	const {t} = useLanguage();

	return <>{t(k, {args})}</>;
}
