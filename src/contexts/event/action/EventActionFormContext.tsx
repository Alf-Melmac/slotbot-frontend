import {EventEditDto, EventPostDto} from '../../../features/event/eventTypes';
import {createFormContext} from '@mantine/form';
import {EditModeProvider, useEditMode} from './EditModeContext';
import {EventPageProvider} from '../EventPageContext';
import {EventPageParams} from '../../../features/event/EventRoutes';
import {JSX, PropsWithChildren} from 'react';

export type EventEditFormType = Omit<EventEditDto, 'dateTime' | 'canRevokeShareable' | 'canUploadSlotlist'>
	& { date: Date, startTime: string };

type EventWizardFormType = Omit<EventPostDto, 'dateTime'>
	& { date: Date, startTime: string };

export type EventActionFormType = EventEditFormType | EventWizardFormType;

const [EventEditFormProvider, useEventEditFormContext, useEventEditForm] = createFormContext<EventEditFormType>();
const [EventWizardFormProvider, useEventWizardFormContext, useEventWizardForm] = createFormContext<EventWizardFormType>();
export {useEventEditForm, useEventWizardForm};

type EventEditFormReturn = ReturnType<typeof useEventEditFormContext>;
type EventWizardFormReturn = ReturnType<typeof useEventWizardFormContext>;
export type EventActionFormReturn = EventEditFormReturn | EventWizardFormReturn;

type EventEditProviderProps = {
	form: ReturnType<typeof useEventEditForm>;
} & Pick<EventPageParams, 'eventId'>;

export function EventEditProvider(props: Readonly<PropsWithChildren<EventEditProviderProps>>): JSX.Element {
	const {eventId, children, ...formProps} = props;
	return (
		<EventPageProvider eventId={eventId}>
			<EditModeProvider editMode={true}>
				<EventEditFormProvider {...formProps}>{children}</EventEditFormProvider>
			</EditModeProvider>
		</EventPageProvider>
	);
}

type EventWizardProviderProps = {
	form: ReturnType<typeof useEventWizardForm>;
};

export function EventWizardProvider(props: Readonly<PropsWithChildren<EventWizardProviderProps>>): JSX.Element {
	const {children, ...formProps} = props;
	return (
		<EditModeProvider editMode={false}>
			<EventWizardFormProvider {...formProps}>{children}</EventWizardFormProvider>
		</EditModeProvider>
	);
}

export function useFormContext(editMode = useEditMode()): EventActionFormReturn {
	return editMode ? useEventEditFormContext() : useEventWizardFormContext();
}
