import {createContext, PropsWithChildren, useContext} from 'react';
import {EventFieldDefaultDto} from '../../features/event/eventTypes';

type FieldDefaults = {
	fieldDefaults: EventFieldDefaultDto[] | undefined;
}

export type FieldDefault = EventFieldDefaultDto | undefined;

export function EventFieldDefaultsProvider(props: PropsWithChildren<FieldDefaults>): JSX.Element {
	return <EventFieldDefaultsContext.Provider
		value={props.fieldDefaults}>{props.children}</EventFieldDefaultsContext.Provider>;
}

const EventFieldDefaultsContext = createContext<FieldDefaults['fieldDefaults']>(undefined);

export function useEventFieldDefaultsContext(title: string): FieldDefault {
	return useContext(EventFieldDefaultsContext)?.find(fieldDefault => fieldDefault.title === title);
}
