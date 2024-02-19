import { Button, Group, Text } from '@mantine/core';
import {JSX, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import {T} from '../../components/T';
import {TextKey} from '../../contexts/language/Language';
import {Bold} from '../../components/Text/Bold';
import classes from './ErrorPage.module.css'

export function ErrorLabel(props: Readonly<PropsWithChildren>): JSX.Element {
    return <Text ta={'center'} fz={220} fw={900} ff={'sans-serif'} mb={'xl'} className={classes.label}>{props.children}</Text>;
}

export function ErrorTitle(props: Readonly<{ title: TextKey }>): JSX.Element {
    return <Bold ta={'center'} fz={38} className={classes.title}><T k={props.title}/></Bold>;
}

export function ErrorDescription(props: Readonly<{ description: TextKey }>): JSX.Element {
    return <Text c={'dimmed'} size={'lg'} ta={'center'} className={classes.description}>
		<T k={props.description}/>
	</Text>;
}

export function ErrorBackButton(): JSX.Element {
	return (
		<Group justify={'center'}>
			<Button size={'lg'} variant={'outline'} component={Link} to={'/events'}>
				<T k={'navigation.backToCalendar'}/>
			</Button>
		</Group>
	);
}
