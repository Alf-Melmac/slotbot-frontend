import {
	ActionIcon,
	Container,
	createStyles,
	Group,
	Image,
	MantineStyleSystemProps,
	MediaQuery,
	Stack,
	Text,
} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitch, faTwitter, faWikipediaW, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../Text/AnchorBlank';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {ThemeSwitch} from '../ThemeSwitch';
import logo from './amb-256-256.png';

const iconTextShadow = '0 0 15px';
const useStyles = createStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	logo: {
		height: 27.9,
		width: 27.9,
	},

	title: {
		textTransform: 'uppercase',
		fontWeight: 700,
		letterSpacing: 1,
	},

	description: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
	},

	iconLink: {
		'&:hover': {
			transform: 'scale(1.2)',
		},
	},

	twitter: {
		color: '#1da1f2',
		filter: `drop-shadow(${iconTextShadow} #1da1f2)`,
	},
	youtube: {
		color: '#FF0000',
		filter: `drop-shadow(${iconTextShadow} #FF0000)`,
	},
	twitch: {
		color: '#9147ff',
		filter: `drop-shadow(${iconTextShadow} #9147ff)`,
	},
	wiki: {
		color: theme.colorScheme === 'dark' ? '#e6e6e6' : '#333333',
		filter: `drop-shadow(${iconTextShadow} ${theme.colorScheme === 'dark' ? '#e6e6e6' : '#333333'})`,
	},

	link: {
		fontSize: 13,
	},
}));

type FooterProps = {
	mt?: MantineStyleSystemProps['mt'];
};

type IconType = {
	icon: IconDefinition;
	href: string;
	iconClass: string;
}

export function PageFooter(props: FooterProps): JSX.Element {
	const {mt} = props;
	const {classes, cx} = useStyles();

	const icons: Array<IconType> = [
		{
			icon: faTwitter,
			href: 'https://twitter.com/ArmaMachtBock',
			iconClass: classes.twitter,
		},
		{
			icon: faYoutube,
			href: 'https://armamachtbock.de/youtube',
			iconClass: classes.youtube,
		},
		{
			icon: faTwitch,
			href: 'https://www.twitch.tv/ArmaMachtBock',
			iconClass: classes.twitch,
		},
		{
			icon: faWikipediaW,
			href: 'https://wiki.armamachtbock.de',
			iconClass: classes.wiki,
		},
	];

	return (
		<Container className={classes.container} py={40} mt={mt}>
			<Stack>
				<Group spacing={'xs'}>
					<MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
						<Image className={classes.logo} src={logo}/>
					</MediaQuery>
					<Text size={'lg'} className={classes.title}>Arma macht Bock</Text>
					<ThemeSwitch/>
				</Group>
				<Text size={'sm'} className={classes.description}>© 2022 Alf. All rights reserved.</Text>
			</Stack>
			<Stack spacing={'xs'}>
				<Group spacing={'xl'} position={'right'}>
					{icons.map((icon) =>
						<ActionIcon component={AnchorBlank} key={icon.icon.iconName}
									className={cx(classes.iconLink, icon.iconClass)} href={icon.href}>
							<FontAwesomeIcon icon={icon.icon} size={'lg'}/>
						</ActionIcon>,
					)}
				</Group>
				<Text size={'xs'}>
					<AnchorBlank className={classes.link} href={'https://wiki.armamachtbock.de/de/Impressum'}>
						Impressum & Datenschutzerklärung
					</AnchorBlank>
				</Text>
			</Stack>
		</Container>
	);
}
