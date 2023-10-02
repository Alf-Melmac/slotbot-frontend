import {createContext, PropsWithChildren, useContext} from 'react';
import {EventPageParams} from '../../features/event/EventRoutes';

const EventPageContext = createContext<string | undefined>(undefined);

export function EventPageProvider(props: PropsWithChildren<EventPageParams>): JSX.Element {
	return <EventPageContext.Provider value={props.eventId}>{props.children}</EventPageContext.Provider>;
}

export function useEventPage() {
	// This context can be used outside the provider, as mutations are specified at top level in components,
	// but the event wizard doesn't use them
	return useContext(EventPageContext);
}
