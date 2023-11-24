import {Italic} from '../../../../components/Text/Italic';
import {Box, Button, createStyles, Group, GroupProps, rem, Text} from '@mantine/core';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTicket} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../../../components/T';
import {Bold} from '../../../../components/Text/Bold';
import {useEventDetailsSlotlist} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {useSlotting} from './useSlotting';
import {JSX} from 'react';
import {SlotlistProps} from './Slots';

const useStyles = createStyles((theme) => ({
	slottable: {
		[theme.fn.smallerThan('md')]: {
			gap: rem(6),
		},
		[theme.fn.largerThan('md')]: {
			gap: theme.spacing.sm,
		},
	},
}));

export type SlotTextProps = { slot: SlotlistProps['slots'][number] } & Pick<GroupProps, 'className'>;

/**
 * Displays the content of a slot. This includes empty, blocked and reserved slots.
 */
export function SlotText(props: Readonly<SlotTextProps>): JSX.Element {
	const {slot: {id, text, blocked, slottable, own}, className} = props;
	const {classes, cx} = useStyles();

	const {mutateSlotting, mutateUnslotting} = useSlotting(id);
	const {pendingSlotting} = useEventDetailsSlotlist();

	if (text) {
		if (blocked) {
			return <Italic className={className}>{text}</Italic>;
		}
		return <Group className={cx(classes.slottable, className)}>
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
		return <Bold className={className}><T k={'event.details.emptySlot'}/></Bold>;
	}
	return <Box className={className}>
		<ButtonWithDisabledTooltip variant={'outline'} compact
								   onClick={() => mutateSlotting()} loading={slottable && pendingSlotting}
								   disabled={!slottable} tooltip={'event.details.action.slot.disabled'}
								   display={'inline-block'}>
			<Group spacing={'xs'} noWrap>
				<FontAwesomeIcon icon={faTicket}/>
				<T k={'event.details.action.slot'}/>
			</Group>
		</ButtonWithDisabledTooltip>
	</Box>;
}
