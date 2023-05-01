import {Italic} from '../../../../components/Text/Italic';
import {Group, Text} from '@mantine/core';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {EventSlotlistSlotProps} from './Slot';
import {Bold} from '../../../../components/Text/Bold';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {errorNotification} from '../../../../utils/notificationHelper';
import {useEventDetailsSlotlist} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {useEffect} from 'react';
import {EventDetailsDto} from '../../eventTypes';

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: EventSlotlistSlotProps): JSX.Element {
	const {id, text, blocked, slottable} = props.slot;

	const queryClient = useQueryClient();
	const putSlotting = () => slotbotServerClient.put(`/events/slotting/${id}`).then((res) => res.data);
	const {pendingSlotting, setPendingSlotting, eventId} = useEventDetailsSlotlist();
	const {mutate, isLoading} = useMutation<EventDetailsDto, AxiosError>(putSlotting, {
		onSuccess: (data) => {
			queryClient.setQueryData(['eventDetails', eventId.toString()], data);
			setPendingSlotting(false);
		},
		onError: errorNotification,
	});
	useEffect(() => {
		if (isLoading) {
			setPendingSlotting(true);
		}
	}, [isLoading]);

	if (text) {
		return blocked ? <Italic>{text}</Italic> : <Text>{text}</Text>;
	}
	if (slottable === null) {
		return <Bold><T k={'event.details.emptySlot'}/></Bold>;
	}
	return <ButtonWithDisabledTooltip variant={'outline'} compact
									  onClick={() => mutate()} loading={slottable && pendingSlotting}
									  disabled={!slottable} tooltip={'event.details.action.slot.disabled'}
									  display={'inline-block'}>
		<Group spacing={'xs'}>
			<FontAwesomeIcon icon={faTicket}/>
			<T k={'event.details.action.slot'}/>
		</Group>
	</ButtonWithDisabledTooltip>;
}
