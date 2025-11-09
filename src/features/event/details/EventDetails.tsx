import {useParams} from 'react-router';
import {Alert, ColorSwatch, Group, Tabs, useMantineTheme} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faEyeLowVision,
	faFileLines,
	faMagnifyingGlass,
	faTimeline,
	faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useScrollIntoView} from '@mantine/hooks';
import {useFetchEventDetails} from '../EventFetcher';
import {EventDetailsHeader} from './EventDetailsHeader';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventFields} from './EventFields';
import {EventSlotlist} from './slotlist/EventSlotlist';
import {EventDetailsLoading} from './EventDetailsLoading';
import {EventPageParams} from '../EventRoutes';
import {JSX, useEffect} from 'react';
import {useLanguage} from '../../../contexts/language/Language';
import {T} from '../../../components/T';
import {EventDescription} from './EventDescription';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';
import {useDynamicDocumentTitle} from '../../../hooks/useDocumentTitle';
import {ActionLog} from './actionLog/ActionLog';
import {useCheckAccess} from '../../../contexts/authentication/useCheckAccess';
import {ApplicationRoles} from '../../../contexts/authentication/authenticationTypes';

export function EventDetails(): JSX.Element {
	const setTitle = useDynamicDocumentTitle('event');
	const {guildUrlPath} = useGuildContext();

	const {t} = useLanguage();
	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw new Error(t('eventPage.error.missingEventId'));

	const theme = useMantineTheme();
	const {scrollIntoView: scrollToDescription, targetRef: descriptionRef} = useScrollIntoView<HTMLButtonElement>();

	const eventManage = useCheckAccess(ApplicationRoles.ROLE_EVENT_MANAGE, undefined, Number(eventId));

	const {event, eventDate, isLoading, error} = useFetchEventDetails(eventId);

	useEffect(() => {
		if (event) {
			setTitle(`${event.name} - ${event.eventType.name}`);
		}
	}, [event?.name, event?.eventType.name]);
	if (isLoading) return <EventDetailsLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
			href: `/events/calendar${guildUrlPath}`,
		},
		{
			title: <Group wrap={'nowrap'} gap={6}>
				<ColorSwatch color={event.eventType?.color || theme.primaryColor} radius={'sm'}
							 size={theme.fontSizes.md}/>
				{event.missionType} {event.eventType.name}
			</Group>,
		}];

	return <>
		<Breadcrumb items={breadcrumbItems}/>

		{event.hidden &&
			<Alert mb={'xs'} color={'orange'} variant={'filled'} icon={<FontAwesomeIcon icon={faEyeLowVision}/>}>
				<T k={'event.details.hiddenEventWarning'}/>
			</Alert>}

		<EventDetailsHeader event={event} eventDate={eventDate} descriptionRef={descriptionRef}
							scrollToDescription={scrollToDescription}/>

		<Tabs mt={'xs'} defaultValue={'slotlist'}>
			<Tabs.List>
				<Tabs.Tab value={'slotlist'} leftSection={<FontAwesomeIcon icon={faUserGroup}/>}>
					<T k={'slotlist'}/>
				</Tabs.Tab>
				{event.descriptionAsHtml &&
					<Tabs.Tab value={'description'} leftSection={<FontAwesomeIcon icon={faFileLines}/>}
							  ref={descriptionRef}>
						<T k={'description'}/>
					</Tabs.Tab>
				}
				{event.details.length !== 0 &&
					<Tabs.Tab value={'details'} leftSection={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
						<T k={'moreDetails'}/>
					</Tabs.Tab>
				}
				{eventManage &&
					<Tabs.Tab value={'log'} leftSection={<FontAwesomeIcon icon={faTimeline}/>}>
						<T k={'actionLog'}/>
					</Tabs.Tab>
				}
			</Tabs.List>

			<Tabs.Panel value={'slotlist'} pt={'xs'}>
				<EventSlotlist id={event.id} squadList={event.squadList} requirements={event.requirements}/>
			</Tabs.Panel>
			{event.descriptionAsHtml &&
				<Tabs.Panel value={'description'} pt={'xs'}>
					<EventDescription description={event.descriptionAsHtml}/>
				</Tabs.Panel>
			}
			{event.details.length !== 0 &&
				<Tabs.Panel value={'details'} pt={'xs'}>
					<EventFields fields={event.details}/>
				</Tabs.Panel>
			}
			{eventManage &&
				<Tabs.Panel value={'log'} pt={'xs'}>
					<ActionLog eventId={event.id}/>
				</Tabs.Panel>
			}
		</Tabs>
	</>;
}
