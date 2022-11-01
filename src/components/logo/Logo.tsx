import {createStyles, Group, Image, MediaQuery, Text} from '@mantine/core';
import ambLogo from './amb-256-256.png';
import daaLogo from './daa-full-crop-transparent.gif';
import defaultLogo from './slotbot-256-256.png';
import {getGuild, Guild} from '../../contexts/Theme';

const useStyles = createStyles(() => ({
	title: {
		letterSpacing: 1,
	},
}));

type LogoProps = {
	small?: boolean;
};

export function Logo(props: LogoProps): JSX.Element {
	const {small = false} = props;
	const {classes} = useStyles();
	const {title, logo, logoWithName = false} = getInfo();
	const width = logoWithName ? small ? 100 : 228 : small ? 27.9 : 70;

	return (
		<Group spacing={'xs'} noWrap>
			{!small &&
                <MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
                    <Image width={width} src={logo} alt={title}/>
                </MediaQuery>
			}
			{(!logoWithName || small) &&
                <Text size={'lg'} transform={'uppercase'} weight={700} className={classes.title}>{title}</Text>
			}
		</Group>
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

function getInfo(): LogoInfo {
	switch (getGuild()) {
		case Guild.DAA:
			return {
				title: 'Deutsche Arma Allianz',
				logo: daaLogo,
				logoWithName: true,
			};
		case Guild.AMB:
			return {
				title: 'Arma macht Bock',
				logo: ambLogo,
			};
		case Guild.SLOTBOT:
		default:
			return {
				title: 'Slotbot',
				logo: defaultLogo,
			};
	}
}
