import {Italic} from '../../../../components/Text/Italic';
import {Group, Text} from '@mantine/core';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {EventSlotlistSlotProps} from './Slot';
import {Bold} from '../../../../components/Text/Bold';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import slotbotServerClient, {voidFunction} from '../../../../hooks/slotbotServerClient';
import {errorNotification, successNotification} from '../../../../utils/notificationHelper';
import {usePendingSlotting} from '../../../../contexts/event/details/slotlist/PendingSlottingContext';
import {useEffect} from 'react';

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: EventSlotlistSlotProps): JSX.Element {
	const {id, text, blocked, slottable} = props.slot;

	const putSlotting = () => slotbotServerClient.put(`slots/${id}/slotting`).then(voidFunction);
	const {pendingSlotting, setPendingSlotting} = usePendingSlotting();
	const {mutate, isLoading} = useMutation<void, AxiosError>(putSlotting, {
		onSuccess: () => {
			successNotification(); //TODO Better notification and refresh slotlist
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
