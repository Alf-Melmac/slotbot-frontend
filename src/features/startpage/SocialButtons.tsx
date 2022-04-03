import {ActionIcon, createStyles, Group} from "@mantine/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTwitch, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

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
			backgroundColor: 'rgba(255,255,255,0.1)',
			position: 'absolute',
			right: 0,
			top: '50%',
		},
	},
}));

export function SocialButtons(): JSX.Element {
	const {classes} = useStyles();

	return (
		<ul className={classes.social}>
			<li className={classes.socialTitle}>Folge uns</li>
			<li>
				<Group>
					<ActionIcon component={'a'} target={'_blank'} rel={'noopener noreferrer'}
								href={"https://armamachtbock.de/discord"}>
						<FontAwesomeIcon icon={faDiscord} size={"lg"}/>
					</ActionIcon>
					<ActionIcon component={'a'} target={'_blank'} rel={'noopener noreferrer'}
								href={"https://twitter.com/ArmaMachtBock"}>
						<FontAwesomeIcon icon={faTwitter} size={"lg"}/>
					</ActionIcon>
					<ActionIcon component={'a'} target={'_blank'} rel={'noopener noreferrer'}
								href={"https://armamachtbock.de/youtube"}>
						<FontAwesomeIcon icon={faYoutube} size={"lg"}/>
					</ActionIcon>
					<ActionIcon component={'a'} target={'_blank'} rel={'noopener noreferrer'}
								href={"https://www.twitch.tv/ArmaMachtBock"}>
						<FontAwesomeIcon icon={faTwitch} size={"lg"}/>
					</ActionIcon>
				</Group>
			</li>
		</ul>
	);
}
