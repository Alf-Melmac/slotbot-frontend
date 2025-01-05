import {createContext, JSX, PropsWithChildren, useContext, useMemo} from 'react';

export type EventAction = {
	editMode: boolean;
	ownerGuild?: string;
}

export function EventActionProvider(props: Readonly<PropsWithChildren<EventAction>>): JSX.Element {
	const {editMode, ownerGuild, children} = props;

	const contextValue = useMemo(() => {
		return {
			editMode: editMode,
			ownerGuild: ownerGuild,
		};
	}, [editMode, ownerGuild]);
	return <EventActionContext.Provider value={contextValue}>{children}</EventActionContext.Provider>;
}

const EventActionContext = createContext<EventAction | undefined>(undefined);

export function useEventAction(): EventAction {
	const context = useContext(EventActionContext);
	if (context === undefined) {
		throw new Error('useEventAction must be used within a EventActionProvider');
	}
	return context;
}
