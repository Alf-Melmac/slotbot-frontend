import {EventDetailsSquadDto, GuildDto} from '../eventTypes';
import {Card, Center, createStyles, Grid, Group, Image, Text, useMantineTheme} from '@mantine/core';
import {Italic} from '../../../components/Text/Italic';
import {Bold} from '../../../components/Text/Bold';
import {T} from '../../../components/T';

const useStyles = createStyles(() => ({
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

function getSlotText(text: string, blocked: boolean): JSX.Element {
	if (text) {
		return blocked ? <Italic>{text}</Italic> : <Text>{text}</Text>;
	}
	return <Bold><T k={'event.details.emptySlot'}/></Bold>;
}

export function EventSlotlist(props: EventSlotlistProps): JSX.Element {
	const {classes} = useStyles();

	const theme = useMantineTheme();

	function getReservedFor(reservedFor: GuildDto): JSX.Element {
		if (reservedFor) {
			if (reservedFor.emojiUrl) {
				return <Image src={reservedFor.emojiUrl}
							  title={reservedFor.groupIdentifier}
							  alt={reservedFor.groupIdentifier}
							  placeholder={<Text align={'center'}>{reservedFor.groupIdentifier}</Text>}
							  width={theme.fontSizes.md}/>;
			}
			return <Text>[{reservedFor.groupIdentifier}]</Text>;
		}
		return <></>;
	}

	return (
		<>
			{props.squadList.length === 0 && <Center><Text>Keine Slotliste vorhanden.</Text></Center>}

			{props.squadList.map((squad, squadIndex) => (
				<Card mb={'md'} key={squadIndex}>
					<Group noWrap spacing={5} pb={'xs'}>
						<Text>{squad.name}</Text>
						{getReservedFor(squad.reservedFor)}
					</Group>

					{squad.slotList.map((slot, slotIndex) => (
						<Grid key={slotIndex}>
							<Grid.Col py={4} className={classes.slotNumberWrapper}>
								<Text className={classes.slotNumber}>{slot.number}</Text>
							</Grid.Col>
							<Grid.Col span={5} py={4}>
								<Group noWrap spacing={5}>
									<Text>{slot.name}</Text>
									{getReservedFor(slot.reservedFor)}
								</Group>
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
