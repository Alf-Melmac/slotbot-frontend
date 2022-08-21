import {Code, Container} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useForm} from '@mantine/form';
import {EventEditDto} from '../eventTypes';
import {EventActionPageTitle} from '../action/EventActionPage';
import {RequiredInformation} from '../action/generalInformation/RequiredInformation';

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

				<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>
				<RequiredInformation form={form} canRevokeShareable={event.canRevokeShareable} editMode/>

				<Code block mt={'lg'}>
					{JSON.stringify(event, null, 2)}
				</Code>
			</Container>
		</Nav>
	);
}
