import {createContext, JSX, PropsWithChildren, useContext} from 'react';

import {EventDetailDefaultDto} from '../../features/eventDetailsDefault/eventDetailsDefaultTypes';

type FieldDefaults = {
	fieldDefaults: EventDetailDefaultDto[] | undefined;
}

export type FieldDefault = EventDetailDefaultDto | undefined;

export function EventFieldDefaultsProvider(props: Readonly<PropsWithChildren<FieldDefaults>>): JSX.Element {
	return <EventFieldDefaultsContext.Provider
		value={props.fieldDefaults}>{props.children}</EventFieldDefaultsContext.Provider>;
}

const EventFieldDefaultsContext = createContext<FieldDefaults['fieldDefaults']>(undefined);

export function useEventFieldDefaultsContext(title: string): FieldDefault {
	return useContext(EventFieldDefaultsContext)?.find(fieldDefault => fieldDefault.title === title);
}
