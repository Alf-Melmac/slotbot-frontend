import {EventEditDto, EventPostDto} from '../../../features/event/eventTypes';
import {createFormContext} from '@mantine/form';
import {EventAction, EventActionProvider, useEventAction} from './EventActionContext';
import {EventPageProvider} from '../EventPageContext';
import {EventPageParams} from '../../../features/event/EventRoutes';
import {JSX, PropsWithChildren} from 'react';

export type EventEditFormType =
	Omit<EventEditDto, 'dateTime' | 'ownerGuild' | 'canRevokeShareable' | 'canUploadSlotlist' | 'requirements'>
	& { date: Date, startTime: string, requirements: string[] };

type EventWizardFormType = Omit<EventPostDto, 'dateTime' | 'requirements'>
	& { date: Date, startTime: string, requirements: string[] };

export type EventActionFormType = EventEditFormType | EventWizardFormType;

const [EventEditFormProvider, useEventEditFormContext, useEventEditForm] = createFormContext<EventEditFormType>();
const [EventWizardFormProvider, useEventWizardFormContext, useEventWizardForm] = createFormContext<EventWizardFormType>();
export {useEventEditForm, useEventWizardForm};

type EventEditFormReturn = ReturnType<typeof useEventEditFormContext>;
type EventWizardFormReturn = ReturnType<typeof useEventWizardFormContext>;
export type EventActionFormReturn = EventEditFormReturn | EventWizardFormReturn;

type EventEditProviderProps = {
		form: ReturnType<typeof useEventEditForm>;
	}
	& Pick<EventPageParams, 'eventId'>
	& Pick<EventAction, 'ownerGuild'>;

export function EventEditProvider(props: Readonly<PropsWithChildren<EventEditProviderProps>>): JSX.Element {
	const {eventId, ownerGuild, children, ...formProps} = props;
	return (
		<EventPageProvider eventId={eventId}>
			<EventActionProvider editMode={true} ownerGuild={ownerGuild}>
				<EventEditFormProvider {...formProps}>{children}</EventEditFormProvider>
			</EventActionProvider>
		</EventPageProvider>
	);
}

type EventWizardProviderProps = {
	form: ReturnType<typeof useEventWizardForm>;
};

export function EventWizardProvider(props: Readonly<PropsWithChildren<EventWizardProviderProps>>): JSX.Element {
	const {children, ...formProps} = props;
	return (
		<EventActionProvider editMode={false}>
			<EventWizardFormProvider {...formProps}>{children}</EventWizardFormProvider>
		</EventActionProvider>
	);
}

export function useFormContext(editMode = useEventAction().editMode): EventActionFormReturn {
	return editMode ? useEventEditFormContext() : useEventWizardFormContext();
}
