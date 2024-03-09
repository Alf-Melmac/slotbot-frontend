import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {Stack, Title} from '@mantine/core';
import {T} from '../../components/T';
import {SearchControl} from './SearchControl';
import {JSX} from 'react';

export function Guilds(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.guilds');

	return (
		<Stack gap={'xl'} align={'center'} mt={'xl'}>
			<Title><T k={'guilds'}/></Title>

			<SearchControl big/>
		</Stack>
	);
}
