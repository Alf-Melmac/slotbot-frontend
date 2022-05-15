import {useParams} from 'react-router';
import {Nav} from '../../../components/Nav';
import {ColorSwatch, Container, Group, Skeleton, Tabs, useMantineTheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileLines, faMagnifyingGlass, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {useScrollIntoView} from '@mantine/hooks';
import {fetchEventDetails} from './EventDetailsFetcher';
import {EventDetailsHeader} from './EventDetailsHeader';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {GeneralError} from '../../../components/error/GeneralError';

type EventDetailsProps = {
	eventId: string,
};

export function EventDetails(): JSX.Element {
	const {eventId} = useParams<EventDetailsProps>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const theme = useMantineTheme();
	const {scrollIntoView: scrollToDescription, targetRef: descriptionRef} = useScrollIntoView<HTMLButtonElement>();

	const {event, eventDate, loading, error} = fetchEventDetails(eventId);
	if (loading) return <Container><Skeleton width={'100%'} height={500}></Skeleton></Container>; //TODO improve loading animation
	if (error || !event) return <GeneralError error={error}/>;

	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
			staticItem: true,
		},
		{
			title: <Group noWrap spacing={6}>
				<ColorSwatch color={event.eventType?.color || theme.primaryColor} radius={'sm'}
							 size={theme.fontSizes.md}/>
				{event.missionType} {event.eventType.name}
			</Group>,
		}];

	return (
		<Nav>
			<Container>
				<Breadcrumb items={breadcrumbItems}/>

				<EventDetailsHeader event={event} eventDate={eventDate} descriptionRef={descriptionRef}
									scrollToDescription={scrollToDescription}/>

				<Tabs mt={'xs'}>
					<Tabs.Tab label={'Slotliste'} icon={<FontAwesomeIcon icon={faUserGroup}/>}>
						{event.squadList.toString()}
					</Tabs.Tab>
					{event.description &&
                        <Tabs.Tab label={'Beschreibung'} icon={<FontAwesomeIcon icon={faFileLines}/>}
                                  ref={descriptionRef}>{event.description}</Tabs.Tab>
					}
					<Tabs.Tab label={'Weitere Details'} icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
						{event.details.toString()}
					</Tabs.Tab>
				</Tabs>
			</Container>
		</Nav>
	);
}
