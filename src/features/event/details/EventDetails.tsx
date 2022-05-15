import {useParams} from 'react-router';
import {Nav} from '../../../components/Nav';
import {
	Button,
	Card,
	ColorSwatch,
	Container,
	Grid,
	Group,
	Image,
	MediaQuery,
	Paper,
	Tabs,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import {useQuery} from 'react-query';
import {EventDetailsDto} from '../eventTypes';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faCalendarDay,
	faFileLines,
	faHourglassEnd,
	faMagnifyingGlass,
	faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {useScrollIntoView} from '@mantine/hooks';

type EventDetailsProps = {
	eventId: string,
};

export function EventDetails(): JSX.Element {
	const {eventId} = useParams<EventDetailsProps>();

	const getEvents = () => fetch(`/events/${eventId}/details`).then(res => res.json());
	const query = useQuery<EventDetailsDto, Error>('event', getEvents);
	const event = query.data;

	dayjs.extend(localizedFormat);
	dayjs.extend(localeData);
	const eventDate = dayjs(event?.dateTimeZoned);

	const theme = useMantineTheme();
	const breadcrumbItems = [
		{title: <Text>Event-Kalender</Text>, href: '/events'},
		{
			title:
				<Text><Group noWrap spacing={6}>
					<ColorSwatch color={event?.eventType.color || theme.primaryColor} radius={'sm'}
								 size={theme.fontSizes.md}/>
					{event?.missionType} {event?.eventType.name}
				</Group></Text>
			,
		}];

	const {scrollIntoView: scrollToDescription, targetRef: descriptionRef} = useScrollIntoView<HTMLButtonElement>();

	return (
		<Nav>
			<Container>
				<Breadcrumb items={breadcrumbItems}/>

				<Grid gutter={'xl'} mt={1}>
					<Grid.Col span={4}>
						<Paper shadow={'md'}>
							<Image src={event?.pictureUrl} radius={'sm'} withPlaceholder/>
						</Paper>
					</Grid.Col>
					<Grid.Col span={8}>
						<Title order={1}>{event?.name}</Title>
						<Group spacing={'xs'}>
							<Text><FontAwesomeIcon icon={faCalendarDay}/></Text>
							<Text size={'xl'}>{eventDate.format('L LT')} Uhr</Text>
							{event?.missionLength &&
                                <>
                                    <Text><FontAwesomeIcon icon={faHourglassEnd}/></Text>
                                    <Text size={'xl'}>{event.missionLength}</Text>
                                </>
							}
						</Group>
						{
							event?.description &&
                            <Card mt={'sm'}>
                                <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
                                    <Text lineClamp={1}>{event.description}</Text>
                                </MediaQuery>
                                <MediaQuery smallerThan={'md'} styles={{display: 'none'}}>
                                    <Text lineClamp={4}>{event.description}</Text>
                                </MediaQuery>
                                <Button variant={'default'} mt={'sm'}
                                        onClick={() => {
											descriptionRef.current?.click();
											scrollToDescription();
										}}>Beschreibung anzeigen</Button>
                            </Card>
						}

					</Grid.Col>
				</Grid>

				<Text size={'xs'} mt={4}>Mission von <em>{event?.creator}</em></Text>

				<Tabs mt={'xs'}>
					<Tabs.Tab label={'Slotliste'} icon={<FontAwesomeIcon icon={faUserGroup}/>}>
						{event?.squadList.toString()}
					</Tabs.Tab>
					{event?.description &&
                        <Tabs.Tab label={'Beschreibung'} icon={<FontAwesomeIcon icon={faFileLines}/>}
                                  ref={descriptionRef}>{event.description}</Tabs.Tab>
					}
					<Tabs.Tab label={'Weitere Details'} icon={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
						{event?.details.toString()}
					</Tabs.Tab>
				</Tabs>
			</Container>
		</Nav>
	);
}
