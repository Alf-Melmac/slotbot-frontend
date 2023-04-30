import {useParams} from 'react-router-dom';
import {Nav} from '../../../components/nav/Nav';
import {Alert, ColorSwatch, Container, Group, Tabs, Text, useMantineTheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeLowVision, faFileLines, faMagnifyingGlass, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {useDocumentTitle, useScrollIntoView} from '@mantine/hooks';
import {fetchEventDetails} from '../EventFetcher';
import {EventDetailsHeader} from './EventDetailsHeader';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventFields} from './EventFields';
import {EventSlotlist} from './slotlist/EventSlotlist';
import {EventDetailsLoading} from './EventDetailsLoading';
import {EventPageParams} from '../EventRoutes';
import {useEffect, useState} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {T} from '../../../components/T';

export function EventDetails(): JSX.Element {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t('event'));
	useDocumentTitle(title);

	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error(t('eventPage.error.missingEventId'));

	const theme = useMantineTheme();
	const {scrollIntoView: scrollToDescription, targetRef: descriptionRef} = useScrollIntoView<HTMLButtonElement>();

	const {event, eventDate, isLoading, error} = fetchEventDetails(eventId);
	useEffect(() => {
		if (event) {
			setTitle(`${event.name} - ${event.eventType.name}`);
		}
	}, [event]);
	if (isLoading) return <EventDetailsLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
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

				{event.hidden &&
                    <Alert color={'orange'} variant={'filled'} icon={<FontAwesomeIcon icon={faEyeLowVision}/>}>
                        <T k={'event.details.hiddenEventWarning'}/>
                    </Alert>}

				<EventDetailsHeader event={event} eventDate={eventDate} descriptionRef={descriptionRef}
									scrollToDescription={scrollToDescription}/>

				<Tabs mt={'xs'} defaultValue={'slotlist'}>
					<Tabs.List>
						<Tabs.Tab value={'slotlist'} icon={<FontAwesomeIcon icon={faUserGroup}/>}>
							<T k={'slotlist'}/>
						</Tabs.Tab>
						{event.descriptionAsHtml &&
                            <Tabs.Tab value={'description'} icon={<FontAwesomeIcon icon={faFileLines}/>}
                                      ref={descriptionRef}>
                                <T k={'description'}/>
                            </Tabs.Tab>
						}
						{event.details.length !== 0 &&
                            <Tabs.Tab value={'details'} icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
                                <T k={'moreDetails'}/>
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
