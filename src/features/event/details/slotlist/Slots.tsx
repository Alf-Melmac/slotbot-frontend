import {Box, Group, Text} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';
import {SlotText} from './SlotText';
import {JSX} from 'react';
import {ReservedFor} from './ReservedFor';
import classes from './Slots.module.css';
import cx from 'clsx';

export type SlotlistProps = {
	slots: EventSlotlistProps['squadList'][number]['slotList'],
};

export function Slots(props: Readonly<SlotlistProps>): JSX.Element {
	const {slots} = props;


	return (
		<Box className={classes.grid}>
			{slots.map((slot) => {
				const ownSlot = slot.own ? classes.ownSlot : undefined;
				return (
					<Box key={slot.id} className={classes.slotWrapper}>
						<Text
							className={cx(classes.slotItem, classes.slotNumber, ownSlot, slot.own ? classes.ownSlotMarker : undefined)}>{slot.number}</Text>
						<Group className={cx(classes.slotItem, ownSlot)} wrap={'nowrap'} p={0} gap={3} align={'start'}>
							<Text>{slot.name}</Text>
							<ReservedFor guild={slot.reservedFor}/>
						</Group>
						<SlotText className={cx(classes.slotItem, ownSlot)} slot={slot}/>
					</Box>
				);
			})}
		</Box>
	);
}
