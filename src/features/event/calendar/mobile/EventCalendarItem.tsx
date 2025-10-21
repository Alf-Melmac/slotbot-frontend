import {EventRenderRange} from '@fullcalendar/core';
import {JSX} from 'react';
import {FullCalendarEventType} from '../EventCalendar';
import {
	ActionIcon,
	Badge,
	Button,
	Card,
	Grid,
	Group,
	Image,
	Progress,
	Stack,
	Text,
	Title,
	Tooltip,
	useMantineTheme,
} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faHourglassEnd, faMagnifyingGlass, faUsers} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import {T} from '../../../../components/T';
import {Link} from 'react-router';
import {GuildDto} from '../../../guilds/guildTypes';
import {useGuildContext} from '../../../../contexts/guildcontext/GuildContext';

export function EventCalendarItem(props: Readonly<EventRenderRange>): JSX.Element {
	const {def: event, range} = props;
	const {
		extendedProps: {
			eventType,
			ownerGuild,
			shortInformation: {emptySlotsCount, slotCount, emptyReserveSlotsCount, missionLength},
		},
	} = event as unknown as FullCalendarEventType;
	const {guild} = useGuildContext();

	return <Card>
		<Stack>
			<Stack gap={'6'}>
				<Title order={3}>{event.title}</Title>
				<Group gap={'xs'}>
					<Group gap={4} wrap={'nowrap'}>
						<Tooltip label={<T k={'time'}/>}>
							<FontAwesomeIcon icon={faClock}/>
						</Tooltip>
						<Text>{dayjs.utc(`${range.start}`).format('LT')} <T k={'oClock'}/></Text>
					</Group>
					{missionLength &&
						<Group gap={4} wrap={'nowrap'}>
							<Tooltip label={<T k={'duration'}/>}>
								<FontAwesomeIcon icon={faHourglassEnd}/>
							</Tooltip>
							<Text>{missionLength}</Text>
						</Group>
					}
				</Group>
				<Group>
					{!guild &&
						<Group gap={4}>
							<Tooltip label={<T k={'organizedBy'}/>}>
								<FontAwesomeIcon icon={faUsers}/>
							</Tooltip>
							<OwnerGuild {...ownerGuild}/>
						</Group>
					}
					<Badge autoContrast color={eventType.color}>{eventType.name}</Badge>
				</Group>
			</Stack>
			<Stack gap={'4'}>
				<Group justify={'space-between'}>
					<Text>{emptySlotsCount}/{slotCount} <T k={'calendar.event.tooltip.emptySlots'}/></Text>
					{emptyReserveSlotsCount > 0 &&
						<T k={'calendar.event.tooltip.emptyReserveSlots'} args={[emptyReserveSlotsCount]}/>
					}
				</Group>
				<Grid gutter={'sm'}>
					<Grid.Col span={emptyReserveSlotsCount > 0 ? 8 : 12}>
						<Progress value={((slotCount - emptySlotsCount) / slotCount) * 100}/>
					</Grid.Col>
					{emptyReserveSlotsCount > 0 &&
						<Grid.Col span={4}>
							<Progress value={100} color={'yellow'}/>
						</Grid.Col>
					}
				</Grid>
			</Stack>

			<Button leftSection={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
					component={Link} to={`/events/${event.publicId}`}>
				<T k={'calendar.event.open'}/>
			</Button>
		</Stack>
	</Card>;
}

function OwnerGuild({id, groupIdentifier, emojiUrl}: Readonly<GuildDto>): JSX.Element {
	const theme = useMantineTheme();

	return <ActionIcon color={theme.colors.dark[0]} variant={'subtle'} component={Link} to={`/guilds/${id}`} w={'auto'}>
		{emojiUrl ?
			<Group gap={4}>
				<Image src={emojiUrl} w={theme.fontSizes.lg}/>
				{groupIdentifier}
			</Group>
			:
			<Text mx={4}>{groupIdentifier}</Text>
		}
	</ActionIcon>;
}
