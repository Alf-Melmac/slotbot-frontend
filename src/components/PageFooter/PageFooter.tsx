import {ActionIcon, Container, createStyles, Group, Stack, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord, faTwitch, faTwitter, faWikipediaW, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../Text/AnchorBlank';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {ThemeSwitch} from '../ThemeSwitch';
import {Logo} from '../logo/Logo';
import {getGuild, Guild} from '../../contexts/Theme';
import {T} from '../T';
import {faCircleQuestion} from '@fortawesome/free-regular-svg-icons';

const iconTextShadow = '0 0 15px';
const useStyles = createStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
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
	discord: {
		color: '#5865f2',
		filter: `drop-shadow(${iconTextShadow} #5865f2)`,
	},

	link: {
		fontSize: 13,
	},
}));

type IconType = {
	icon: IconDefinition;
	href: string;
	iconClass: string;
}

export function PageFooter(): JSX.Element {
	const {classes, cx} = useStyles();

	let icons: IconType[];

	const guild = getGuild();
	switch (guild) {
		case Guild.AMB:
			icons = [
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
			break;
		case Guild.DAA:
			icons = [
				{
					icon: faTwitter,
					href: 'https://twitter.com/ArmaAllianz_DE',
					iconClass: classes.twitter,
				},
				{
					icon: faYoutube,
					href: 'https://www.youtube.com/channel/UC5rsoVq3vbqBwzBvpKyrueA',
					iconClass: classes.youtube,
				},
				{
					icon: faTwitch,
					href: 'https://www.twitch.tv/deutschearmaallianz',
					iconClass: classes.twitch,
				},
				{
					icon: faDiscord,
					href: 'https://discord.gg/utzmTBvu45',
					iconClass: classes.discord,
				},
			];
			break;
		case Guild.SLOTBOT:
		default:
			icons = [
				{
					icon: faWikipediaW,
					href: 'https://docs.slotbot.de',
					iconClass: classes.wiki,
				},
				{
					icon: faCircleQuestion,
					href: 'https://slotbot.de/support',
					iconClass: classes.wiki,
				},
			];
			break;
	}
	const impressum = guild === Guild.DAA ? 'https://www.deutsche-arma-allianz.de/impressum.html' : 'https://wiki.armamachtbock.de/de/Impressum';

	return (
		<Container className={classes.container} py={40}>
			<Stack>
				<Group spacing={'xs'}>
					<Logo small/>
					<ThemeSwitch/>
				</Group>
				<Text size={'sm'} className={classes.description}><T k={'footer.author'}/></Text>
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
					<AnchorBlank className={classes.link} href={impressum}><T k={'footer.legal'}/></AnchorBlank>
				</Text>
			</Stack>
		</Container>
	);
}
