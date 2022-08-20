import {useParams} from 'react-router-dom';
import {Nav} from '../../../components/nav/Nav';
import {ColorSwatch, Container, Group, Tabs, Text, useMantineTheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileLines, faMagnifyingGlass, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {useScrollIntoView} from '@mantine/hooks';
import {fetchEventDetails} from '../EventFetcher';
import {EventDetailsHeader} from './EventDetailsHeader';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventFields} from './EventFields';
import {EventSlotlist} from './EventSlotlist';
import {EventDetailsLoading} from './EventDetailsLoading';
import {EventPageParams} from '../EventRoutes';

export function EventDetails(): JSX.Element {
	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const theme = useMantineTheme();
	const {scrollIntoView: scrollToDescription, targetRef: descriptionRef} = useScrollIntoView<HTMLButtonElement>();

	const {event, eventDate, loading, error} = fetchEventDetails(eventId);
	if (loading) return <EventDetailsLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	const breadcrumbItems = [
		{
			title: 'Event-Kalender',
			href: '/events',
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

				<Tabs mt={'xs'} defaultValue={'slotlist'}>
					<Tabs.List>
						<Tabs.Tab value={'slotlist'} icon={<FontAwesomeIcon icon={faUserGroup}/>}>
							Slotliste
						</Tabs.Tab>
						{event.descriptionAsHtml &&
                            <Tabs.Tab value={'description'} icon={<FontAwesomeIcon icon={faFileLines}/>}
                                      ref={descriptionRef}>
                                Beschreibung
                            </Tabs.Tab>
						}
						{event.details.length !== 0 &&
                            <Tabs.Tab value={'details'} icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
                                Weitere Details
                            </Tabs.Tab>
						}
					</Tabs.List>

					<Tabs.Panel value={'slotlist'}>
						<EventSlotlist squadList={event.squadList}/>
					</Tabs.Panel>
					{event.descriptionAsHtml &&
                        <Tabs.Panel value={'description'}>
                            <Text dangerouslySetInnerHTML={{__html: event.descriptionAsHtml}}></Text>
                        </Tabs.Panel>
					}
					{event.details.length !== 0 &&
                        <Tabs.Panel value={'details'}>
                            <EventFields fields={event.details}/>
                        </Tabs.Panel>
					}
				</Tabs>
			</Container>
		</Nav>
	);
}
