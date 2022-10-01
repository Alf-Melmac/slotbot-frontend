import {createStyles, Stack, Text} from '@mantine/core';
import {Nav} from '../../components/nav/Nav';
import {useDocumentTitle} from '@mantine/hooks';
import {ErrorBackButton, ErrorLabel, ErrorTitle} from './ErrorPage';

const useStyles = createStyles(() => ({
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
				<ErrorLabel>404</ErrorLabel>
				<ErrorTitle>Irgendetwas stimmt hier nicht...</ErrorTitle>
				<Text color={'dimmed'} size={'lg'} align={'center'} className={classes.description}>
					Die Seite, die du gerade zu öffnen versuchst, existiert nicht. Hast du dich bei der Adresse
					vertippt?
				</Text>
				<ErrorBackButton/>
			</Stack>
		</Nav>
	);
}
