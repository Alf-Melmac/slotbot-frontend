import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {fetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {Code, Container, Skeleton} from '@mantine/core';
import {Nav} from '../../../components/nav/Nav';
import {Breadcrumb} from '../../../components/Breadcrumb';

export function EventEdit(): JSX.Element {
	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const {event, loading, error} = fetchEventForEdit(eventId);
	if (loading) return <Skeleton height={500} width={500}/>; //TODO loading animation
	if (error || !event) return <GeneralError error={error}/>;

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

	return (
		<Nav>
			<Container>
				<Breadcrumb items={breadcrumbItems}/>

				<Code block>
					{JSON.stringify(event, null, 2)}
				</Code>
			</Container>
		</Nav>
	);
}
