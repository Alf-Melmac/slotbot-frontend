import {Bold} from '../../../components/Text/Bold';
import {Stack, Text} from '@mantine/core';
import {T} from '../../../components/T';
import {JSX} from 'react';

type EventTooltipProps = {
	eventName: string;
	emptySlotsCount: number;
	slotCount: number;
	emptyReserveSlotsCount: number;
	missionLength: string;
};

export function EventTooltip(props: Readonly<EventTooltipProps>): JSX.Element {
	const {eventName, emptySlotsCount, slotCount, emptyReserveSlotsCount, missionLength} = props;

	return (
		<Stack align={'center'} spacing={0}>
			<Bold>{eventName}</Bold>
			<Text><Text weight={emptySlotsCount > 0 ? 'bold' : ''} span>{emptySlotsCount}/{slotCount}</Text> <T
				k={'calendarEvent.tooltip.emptySlots'}/></Text>
			{emptyReserveSlotsCount > 0 &&
                <Bold><T k={'calendarEvent.tooltip.emptyReserveSlots'} args={[emptyReserveSlotsCount]}/></Bold>}
			{missionLength && <Text><Bold span>Dauer:</Bold> {missionLength}</Text>}
		</Stack>
	);
}
