import {Box, Container, createStyles, MediaQuery, Overlay, Text, Title} from '@mantine/core';
import {SocialButtons} from './SocialButtons';
import {Scroller} from './Scroller';
import React from 'react';

const edgeDistanceX = 110;
const edgeDistanceY = 66;
const useStyles = createStyles((theme) => ({
	container: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingBottom: theme.spacing.xl * 6,
		zIndex: 1,
		position: 'relative',

		[theme.fn.smallerThan('sm')]: {
			paddingBottom: theme.spacing.xl * 3,
		},
	},

	title: {
		color: theme.white,
		fontSize: 60,
		fontWeight: 900,
		lineHeight: 1.1,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 50,
			lineHeight: 1.2,
		},

		[theme.fn.smallerThan('xs')]: {
			fontSize: 40,
		},
	},

	description: {
		color: theme.white,
		maxWidth: 600,
		lineHeight: '1.421',
		marginTop: '2.4rem',
		paddingLeft: '8rem',
		position: 'relative',

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
			fontSize: theme.fontSizes.md,
		},

		[theme.fn.smallerThan('xs')]: {
			paddingLeft: '4rem',
		},

		"&:before": {
			content: '""',
			display: 'block',
			width: '5rem',
			height: 1,
			background: theme.fn.linearGradient(45, theme.primaryColor, theme.colors.cyan[4]),
			position: 'absolute',
			left: 6,
			top: theme.fontSizes.md,

			[theme.fn.smallerThan('sm')]: {
				top: theme.fontSizes.xs,
			},

			[theme.fn.smallerThan('xs')]: {
				width: '2rem',
			},
		},
	},

	side: {
		listStyle: 'none',
		fontSize: theme.fontSizes.xl,
		lineHeight: 1.714,
		textTransform: 'uppercase',
		letterSpacing: '0.3rem',
		margin: 0,
		transform: 'translateY(-50%)',
		position: 'absolute',
		top: '50%',
		right: 0,
		cursor: 'pointer',

		[theme.fn.smallerThan('lg')]: {
			fontSize: theme.fontSizes.lg,
		},

		'li': {
			display: 'block',
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
			borderTop: '1px solid rgba(255, 255, 255, 0.05)',
			position: 'relative',

			'&:before': {
				content: '""',
				display: 'block',
				height: 6,
				width: 6,
				backgroundColor: theme.primaryColor,
				borderRadius: '50%',
				position: 'absolute',
				top: '33px',
				left: '20px',

				[theme.fn.smallerThan('lg')]: {
					top: '26px',
				},
			},

			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				borderTop: '1px solid rgba(0, 0, 0, 0.1)',
			},

			'a': {
				display: 'block',
				padding: '18px 120px 18px 40px',
				color: theme.white,

				[theme.fn.smallerThan('lg')]: {
					padding: '15px 60px 15px 40px',
				},

				'span': {
					display: 'block',
					fontSize: theme.fontSizes.lg,
					lineHeight: '1.6rem',
					color: 'rgba(255, 255, 255, 0.5)',
					textTransform: 'none',
					letterSpacing: 0,

					[theme.fn.smallerThan('lg')]: {
						fontSize: theme.fontSizes.md,
					},
				},
			},
		},
	},

	bottomLeft: {
		position: 'absolute',
		bottom: edgeDistanceY,
		left: edgeDistanceX,

		[theme.fn.smallerThan('md')]: {
			left: 'unset',
		},
	},

	bottomRight: {
		position: 'absolute',
		bottom: edgeDistanceY + 50,
		right: edgeDistanceX,
	},
}));

type HeaderProps = {
	scrollerAbout: () => void;
	scrollerEvents: () => void;
	scrollerDiscord: () => void;
};

/*Inspired by https://preview.colorlib.com/theme/transcend/*/
export function StartPageHeader(props: HeaderProps): JSX.Element {
	const {scrollerAbout, scrollerEvents, scrollerDiscord} = props;
	const {classes} = useStyles();


	return (
		<header style={{
			position: 'relative',
			backgroundImage: 'url(https://cdn.discordapp.com/attachments/819969938562220053/934588485648646214/ArmA_3_Screenshot_2022.01.23_-_00.16.14.22.png)',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'scroll',
		}}>
			<Overlay
				gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
				opacity={1}
				zIndex={0}
			/>
			<Container className={classes.container}>
				<Title className={classes.title}>Hallo Mitspieler, wir sind <br/> Arma macht Bock.</Title>
				<Text className={classes.description} size="xl" mt="xl">
					Dein nächster Schritt in Richtung Zeitvertreib und Gemeinschaft.
				</Text>
			</Container>

			<MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
				<ul className={classes.side}>
					<li><a onClick={scrollerAbout}>Über uns<span>wer wir sind</span></a></li>
					<li><a onClick={scrollerEvents}>Events<span>wann wir spielen</span></a></li>
					<li><a onClick={scrollerDiscord}>Discord<span>rede mit</span></a></li>
				</ul>
			</MediaQuery>

			<Box className={classes.bottomLeft}>
				<SocialButtons/>
			</Box>

			<MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
				<Box className={classes.bottomRight}>
					<Scroller onClick={scrollerAbout}/>
				</Box>
			</MediaQuery>
		</header>
	);
}
