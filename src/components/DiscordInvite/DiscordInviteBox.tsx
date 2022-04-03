import {Box, createStyles} from "@mantine/core";
import React from "react";
import {DiscordJoinButton} from "./DiscordJoinButton";
import {DiscordGuildDetails} from "./DiscordGuildDetails";
import {ellipsis} from "../../contexts/CommonStylings";

const useStyles = createStyles((theme) => ({
	flex: {
		display: 'flex',
	},

	inviteBox: {
		backgroundColor: '#2f3136',
		borderRadius: 4,
		width: 432,
		padding: 16,
		userSelect: 'none',
	},

	header: {
		color: '#b9bbbe',
		fontSize: 12,
		lineHeight: '16px',
		textTransform: 'uppercase',
		margin: '0 0 12px 0',
		...ellipsis,
	},
}));

type DiscordInviteBoxProps = {
	inviteCode: string;
};

export function DiscordInviteBox(props: DiscordInviteBoxProps): JSX.Element {
	const {inviteCode} = props;

	function openInvite() {
		window.open(`https://discordapp.com/invite/${inviteCode}`, '_blank', 'noopener,noreferrer');
	}

	const {classes} = useStyles();

	return (
		<Box className={classes.inviteBox}>
			<h5 className={classes.header}>Du wurdest eingeladen, einem Server beizutreten</h5>
			<div className={classes.flex}>
				<DiscordGuildDetails inviteCode={inviteCode} openInvite={openInvite}/>
				<DiscordJoinButton openInvite={openInvite}/>
			</div>
		</Box>
	);
}
