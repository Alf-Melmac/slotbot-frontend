import {Divider} from '@mantine/core';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {
	EventEditFormType,
	EventEditProvider,
	useEventEditForm,
} from '../../../contexts/event/action/EventActionFormContext';
import {EventPageParams} from '../EventRoutes';
import {eventActionValidate} from '../action/validation';
import {EventEditDto} from '../eventTypes';
import {JSX} from 'react';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';

type EventEditProps = EventPageParams & {
	event: EventEditFormType;
	permissions: Pick<EventEditDto, 'canRevokeShareable' | 'canUploadSlotlist'>
}

export function EventEdit(props: Readonly<EventEditProps>): JSX.Element {
	const {eventId, event, permissions: {canRevokeShareable, canUploadSlotlist}} = props;
	const {guildUrlPath} = useGuildContext();

	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
			href: `/events/calendar${guildUrlPath}`,
		},
		{
			title: event.name,
			staticTitle: true,
			href: `/events/${eventId}`,
			ellipsis: true,
		},
		{
			title: 'action.edit',
		}];

	const form = useEventEditForm({
		initialValues: event,
		validate: (values) => eventActionValidate(values),
		validateInputOnChange: true,
	});

	// The form type is not allowed to have this, but we know that EventEditDto has this value
	const ownerGuild: EventEditDto['ownerGuild'] = (event as unknown as EventEditDto).ownerGuild;
	return (
		<EventEditProvider form={form} eventId={eventId} ownerGuild={ownerGuild}>
			<Breadcrumb items={breadcrumbItems}/>

			<EventGeneralInformation canRevokeShareable={canRevokeShareable}/>

			<Divider my={'lg'}/>

			<EventDetailsPage/>

			<Divider my={'lg'}/>

			<EventSlotlist canUploadSlotlist={canUploadSlotlist}/>
		</EventEditProvider>
	);
}
