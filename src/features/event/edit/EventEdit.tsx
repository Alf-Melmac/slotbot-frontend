import {Code, Container, Divider} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {EventEditDto} from '../eventTypes';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';
import {EventEditProvider, useEventEditForm} from '../../../contexts/event/action/EventActionFormContext';
import {EventPageParams} from '../EventRoutes';

export type EventEditProps = EventPageParams & {
	event: EventEditDto;
}

export function EventEdit(props: EventEditProps): JSX.Element {
	const {eventId, event} = props;

	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
		},
		{
			title: event.name,
			href: `/events/${eventId}`,
		},
		{
			title: 'Bearbeiten',
		}];

	const form = useEventEditForm({
		initialValues: event,
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

					<Code block mt={'lg'}>
						{JSON.stringify(form.values, null, 2)}
					</Code>
				</EventEditProvider>
			</Container>
		</Nav>
	);
}
