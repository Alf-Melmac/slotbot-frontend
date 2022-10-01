import {Button, createStyles, Group, Text, Title} from '@mantine/core';
import {PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	label: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
		textShadow: `-3px -6px ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4]}`,
		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},

		textAlign: 'center',
		lineHeight: 1,
		userSelect: 'none',
		position: 'relative',
		zIndex: 2,
	},

	title: {
		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},
}));

export function ErrorLabel(props: PropsWithChildren): JSX.Element {
	const {classes} = useStyles();

	return <Text align={'center'} size={220} weight={900} mb={'xl'} className={classes.label}>{props.children}</Text>;
}

export function ErrorTitle(props: PropsWithChildren): JSX.Element {
	const {classes} = useStyles();

	return <Title align={'center'} size={38} className={classes.title}>{props.children}</Title>;
}

export function ErrorBackButton(): JSX.Element {
	return (
		<Group position={'center'}>
			<Button size={'lg'} variant={'outline'} component={Link} to={'/events'}>
				Zurück zum Kalender
			</Button>
		</Group>
	);
}
