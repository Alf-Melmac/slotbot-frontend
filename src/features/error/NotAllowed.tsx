import {Nav} from '../../components/nav/Nav';
import {createStyles, keyframes, Stack} from '@mantine/core';
import {ErrorBackButton, ErrorLabel, ErrorTitle} from './ErrorPage';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';

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
	useTranslatedDocumentTitle('documentTitle.error.403');
	const {classes} = useStyles();

	return (
		<Nav>
			<Stack spacing={'xl'} align={'center'} justify={'center'} pt={'6%'}>
				<div className={classes.alarm}/>
				<ErrorLabel>403</ErrorLabel>
				<ErrorTitle title={'error.notAllowed'}/>
				<ErrorBackButton/>
			</Stack>
		</Nav>
	);
}
