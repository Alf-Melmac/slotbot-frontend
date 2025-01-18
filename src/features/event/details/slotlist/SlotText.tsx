import {Italic} from '../../../../components/Text/Italic';
import {Button, Group, GroupProps, Text} from '@mantine/core';
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
import {SlottableState} from '../../eventTypes';
import {RequirementsNotMet} from './requirements/RequirementsNotMet';

export type SlotTextProps = { slot: SlotlistProps['slots'][number] } & Pick<GroupProps, 'className' | 'mod'>;

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: Readonly<SlotTextProps>): JSX.Element {
	const {slot: {id, text, slottable: {state: slottableState, requirementsNotMet}}, className, mod} = props;

	const {mutateSlotting, mutateUnslotting} = useSlotting(id);
	const {pendingSlotting} = useEventDetailsSlotlist();

	if (slottableState === SlottableState.NO_BLOCKED) {
		return <Italic mod={mod}>{text}</Italic>;
	}
	if (slottableState === SlottableState.YES_OWN || slottableState === SlottableState.NO || slottableState === SlottableState.NOT_AVAILABLE) {
		if (text === null) {
			return <Bold mod={mod}><T k={'event.details.emptySlot'}/></Bold>;
		}
		return <Group className={cx(classes.slottable, className)} mod={mod}>
			<Text>{text}</Text>
			{slottableState === SlottableState.YES_OWN &&
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

	const slottable = slottableState === SlottableState.YES || slottableState === SlottableState.YES_REQUIREMENTS_NOT_MET;
	return <Group gap={'xs'} wrap={'nowrap'} mod={mod}>
		{(slottableState === SlottableState.YES_REQUIREMENTS_NOT_MET || slottableState === SlottableState.NO_REQUIREMENTS_NOT_MET) &&
            <RequirementsNotMet requirementsNotMet={requirementsNotMet}/>
		}
		<ButtonWithDisabledTooltip variant={'outline'} size={'compact-sm'}
								   onClick={() => mutateSlotting()} loading={slottable && pendingSlotting}
								   disabled={!slottable} tooltip={getTooltipText(slottableState)}
								   display={'inline-block'}>
			<Group gap={'xs'} wrap={'nowrap'}>
				<FontAwesomeIcon icon={faTicket}/>
				<T k={'event.details.action.slot'}/>
			</Group>
		</ButtonWithDisabledTooltip>
	</Group>;
}

function getTooltipText(slottableState: SlottableState): string {
	switch (slottableState) {
		case SlottableState.NO_RESERVED:
			return 'event.details.action.slot.reserved';
		case SlottableState.NO_REQUIREMENTS_NOT_MET:
			return 'event.details.action.slot.requirementsNotMet';
		case SlottableState.NO_BANNED:
			return 'event.details.action.slot.banned';
		default:
			return '';
	}
}
