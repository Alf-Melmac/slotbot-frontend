import {createContext, PropsWithChildren, useContext} from 'react';
import {EventPageParams} from '../../features/event/EventRoutes';

export function EventPageProvider(props: PropsWithChildren<EventPageParams>): JSX.Element {
	return <EventPageContext.Provider value={props.eventId}>{props.children}</EventPageContext.Provider>;
}

const EventPageContext = createContext('');

export function useEventPage() {
	return useContext(EventPageContext);
}
