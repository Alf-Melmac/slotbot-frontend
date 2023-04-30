import {EventDetailsSquadDto} from '../../eventTypes';
import {Card, Center, Group, Text} from '@mantine/core';
import {ReservedFor} from './ReservedFor';
import {Slot} from './Slot';
import {PendingSlottingProvider} from '../../../../contexts/event/details/slotlist/PendingSlottingContext';

export type EventSlotlistProps = {
	squadList: Array<EventDetailsSquadDto>
};

/**
 * Displays the slotlist inside the event details
 */
export function EventSlotlist(props: EventSlotlistProps): JSX.Element {
	return <>
		{props.squadList.length === 0 && <Center><Text>Keine Slotliste vorhanden.</Text></Center>}

		<PendingSlottingProvider>
			{props.squadList.map((squad) => (
				<Card mb={'md'} key={squad.id}>
					<Group noWrap spacing={5} pb={5}>
						<Text>{squad.name}</Text>
						<ReservedFor guild={squad.reservedFor}/>
					</Group>

					{squad.slotList.map((slot) => (
						<Slot key={slot.id} slot={slot}/>
					))}
				</Card>
			))}
		</PendingSlottingProvider>
	</>;
}
