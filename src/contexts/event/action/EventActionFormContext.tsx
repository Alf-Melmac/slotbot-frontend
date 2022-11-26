import {EventEditDto, EventPostDto} from '../../../features/event/eventTypes';
import {createFormContext} from '@mantine/form';
import {EditModeProvider, useEditMode} from './EditModeContext';
import {FormProviderProps} from '@mantine/form/lib/FormProvider/FormProvider';
import {EventPageProvider} from '../EventPageContext';
import {EventPageParams} from '../../../features/event/EventRoutes';

type EventEditFormType = Omit<EventEditDto, 'canRevokeShareable' | 'canUploadSlotlist'>;

const [EventEditFormProvider, useEventEditFormContext, useEventEditForm] = createFormContext<EventEditFormType>();
const [EventWizardFormProvider, useEventWizardFormContext, useEventWizardForm] = createFormContext<EventPostDto>();
export {useEventEditForm, useEventWizardForm};

type EventEditFormReturn = ReturnType<typeof useEventEditFormContext>;
type EventWizardFormReturn = ReturnType<typeof useEventWizardFormContext>;

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

export function useFormContext(editMode = useEditMode()): EventEditFormReturn | EventWizardFormReturn {
	return editMode ? useEventEditFormContext() : useEventWizardFormContext();
}
