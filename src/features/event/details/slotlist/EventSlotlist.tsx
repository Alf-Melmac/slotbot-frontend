import {EventDetailsDto} from '../../eventTypes';
import {Card, Center, Group, Text} from '@mantine/core';
import {ReservedFor} from './ReservedFor';
import {Slot} from './Slot';
import {EventDetailsSlotlistProvider} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {JSX} from 'react';

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
					<Group noWrap spacing={1} pb={5}>
						<Text>{squad.name}</Text>
						<ReservedFor guild={squad.reservedFor}/>
					</Group>

					{squad.slotList.map((slot) => (
						<Slot key={slot.id} slot={slot}/>
					))}
				</Card>
			))}
		</EventDetailsSlotlistProvider>
	</>;
}
