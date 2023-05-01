import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from 'react';
import {EventDetailsDto} from '../../../../features/event/eventTypes';

type EventDetailsSlotlist = {
	pendingSlotting: boolean;
	setPendingSlotting: Dispatch<SetStateAction<boolean>>;
	eventId: EventDetailsDto['id'];
};

export function EventDetailsSlotlistProvider(props: PropsWithChildren<Pick<EventDetailsSlotlist, 'eventId'>>): JSX.Element {
	const [pendingSlotting, setPendingSlotting] = useState(false);

	return <EventDetailsSlotlistContext.Provider value={{pendingSlotting, setPendingSlotting, eventId: props.eventId}}>
		{props.children}
	</EventDetailsSlotlistContext.Provider>;
}

const EventDetailsSlotlistContext = createContext({} as EventDetailsSlotlist);

export function useEventDetailsSlotlist(): EventDetailsSlotlist {
	return useContext(EventDetailsSlotlistContext);
}
