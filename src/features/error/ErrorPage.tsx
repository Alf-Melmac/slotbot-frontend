import {Button, Group, Stack, Text} from '@mantine/core';
import {JSX, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import {T} from '../../components/T';
import {TextKey} from '../../contexts/language/Language';
import {Bold} from '../../components/Text/Bold';
import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';
import classes from './ErrorPage.module.css';
import {useGuildContext} from '../../contexts/guildcontext/GuildContext';

export function ErrorPage(props: Readonly<PropsWithChildren<{ documentTitle: TextKey }>>): JSX.Element {
	useTranslatedDocumentTitle(props.documentTitle);

	return (
		<Stack gap={'lg'} align={'center'} justify={'center'} pt={'10%'}>
			{props.children}
		</Stack>
	);
}

ErrorPage.Label = function ErrorLabel(props: Readonly<PropsWithChildren>): JSX.Element {
	return <Text ta={'center'} fw={900} ff={'sans-serif'} mb={'xl'} className={classes.label}>{props.children}</Text>;
}

ErrorPage.Title = function ErrorTitle(props: Readonly<{ title: TextKey }>): JSX.Element {
	return <Bold ta={'center'} className={classes.title}><T k={props.title}/></Bold>;
}

ErrorPage.Description = function ErrorDescription(props: Readonly<{ description: TextKey }>): JSX.Element {
	return <Text c={'dimmed'} size={'lg'} ta={'center'} className={classes.description}>
		<T k={props.description}/>
	</Text>;
}

ErrorPage.BackButton = function ErrorBackButton(): JSX.Element {
	const {guildUrlPath} = useGuildContext();
	return (
		<Group justify={'center'}>
			<Button size={'lg'} variant={'outline'} component={Link} to={`/events/calendar${guildUrlPath}`}>
				<T k={'navigation.backToCalendar'}/>
			</Button>
		</Group>
	);
}
