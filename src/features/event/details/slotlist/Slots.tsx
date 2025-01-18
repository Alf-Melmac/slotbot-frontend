import {Box, Group, Text} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';
import {SlotText} from './SlotText';
import {JSX} from 'react';
import {ReservedFor} from './ReservedFor';
import classes from './Slots.module.css';
import cx from 'clsx';
import {SlottableState} from '../../eventTypes';

export type SlotlistProps = {
	slots: EventSlotlistProps['squadList'][number]['slotList'],
};

export function Slots(props: Readonly<SlotlistProps>): JSX.Element {
	const {slots} = props;


	return (
		<Box className={classes.grid}>
			{slots.map((slot) => {
				const ownSlot = slot.slottable.state === SlottableState.YES_OWN;
				const ownSlotClass = ownSlot ? classes.ownSlot : undefined;
				return (
					<Box key={slot.id} className={classes.slotWrapper}>
						<Text className={cx(classes.slotNumber, ownSlotClass, ownSlot ? classes.ownSlotMarker : undefined)} mod={{slot_item: true}}>
							{slot.number}
						</Text>
						<Group className={ownSlotClass} mod={{slot_item: true}} wrap={'nowrap'} gap={3} align={'start'}>
							<Text>{slot.name}</Text>
							<ReservedFor guild={slot.reservedFor}/>
						</Group>
						<SlotText className={ownSlotClass} mod={{slot_item: true}} slot={slot}/>
					</Box>
				);
			})}
		</Box>
	);
}
