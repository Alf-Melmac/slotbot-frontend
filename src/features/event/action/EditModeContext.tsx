import {createContext, PropsWithChildren, useContext} from 'react';

export type EditMode = {
	editMode: boolean;
}

export function EditModeProvider(props: PropsWithChildren & EditMode): JSX.Element {
	return <EditModeContext.Provider value={props.editMode}>{props.children}</EditModeContext.Provider>;
}

const EditModeContext = createContext(false);

export function useEditMode() {
	return useContext(EditModeContext);
}
