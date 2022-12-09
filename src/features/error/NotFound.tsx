import {Stack} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {ErrorBackButton, ErrorDescription, ErrorLabel, ErrorTitle} from './ErrorPage';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';

export function NotFound(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.error.404');

	return (
		<Nav>
			<Stack spacing={'xl'} align={'center'} justify={'center'} pt={'10%'}>
				<ErrorLabel>404</ErrorLabel>
				<ErrorTitle title={'error.notFound.title'}/>
				<ErrorDescription description={'error.notFound.description'}/>
				<ErrorBackButton/>
			</Stack>
		</Nav>
	);
}
