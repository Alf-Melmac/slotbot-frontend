import {Group, Image, MediaQuery, Text, useMantineTheme} from '@mantine/core';
import ambLogo from './amb-256-256.png';
import daaLogo from './daa-full-crop.gif';
import daaLogoTransparent from './daa-full-crop-transparent.gif';
import tttLogo from './ttt.png';
import tttLogoWhite from './ttt-white.png';
import defaultLogo from './slotbot-256-256.png';
import {getGuild, Guild} from '../../contexts/Theme';
import {UnstyledAnchorLink} from '../Text/UnstyledAnchorLink';
import {hidden} from '../../contexts/CommonStylings';
import {JSX} from 'react';

type LogoProps = {
	small?: boolean;
};

export function Logo(props: Readonly<LogoProps>): JSX.Element {
	const {small = false} = props;
	const {title, logo, logoWithName = false} = useGetInfo();
	return (
		<UnstyledAnchorLink to={'/events'}>
			<Group spacing={'xs'} noWrap>
				{!small &&
                    <MediaQuery smallerThan={'xs'} styles={hidden}>
                        <Image width={logoWithName ? 230 : 50} src={logo} alt={title} radius={'lg'}/>
                    </MediaQuery>
				}
				{(!logoWithName || small) &&
                    <Text size={'lg'} transform={'uppercase'} weight={700} lts={1}>{title}</Text>
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
	switch (getGuild()) {
		case Guild.AMB:
			return {
				title: 'Arma macht Bock',
				logo: ambLogo,
			};
		case Guild.DAA: {
			const theme = useMantineTheme();
			return {
				title: 'Deutsche Arma Allianz',
				logo: theme.colorScheme !== 'dark' ? daaLogo : daaLogoTransparent,
				logoWithName: true,
			};
		}
		case Guild.TTT:
			const theme = useMantineTheme();
			return {
				title: 'Tactical Training Team',
				logo: theme.colorScheme !== 'dark' ? tttLogo : tttLogoWhite,
				logoWithName: true,
			};
		case Guild.SLOTBOT:
		default:
			return {
				title: 'Slotbot',
				logo: defaultLogo,
			};
	}
}
