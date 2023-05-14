import {Stack} from '@mantine/core';
import {ErrorBackButton, ErrorDescription, ErrorLabel, ErrorTitle} from './ErrorPage';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';

export function NotFound(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.error.404');

	return (
		<Stack spacing={'xl'} align={'center'} justify={'center'} pt={'15%'}>
			<ErrorLabel>404</ErrorLabel>
			<ErrorTitle title={'error.notFound.title'}/>
			<ErrorDescription description={'error.notFound.description'}/>
			<ErrorBackButton/>
		</Stack>
	);
}
