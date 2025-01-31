import {ActionIcon, Container, Group, Stack, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord, faTwitch, faWikipediaW, faXTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {AnchorBlank} from '../Text/AnchorBlank';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {ThemeSwitch} from '../ThemeSwitch';
import {Logo} from '../logo/Logo';
import {Guild, useGetGuild} from '../../contexts/theme/Theme';
import {T} from '../T';
import {faCircleQuestion, faClipboard} from '@fortawesome/free-regular-svg-icons';
import {JSX} from 'react';
import cx from 'clsx';
import classes from './PageFooter.module.css';

type IconType = {
	icon: IconDefinition;
	href: string;
	iconClass: string;
}

export function PageFooter(): JSX.Element {
	let icons: IconType[];
	let publisher = 'https://docs.slotbot.de/policies/datenschutzerklarung';

	const guild = useGetGuild();
	switch (guild) {
		case Guild.AMB:
			icons = [
				{
					icon: faXTwitter,
					href: 'https://x.com/ArmaMachtBock',
					iconClass: classes.xTwitter,
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
					icon: faXTwitter,
					href: 'https://x.com/ArmaAllianz_DE',
					iconClass: classes.xTwitter,
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
			publisher = 'https://www.deutsche-arma-allianz.de/impressum.html';
			break;
		case Guild.TTT:
			icons = [
				{
					icon: faDiscord,
					href: 'https://discord.tacticalteam.de',
					iconClass: classes.discord,
				},
				{
					icon: faYoutube,
					href: 'https://www.youtube.com/tacticaltrainingteam',
					iconClass: classes.youtube,
				},
				{
					icon: faXTwitter,
					href: 'https://x.com/TTT_ArmA',
					iconClass: classes.xTwitter,
				},
				{
					icon: faWikipediaW,
					href: 'https://wiki.tacticalteam.de',
					iconClass: classes.wiki,
				},
			];
			publisher = 'https://www.tacticalteam.de/impressum';
			break;
		case Guild.GTO:
			icons = [
				{
					icon: faClipboard,
					href: 'https://mip.gto-kompanie.de/',
					iconClass: classes.wiki,
				},
				{
					icon: faDiscord,
					href: 'https://discord.gg/gCqkPWHrWj',
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

	return <Container className={classes.container} py={40}>
		<Stack>
			<Group gap={'xs'}>
				<Logo small/>
				<ThemeSwitch/>
			</Group>
			<Text size={'sm'} className={classes.description}><T k={'footer.author'}/></Text>
		</Stack>
		<Stack gap={'xs'}>
			<Group gap={'lg'} justify={'right'}>
				{icons.map((icon) =>
					<ActionIcon component={AnchorBlank} key={icon.icon.iconName}
								className={cx(classes.iconLink, icon.iconClass)} href={icon.href}>
						<FontAwesomeIcon icon={icon.icon} size={'lg'}/>
					</ActionIcon>,
				)}
			</Group>
			<Text size={'xs'}>
				<AnchorBlank className={classes.link} href={publisher}><T k={'footer.legal'}/></AnchorBlank>
			</Text>
		</Stack>
	</Container>;
}
