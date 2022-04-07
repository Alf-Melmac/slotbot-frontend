import {Box, createStyles, useMantineColorScheme} from "@mantine/core";
import React from "react";
import {DiscordJoinButton} from "./DiscordJoinButton";
import {DiscordGuildDetails} from "./DiscordGuildDetails";
import {ellipsis} from "../../contexts/CommonStylings";

const useStyles = createStyles((theme, dark: boolean) => ({
	flex: {
		display: 'flex',
	},

	inviteBox: {
		backgroundColor: dark ? '#2f3136' : '#f2f3f5',
		borderRadius: 4,
		width: 432,
		maxWidth: '100%',
		padding: 16,
		userSelect: 'none',
	},

	header: {
		color: dark ? '#b9bbbe' : '#4f5660',
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

	const {colorScheme} = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	const {classes} = useStyles(dark);

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
