import {createContext, JSX, PropsWithChildren, useContext, useState} from 'react';

export type AdditionalEventType = {
	additionalEventType: string | undefined;
	setAdditionalEventType: (additionalEventTypes: string) => void;
}

/**
 * Allows to save a newly created event type over multiple wizard pages
 */
export function AdditionalEventTypesProvider(props: Readonly<PropsWithChildren>): JSX.Element {
	const [additionalEventType, setAdditionalEventType] = useState<string | undefined>(undefined);

	return <AdditionalEventTypeContext.Provider value={{additionalEventType, setAdditionalEventType}}>
		{props.children}
	</AdditionalEventTypeContext.Provider>;
}

const AdditionalEventTypeContext = createContext<AdditionalEventType | undefined>(undefined);

export function useAdditionalEventType(): AdditionalEventType {
	const context = useContext(AdditionalEventTypeContext);
	if (context === undefined) {
		throw new Error('useAdditionalEventType must be used within a AdditionalEventTypeProvider');
	}
	return context;
}
