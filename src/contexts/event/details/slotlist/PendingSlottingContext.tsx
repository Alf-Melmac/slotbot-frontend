import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from 'react';

type PendingSlotting = {
	pendingSlotting: boolean;
	setPendingSlotting: Dispatch<SetStateAction<boolean>>;
};

export function PendingSlottingProvider(props: PropsWithChildren): JSX.Element {
	const [pendingSlotting, setPendingSlotting] = useState(false);

	return <PendingSlottingContext.Provider value={{pendingSlotting, setPendingSlotting}}>
		{props.children}
	</PendingSlottingContext.Provider>;
}

const PendingSlottingContext = createContext({} as PendingSlotting);

export function usePendingSlotting(): PendingSlotting {
	return useContext(PendingSlottingContext);
}
