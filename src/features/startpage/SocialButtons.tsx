import {ActionIcon, createStyles, Group} from "@mantine/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTwitch, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {AnchorBlank} from '../../components/Text/AnchorBlank';

const useStyles = createStyles((theme) => ({
	social: {
		listStyle: 'none',
		fontSize: theme.fontSizes.sm,
		fontWeight: 'bold',
		color: theme.white,

		[theme.fn.smallerThan('lg')]: {
			left: 'unset',
		},

		'li': {
			display: 'inline-block',
		},
	},

	socialTitle: {
		paddingRight: '40px',
		marginRight: 20,
		position: 'relative',

		'&:after': {
			display: 'block',
			content: '""',
			width: '24px',
			height: '2px',
			backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
			position: 'absolute',
			right: 0,
			top: '50%',
		},
	},

	socialIcon: {
		color: theme.colors.gray[0],
	},
}));

type SocialType = {
	icon: IconDefinition;
	href: string;
}

export function SocialButtons(): JSX.Element {
	const {classes} = useStyles();

	const socials: Array<SocialType> = [
		{
			icon: faDiscord,
			href: 'https://armamachtbock.de/discord',
		},
		{
			icon: faTwitter,
			href: 'https://twitter.com/ArmaMachtBock',
		},
		{
			icon: faYoutube,
			href: 'https://armamachtbock.de/youtube',
		},
		{
			icon: faTwitch,
			href: 'https://www.twitch.tv/ArmaMachtBock',
		},
	];

	return (
		<ul className={classes.social}>
			<li className={classes.socialTitle}>Folge uns</li>
			<li>
				<Group>
					{socials.map((social) =>
						<ActionIcon component={AnchorBlank} key={social.icon.iconName} href={social.href}>
							<FontAwesomeIcon icon={social.icon} className={classes.socialIcon} size={'lg'}/>
						</ActionIcon>,
					)}
				</Group>
			</li>
		</ul>
	);
}
