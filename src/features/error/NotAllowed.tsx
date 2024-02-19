import {Stack} from '@mantine/core';
import {ErrorBackButton, ErrorLabel, ErrorTitle} from './ErrorPage';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';
import {JSX} from 'react';
import classes from './NotAllowed.module.css';

export function NotAllowed(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.error.403');

	return (
		<Stack gap={'xl'} align={'center'} justify={'center'} pt={'10%'}>
			<div className={classes.alarm}/>
			<ErrorLabel>403</ErrorLabel>
			<ErrorTitle title={'error.notAllowed'}/>
			<ErrorBackButton/>
		</Stack>
	);
}
