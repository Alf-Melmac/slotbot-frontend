import {createStyles, CSSObject, Skeleton, useMantineColorScheme} from "@mantine/core";
import React from "react";
import {useDiscordQuery} from "../../hooks/useDiscordQuery";
import {ellipsis} from "../../contexts/CommonStylings";

type ThemeObj = {
	getBackgroundImageUrl: () => string;
	dark: boolean;
}

const guildStat: CSSObject = {
	marginRight: 4,
	width: 8,
	height: 8,
	borderRadius: '50%',
};
const useStyles = createStyles((theme, {getBackgroundImageUrl, dark}: ThemeObj) => ({
	flexCenter: {
		display: 'flex',
		alignItems: 'center',
	},

	guildIcon: {
		backgroundImage: `url('${getBackgroundImageUrl()}')`,
		backgroundSize: '100% 100%',
		borderRadius: 15,
		width: 50,
		height: 50,
		marginRight: 16,
	},

	guildDetails: {
		display: 'flex',
		flex: '1 1 auto',
		flexFlow: 'column nowrap',
		justifyContent: 'center',
	},

	inviteDestination: {
		color: dark ? '#fff' : '#060607',
		fontSize: 16,
		fontWeight: 600,
		lineHeight: '20px',
		margin: '0 0 2px 0',
		...ellipsis,

		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},

	guildStats: {
		color: dark ? '#b9bbbe' : '#4f5660',
		fontSize: 14,
		fontWeight: 600,
		lineHeight: '16px',
		...ellipsis,
	},

	guildStatText: {
		color: dark ? '#b9bbbe' : '#4f5660',
		marginRight: 8,
		paddingBottom: 2,
		...ellipsis,
	},

	guildStatPresence: {
		backgroundColor: 'rgb(59, 165, 93)',
		...guildStat,
	},

	guildStatMembers: {
		backgroundColor: 'rgb(116, 127, 141)',
		...guildStat,
	},
}));

type DiscordGuildDetailsProps = {
	inviteCode: string;
	openInvite: () => void;
};

type Guild = {
	id: string;
	name: string;
	icon: string;
}
type DiscordInvite = {
	guild: Guild;
	approximate_member_count: number;
	approximate_presence_count: number;
}

export function DiscordGuildDetails(props: DiscordGuildDetailsProps): JSX.Element {
	const {inviteCode, openInvite} = props;

	const {result: discordInvite, isLoading} = useDiscordQuery<DiscordInvite>('/invites/' + inviteCode, {
		useSuspense: false,
		params: {with_counts: 'true'},
	});

	function backgroundImageUrl(): string {
		if (isLoading || !discordInvite) return '';
		return `https://cdn.discordapp.com/icons/${discordInvite?.guild.id}/${discordInvite?.guild.icon}.${discordInvite?.guild.icon.startsWith('a_') ? 'gif' : 'webp'}?size=56`;
	}

	const {colorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const {classes} = useStyles({getBackgroundImageUrl: backgroundImageUrl, dark: dark});

	return (
		<>
			<Skeleton visible={isLoading} width={50 + 16} radius={15}>
				<div className={classes.guildIcon}></div>
			</Skeleton>
			<div className={classes.guildDetails}>
				<Skeleton visible={isLoading} width={200}>
					<h3 className={classes.inviteDestination} onClick={openInvite}>
						<span>{discordInvite?.guild.name}</span>
					</h3>
					<strong className={classes.guildStats}>
						<div className={classes.flexCenter}>
							<i className={classes.guildStatPresence}></i>
							<span
								className={classes.guildStatText}>{discordInvite?.approximate_presence_count}&nbsp;online</span>
							<i className={classes.guildStatMembers}></i>
							<span
								className={classes.guildStatText}>{discordInvite?.approximate_member_count}&nbsp;Mitglieder</span>
						</div>
					</strong>
				</Skeleton>
			</div>
		</>
	);
}
