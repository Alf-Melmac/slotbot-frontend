import {Code, Container, Divider} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useForm} from '@mantine/form';
import {EventEditDto} from '../eventTypes';
import {EventGeneralInformation} from '../action/generalInformation/EventGeneralInformation';
import {EventDetailsPage} from '../action/details/EventDetailsPage';
import {EventSlotlist} from '../action/slotlist/EventSlotlist';

export type EventEditFormType = Omit<EventEditDto, 'canRevokeShareable'>;

type EventEditProps = {
	eventId: string;
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

	const form = useForm<EventEditFormType>({
		initialValues: event,
	});

	return (
		<Nav>
			<Container>
				<Breadcrumb items={breadcrumbItems}/>

				<EventGeneralInformation form={form} canRevokeShareable={event.canRevokeShareable} editMode/>

				<Divider my={'lg'}/>

				<EventDetailsPage form={form} editMode/>

				<Divider my={'lg'}/>

				<EventSlotlist form={form} editMode/>

				<Code block mt={'lg'}>
					{JSON.stringify(form.values, null, 2)}
				</Code>
			</Container>
		</Nav>
	);
}
