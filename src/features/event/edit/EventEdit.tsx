import {Container, Divider} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {EventEditDto} from '../eventTypes';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {EventEditProvider, useEventEditForm} from '../../../contexts/event/action/EventActionFormContext';
import {EventPageParams} from '../EventRoutes';
import {eventActionValidate} from '../action/validation';
import {EventEditFormType} from './EventEditPage';

export type EventEditProps = EventPageParams & {
	event: EventEditDto;
}

export function EventEdit(props: EventEditProps): JSX.Element {
	const {eventId, event} = props;

	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
			href: '/events',
		},
		{
			title: event.name,
			staticTitle: true,
			href: `/events/${eventId}`,
		},
		{
			title: 'breadcrumb.edit',
		}];

	const form = useEventEditForm({
		initialValues: event,
		validate: (values) => eventActionValidate(values as EventEditFormType),
		validateInputOnChange: true,
	});

	return (
		<Nav>
			<Container>
				<EventEditProvider form={form} eventId={eventId}>
					<Breadcrumb items={breadcrumbItems}/>

					<EventGeneralInformation canRevokeShareable={event.canRevokeShareable}/>

					<Divider my={'lg'}/>

					<EventDetailsPage/>

					<Divider my={'lg'}/>

					<EventSlotlist canUploadSlotlist={event.canUploadSlotlist}/>
				</EventEditProvider>
			</Container>
		</Nav>
	);
}
