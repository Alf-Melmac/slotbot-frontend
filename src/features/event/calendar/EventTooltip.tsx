import {Bold} from '../../../components/Text/Bold';
import {Stack, Text} from '@mantine/core';

type EventTooltipProps = {
	eventName: string;
	emptySlotsCount: number;
	slotCount: number;
	emptyReserveSlotsCount: number;
	missionLength: string;
};

export function EventTooltip(props: EventTooltipProps): JSX.Element {
	const {eventName, emptySlotsCount, slotCount, emptyReserveSlotsCount, missionLength} = props;

	return (
		<Stack align={'center'} spacing={0}>
			<Bold>{eventName}</Bold>
			<Text><Text weight={emptySlotsCount > 0 ? 'bold' : ''}
						component={'span'}>{emptySlotsCount}/{slotCount}</Text> Slots frei</Text>
			{emptyReserveSlotsCount > 0 && <Bold>{emptyReserveSlotsCount} Reservistenplätze frei</Bold>}
			{missionLength && <Text><Bold>Dauer:</Bold> {missionLength}</Text>}
		</Stack>
	);
}
