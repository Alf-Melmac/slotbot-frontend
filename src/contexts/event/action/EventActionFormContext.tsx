import {EventEditDto, EventPostDto} from '../../../features/event/eventTypes';
import {createFormContext} from '@mantine/form';
import {EditModeProvider, useEditMode} from './EditModeContext';
import {FormProviderProps} from '@mantine/form/lib/FormProvider/FormProvider';
import {EventPageProvider} from '../EventPageContext';
import {EventPageParams} from '../../../features/event/EventRoutes';

export type EventEditFormType = Omit<EventEditDto, 'dateTime' | 'canRevokeShareable' | 'canUploadSlotlist'>
	& { date: Date, startTime: Date };

type EventWizardFormType = Omit<EventPostDto, 'dateTime'>
	& { date: Date, startTime: Date };

export type EventActionFormType = EventEditFormType | EventWizardFormType;

const [EventEditFormProvider, useEventEditFormContext, useEventEditForm] = createFormContext<EventEditFormType>();
const [EventWizardFormProvider, useEventWizardFormContext, useEventWizardForm] = createFormContext<EventWizardFormType>();
export {useEventEditForm, useEventWizardForm};

export type EventEditFormReturn = ReturnType<typeof useEventEditFormContext>;
export type EventWizardFormReturn = ReturnType<typeof useEventWizardFormContext>;
export type EventActionFormReturn = EventEditFormReturn | EventWizardFormReturn;

export function EventEditProvider(props: FormProviderProps<EventEditFormReturn> & Pick<EventPageParams, 'eventId'>): JSX.Element {
	return (
		<EventPageProvider eventId={props.eventId}>
			<EditModeProvider editMode={true}>
				<EventEditFormProvider {...props}>{props.children}</EventEditFormProvider>
			</EditModeProvider>
		</EventPageProvider>
	);
}

export function EventWizardProvider(props: FormProviderProps<EventWizardFormReturn>): JSX.Element {
	return (
		<EditModeProvider editMode={false}>
			<EventWizardFormProvider {...props}>{props.children}</EventWizardFormProvider>
		</EditModeProvider>
	);
}

export function useFormContext(editMode = useEditMode()): EventActionFormReturn {
	return editMode ? useEventEditFormContext() : useEventWizardFormContext();
}
