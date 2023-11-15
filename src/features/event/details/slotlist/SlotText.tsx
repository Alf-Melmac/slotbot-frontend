import {Italic} from '../../../../components/Text/Italic';
import {Button, Group, Text} from '@mantine/core';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {EventSlotlistSlotProps} from './Slot';
import {Bold} from '../../../../components/Text/Bold';
import {useEventDetailsSlotlist} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {useSlotting} from './useSlotting';
import {JSX} from 'react';

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: Readonly<EventSlotlistSlotProps>): JSX.Element {
	const {id, text, blocked, slottable, own} = props.slot;

	const {mutateSlotting, mutateUnslotting} = useSlotting(id);
	const {pendingSlotting} = useEventDetailsSlotlist();

	if (text) {
		if (blocked) {
			return <Italic>{text}</Italic>;
		}
		return <Group spacing={'sm'}>
			<Text>{text}</Text>
			{own &&
                <Button variant={'outline'} compact color={'red'}
                        onClick={() => mutateUnslotting()} loading={pendingSlotting}>
                    <Group spacing={'xs'} noWrap>
                        <FontAwesomeIcon icon={faTicket}/>
                        <T k={'event.details.action.unslot'}/>
                    </Group>
                </Button>
			}
		</Group>;
	}
	if (slottable === null) {
		return <Bold><T k={'event.details.emptySlot'}/></Bold>;
	}
	return <ButtonWithDisabledTooltip variant={'outline'} compact
									  onClick={() => mutateSlotting()} loading={slottable && pendingSlotting}
									  disabled={!slottable} tooltip={'event.details.action.slot.disabled'}
									  display={'inline-block'}>
		<Group spacing={'xs'} noWrap>
			<FontAwesomeIcon icon={faTicket}/>
			<T k={'event.details.action.slot'}/>
		</Group>
	</ButtonWithDisabledTooltip>;
}
