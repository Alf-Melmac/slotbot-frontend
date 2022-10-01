import {useDocumentTitle} from '@mantine/hooks';
import {Nav} from '../../components/nav/Nav';
import {createStyles, keyframes, Stack} from '@mantine/core';
import {ErrorBackButton, ErrorLabel, ErrorTitle} from './ErrorPage';

const alarmOn = keyframes({
	to: {
		backgroundColor: 'darkred',
	},
});

const useStyles = createStyles((theme) => ({
	alarm: {
		width: 60,
		height: 65,
		backgroundColor: theme.colors.red[9],
		borderRadius: '50px 50px 0 0',
		animation: `${alarmOn} 0.6s infinite`,
		position: 'relative',
		top: 75,
		zIndex: 1,

		[theme.fn.smallerThan('sm')]: {
			width: 30,
			height: 35,
			top: 50,
		},
	},
}));

export function NotAllowed(): JSX.Element {
	useDocumentTitle('403 - Nicht erlaubt');
	const {classes} = useStyles();

	return (
		<Nav>
			<Stack spacing={'xl'} align={'center'} justify={'center'} pt={'6%'}>
				<div className={classes.alarm}/>
				<ErrorLabel>403</ErrorLabel>
				<ErrorTitle>Hier darfst du leider nicht hin</ErrorTitle>
				<ErrorBackButton/>
			</Stack>
		</Nav>
	);
}
