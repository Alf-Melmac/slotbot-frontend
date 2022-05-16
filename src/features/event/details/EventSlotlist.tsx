import {EventDetailsSquadDto} from '../eventTypes';
import {Card, Center, createStyles, Grid, Text} from '@mantine/core';
import {Italic} from '../../../components/Text/Italic';
import {Bold} from '../../../components/Text/Bold';

const useStyles = createStyles((theme) => ({
	slotNumberWrapper: {
		flexBasis: '6%',
	},
	slotNumber: {
		float: 'right',
	},
}));

type EventSlotlistProps = {
	squadList: Array<EventDetailsSquadDto>
};

function getSlotText(text: string, blocked: boolean) {
	if (text) {
		return blocked ? <Italic>{text}</Italic> : <Text>{text}</Text>;
	}
	return <Bold>Freier Slot</Bold>;
}

export function EventSlotlist(props: EventSlotlistProps): JSX.Element {
	const {classes} = useStyles();
	return (
		<>
			{props.squadList.length === 0 && <Center><Text>Keine Slotliste vorhanden.</Text></Center>}

			{props.squadList.map((squad, squadIndex) => (
				<Card mb={'md'} key={squadIndex}>
					<Text pb={'xs'}>{squad.name}</Text>
					{squad.slotList.map((slot, slotIndex) => (
						<Grid key={slotIndex}>
							<Grid.Col py={4} className={classes.slotNumberWrapper}>
								<Text className={classes.slotNumber}>{slot.number}</Text>
							</Grid.Col>
							<Grid.Col span={5} py={4}>
								<Text>{slot.name}</Text>
							</Grid.Col>
							<Grid.Col span={6} py={4}>
								{getSlotText(slot.text, slot.blocked)}
							</Grid.Col>
						</Grid>
					))}
				</Card>
			))}
		</>
	);
}
