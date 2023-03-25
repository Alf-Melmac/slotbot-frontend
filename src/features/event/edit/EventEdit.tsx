import {Container, Divider} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
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

type EventEditProps = EventPageParams & {
	event: EventEditFormType;
	permissions: Pick<EventEditDto, 'canRevokeShareable' | 'canUploadSlotlist'>
}

export function EventEdit(props: EventEditProps): JSX.Element {
	const {eventId, event, permissions: {canRevokeShareable, canUploadSlotlist}} = props;

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
		validate: (values) => eventActionValidate(values),
		validateInputOnChange: true,
	});

	return (
		<Nav>
			<Container>
				<EventEditProvider form={form} eventId={eventId}>
					<Breadcrumb items={breadcrumbItems}/>

					<EventGeneralInformation canRevokeShareable={canRevokeShareable}/>

					<Divider my={'lg'}/>

					<EventDetailsPage/>

					<Divider my={'lg'}/>

					<EventSlotlist canUploadSlotlist={canUploadSlotlist}/>
				</EventEditProvider>
			</Container>
		</Nav>
	);
}
