import {Italic} from '../../../../components/Text/Italic';
import {Box, Button, Group, GroupProps, Text} from '@mantine/core';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {Bold} from '../../../../components/Text/Bold';
import {useEventDetailsSlotlist} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {useSlotting} from './useSlotting';
import {JSX} from 'react';
import {SlotlistProps} from './Slots';
import classes from './SlotText.module.css';
import cx from 'clsx';

export type SlotTextProps = { slot: SlotlistProps['slots'][number] } & Pick<GroupProps, 'className' | 'mod'>;

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: Readonly<SlotTextProps>): JSX.Element {
	const {slot: {id, text, blocked, slottable, own}, className, mod} = props;

	const {mutateSlotting, mutateUnslotting} = useSlotting(id);
	const {pendingSlotting} = useEventDetailsSlotlist();

	if (text) {
		if (blocked) {
			return <Italic className={className} mod={mod}>{text}</Italic>;
		}
		return <Group className={cx(classes.slottable, className)} mod={mod}>
			<Text>{text}</Text>
			{own &&
                <Button variant={'outline'} size={'compact-sm'} color={'red'}
                        onClick={() => mutateUnslotting()} loading={pendingSlotting}>
                    <Group gap={'xs'} wrap={'nowrap'}>
                        <FontAwesomeIcon icon={faTicket}/>
                        <T k={'event.details.action.unslot'}/>
                    </Group>
                </Button>
			}
		</Group>;
	}
	if (slottable === null) {
		return <Bold className={className} mod={mod}><T k={'event.details.emptySlot'}/></Bold>;
	}
	return <Box className={className} mod={mod}>
		<ButtonWithDisabledTooltip variant={'outline'} size={'compact-sm'}
								   onClick={() => mutateSlotting()} loading={slottable && pendingSlotting}
								   disabled={!slottable} tooltip={'event.details.action.slot.disabled'}
								   display={'inline-block'}>
			<Group gap={'xs'} wrap={'nowrap'}>
				<FontAwesomeIcon icon={faTicket}/>
				<T k={'event.details.action.slot'}/>
			</Group>
		</ButtonWithDisabledTooltip>
	</Box>;
}
