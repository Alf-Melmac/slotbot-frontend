import {Group, Image, Text, useComputedColorScheme} from '@mantine/core';
import ambLogo from './amb-256-256.png';
import daaLogo from './daa-full-crop.gif';
import daaLogoTransparent from './daa-full-crop-transparent.gif';
import tttLogo from './slotbot_ttt-logo-black.png';
import tttLogoWinter from './slotbot_ttt-logo-winter-black.png';
import tttLogoWhite from './slotbot_ttt-logo-white.png';
import tttLogoWinterWhite from './slotbot_ttt-logo-winter-white.png';
import gtoLogo from './gto_unit_logo.png';
import defaultLogo from '/slotbot-256-256.png?url'; //NOSONAR typescript:S6859 - need the url import
import {Guild, useGetGuild} from '../../contexts/guildcontext/GuildContext';
import {UnstyledAnchorLink} from '../Text/UnstyledAnchorLink';
import {JSX} from 'react';
import {useHomeNavigationPath} from '../../features/home/useHomeNavigation';
import {useMediaQuery} from '@mantine/hooks';

type LogoProps = {
	small?: boolean;
};

export function Logo(props: Readonly<LogoProps>): JSX.Element {
	const {small = false} = props;
	const homePath = useHomeNavigationPath();
	const {title, logo, logoWithName = false} = useGetInfo();
	const isXs = useMediaQuery(`(max-width: 36em)`);
	return (
		<UnstyledAnchorLink to={homePath}>
			<Group gap={'xs'} wrap={'nowrap'}>
				{!small &&
                    <Image visibleFrom={'xs'} w={logoWithName ? 230 : 50} src={logo} alt={title} radius={'lg'}/>
				}
				{(!logoWithName || small || isXs) &&
                    <Text size={'lg'} tt={'uppercase'} fw={700} lts={1}>{title}</Text>
				}
			</Group>
		</UnstyledAnchorLink>
	);
}

type LogoInfo = {
	/**
	 * guild name
	 **/
	title: string;
	/**
	 * image path
	 **/
	logo: string;
	/**
	 * Does the logo include the guild name? If true title is hidden in navbar
	 * @default false
	 **/
	logoWithName?: boolean;
}

function useGetInfo(): LogoInfo {
	switch (useGetGuild()) {
		case Guild.AMB:
			return {
				title: 'Arma macht Bock',
				logo: ambLogo,
			};
		case Guild.DAA: {
			const colorScheme = useComputedColorScheme();
			return {
				title: 'Deutsche Arma Allianz',
				logo: colorScheme === 'dark' ? daaLogoTransparent : daaLogo,
				logoWithName: true,
			};
		}
		case Guild.TTT: {
			const colorScheme = useComputedColorScheme();
			const isWinter = isWinterSeason();
			return {
				title: 'Tactical Training Team',
				logo: colorScheme === 'dark'
					? isWinter ? tttLogoWinterWhite : tttLogoWhite
					: isWinter ? tttLogoWinter : tttLogo,
				logoWithName: true,
			};
		}
		case Guild.GTO: {
			return {
				title: 'German Tactical Ops',
				logo: gtoLogo,
			};
		}
		case Guild.SLOTBOT:
		default:
			return {
				title: 'Slotbot',
				logo: defaultLogo,
			};
	}
}

/**
 * Returns true if today is between November 24th and January 6th (inclusive)
 */
function isWinterSeason(): boolean {
	const today = new Date();
	const month = today.getMonth();
	const day = today.getDate();

	// Avoid creating two separate date objects and compare month and day directly
	return (month === 10 && day >= 24) || (month === 11) || (month === 0 && day <= 6);
}
