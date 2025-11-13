import {Bold} from '../../../components/Text/Bold';
import {Badge, Group, Stack, Text} from '@mantine/core';
import {T} from '../../../components/T';
import {JSX} from 'react';
import {CalendarEventDto} from '../eventTypes';
import {useGuildContext} from '../../../contexts/guildcontext/GuildContext';
import {OwnerGuild} from '../OwnerGuild';

type EventTooltipProps = Pick<CalendarEventDto, 'title' | 'eventType' | 'ownerGuild' | 'shortInformation'>;

export function EventTooltip(props: Readonly<EventTooltipProps>): JSX.Element {
	const {title, eventType, ownerGuild, shortInformation} = props;
	const {emptySlotsCount, slotCount, emptyReserveSlotsCount, missionLength} = shortInformation;
	const {guild} = useGuildContext();

	return (
		<Stack align={'center'} gap={0}>
			<Bold>{title}</Bold>
			<Badge autoContrast color={eventType.color}>{eventType.name}</Badge>
			{!guild &&
				<Group gap={4}>
					<T k={'organizedBy'}/>
					<OwnerGuild guild={ownerGuild} link={false}/>
				</Group>
			}
			<Text><Text fw={emptySlotsCount > 0 ? 'bold' : ''} span>{emptySlotsCount}/{slotCount}</Text> <T
				k={'calendar.event.tooltip.emptySlots'}/></Text>
			{emptyReserveSlotsCount > 0 &&
				<Bold><T k={'calendar.event.tooltip.emptyReserveSlots'} args={[emptyReserveSlotsCount]}/></Bold>}
			{missionLength && <Text><Bold span>Dauer:</Bold> {missionLength}</Text>}
		</Stack>
	);
}
