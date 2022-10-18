import {createContext, PropsWithChildren, useContext} from 'react';
import {EventPageParams} from '../../features/event/EventRoutes';

export type EventPage = PropsWithChildren & EventPageParams;

export function EventPageProvider(props: EventPage): JSX.Element {
	return <EventPageContext.Provider value={props.eventId}>{props.children}</EventPageContext.Provider>;
}

const EventPageContext = createContext('');

export function useEventPage() {
	return useContext(EventPageContext);
}
