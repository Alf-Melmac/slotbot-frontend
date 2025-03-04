import {Group, Image, Text, useComputedColorScheme} from '@mantine/core';
import ambLogo from './amb-256-256.png';
import daaLogo from './daa-full-crop.gif';
import daaLogoTransparent from './daa-full-crop-transparent.gif';
import tttLogo from './slotbot_ttt-logo-black.png';
import tttLogoWhite from './slotbot_ttt-logo-white.png';
import gtoLogo from './gto_unit_logo.png';
import defaultLogo from './slotbot-256-256.png';
import {Guild, useGetGuild} from '../../contexts/theme/Theme';
import {UnstyledAnchorLink} from '../Text/UnstyledAnchorLink';
import {JSX} from 'react';
import {useHomeNavigationPath} from '../../features/home/useHomeNavigation';

type LogoProps = {
	small?: boolean;
};

export function Logo(props: Readonly<LogoProps>): JSX.Element {
	const {small = false} = props;
	const homePath = useHomeNavigationPath();
	const {title, logo, logoWithName = false} = useGetInfo();
	return (
		<UnstyledAnchorLink to={homePath}>
			<Group gap={'xs'} wrap={'nowrap'}>
				{!small &&
                    <Image visibleFrom={'xs'} w={logoWithName ? 230 : 50} src={logo} alt={title} radius={'lg'}/>
				}
				{(!logoWithName || small) &&
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
				logo: colorScheme !== 'dark' ? daaLogo : daaLogoTransparent,
				logoWithName: true,
			};
		}
		case Guild.TTT: {
			const colorScheme = useComputedColorScheme();
			return {
				title: 'Tactical Training Team',
				logo: colorScheme !== 'dark' ? tttLogo : tttLogoWhite,
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
