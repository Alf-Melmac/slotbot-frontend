import {createContext, Dispatch, JSX, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from 'react';
import {EventDetailsDto} from '../../../../features/event/eventTypes';

type EventDetailsSlotlist = {
	pendingSlotting: boolean;
	setPendingSlotting: Dispatch<SetStateAction<boolean>>;
	eventId: EventDetailsDto['id'];
};

export function EventDetailsSlotlistProvider(props: Readonly<PropsWithChildren<Pick<EventDetailsSlotlist, 'eventId'>>>): JSX.Element {
	const [pendingSlotting, setPendingSlotting] = useState(false);

	const value = useMemo((): EventDetailsSlotlist => ({pendingSlotting, setPendingSlotting, eventId: props.eventId}),
		[pendingSlotting, props.eventId]);
	return <EventDetailsSlotlistContext.Provider value={value}>
		{props.children}
	</EventDetailsSlotlistContext.Provider>;
}

const EventDetailsSlotlistContext = createContext({} as EventDetailsSlotlist);

export function useEventDetailsSlotlist(): EventDetailsSlotlist {
	return useContext(EventDetailsSlotlistContext);
}
