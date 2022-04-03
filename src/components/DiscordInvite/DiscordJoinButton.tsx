import {Box, createStyles} from "@mantine/core";
import React, {useState} from "react";
import {ellipsis} from "../../contexts/CommonStylings";

const useStyles = createStyles((theme) => ({
	guildJoin: {
		height: 40,
		padding: '0 20px',
		color: '#fff',
		backgroundColor: 'rgb(45, 125, 70)',
		border: 'none',
		borderRadius: 3,
		fontSize: 14,
		alignSelf: 'center',
		cursor: 'pointer',
		transition: 'background-color .17s ease',
		...ellipsis,

		'&:hover': {
			backgroundColor: 'rgb(33, 91, 50)',
		},
	},

	guildJoinText: {
		margin: '0 auto',
		...ellipsis,
	},
}));

type DiscordJoinButtonProps = {
	openInvite: () => void;
};

export function DiscordJoinButton(props: DiscordJoinButtonProps): JSX.Element {
	const [joined, setJoined] = useState(false);

	function handleJoin() {
		setJoined(true);
		props.openInvite();
	}

	const {classes} = useStyles();

	return (
		<Box component={"button"} className={classes.guildJoin} onClick={handleJoin}>
			<div className={classes.guildJoinText}>
				{joined ? 'Beigetreten' : 'Beitreten'}
			</div>
		</Box>
	);
}
