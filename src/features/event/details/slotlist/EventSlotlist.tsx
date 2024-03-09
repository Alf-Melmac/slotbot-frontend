import {EventDetailsDto} from '../../eventTypes';
import {Card, Center, Group, Text} from '@mantine/core';
import {ReservedFor} from './ReservedFor';
import {EventDetailsSlotlistProvider} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {JSX} from 'react';
import {Slots} from './Slots';

export type EventSlotlistProps = {
	squadList: EventDetailsDto['squadList'];
	eventId: EventDetailsDto['id'];
};

/**
 * Displays the slotlist inside the event details
 */
export function EventSlotlist(props: Readonly<EventSlotlistProps>): JSX.Element {
	return <>
		{props.squadList.length === 0 && <Center><Text>Keine Slotliste vorhanden.</Text></Center>}

		<EventDetailsSlotlistProvider eventId={props.eventId}>
			{props.squadList.map((squad) => (
				<Card mb={'md'} key={squad.id}>
					<Group wrap={'nowrap'} gap={1}>
						<Text>{squad.name}</Text>
						<ReservedFor guild={squad.reservedFor}/>
					</Group>

					<Slots slots={squad.slotList}/>
				</Card>
			))}
		</EventDetailsSlotlistProvider>
	</>;
}
