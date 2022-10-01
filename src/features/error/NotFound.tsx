import {Button, createStyles, Group, Stack, Text, Title} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {useDocumentTitle} from '@mantine/hooks';
import {Link} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
	label: {
		lineHeight: 1,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},
	},

	title: {
		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
	},
}));

export function NotFound(): JSX.Element {
	useDocumentTitle('404 - Nicht gefunden');
	const {classes} = useStyles();

	return (
		<Nav>
			<Stack spacing={'xl'} align={'center'} justify={'center'} pt={'10%'}>
				<Text align={'center'} size={220} weight={900} mb={'xl'} className={classes.label}>404</Text>
				<Title align={'center'} size={38} weight={900} className={classes.title}>
					Irgendetwas stimmt hier nicht...
				</Title>
				<Text color={'dimmed'} size={'lg'} align={'center'} className={classes.description}>
					Die Seite, die du gerade zu öffnen versuchst, existiert nicht. Hast du dich bei der Adresse
					vertippt?
				</Text>
				<Group position={'center'}>
					<Button size={'lg'} variant={'outline'} component={Link} to={'/events'}>
						Zurück zum Kalender
					</Button>
				</Group>
			</Stack>
		</Nav>
	);
}
