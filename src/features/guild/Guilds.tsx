import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {Stack, Title} from '@mantine/core';
import {T} from '../../components/T';
import {GuildsPage} from './GuildsPage';
import {SearchControl} from './SearchControl';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');

	return (
		<GuildsPage>
			<Stack spacing={'xl'} align={'center'} mt={'xl'}>
				<Title><T k={'guilds'}/></Title>

				<SearchControl big/>
			</Stack>
		</GuildsPage>
	);
}
