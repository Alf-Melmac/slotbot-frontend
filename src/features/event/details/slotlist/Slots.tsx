import {Box, createStyles, getStylesRef, Group, rem, Text} from '@mantine/core';
import {EventSlotlistProps} from './EventSlotlist';
import {SlotText} from './SlotText';
import {JSX} from 'react';
import {ReservedFor} from './ReservedFor';

const useStyles = createStyles((theme) => ({
	grid: {
		display: 'grid',
		gridTemplateColumns: 'minmax(5%, min-content) 4fr 5fr',
		[`& .${getStylesRef('slotItem')}`]: { // Replacement for gap to style background
			paddingTop: rem(3),
			paddingBottom: rem(2),
			'&:nth-child(-n+2)': {
				paddingRight: rem(8),
			},
		},
	},

	slotWrapper: {
		display: 'contents',
	},

	slotItem: {
		ref: getStylesRef('slotItem'),
	},

	slotNumber: {
		textAlign: 'right',
	},

	ownSlot: {
		backgroundColor: theme.fn.rgba(theme.colors.yellow[6], 0.1),
	},
	ownSlotMarker: {
		position: 'relative',
		'&:before': {
			content: '""',
			position: 'absolute',
			display: 'block',
			top: 0,
			bottom: 0,
			left: rem(-8),
			width: 2,
			backgroundColor: theme.colors.yellow[6],
		},
	},
}));

export type SlotlistProps = {
	slots: EventSlotlistProps['squadList'][number]['slotList'],
};

export function Slots(props: Readonly<SlotlistProps>): JSX.Element {
	const {slots} = props;
	const {classes, cx} = useStyles();


	return (
		<Box className={classes.grid}>
			{slots.map((slot) => {
				const ownSlot = slot.own ? classes.ownSlot : undefined;
				return (
					<Box key={slot.id} className={classes.slotWrapper}>
						<Text
							className={cx(classes.slotItem, classes.slotNumber, ownSlot, slot.own ? classes.ownSlotMarker : undefined)}>{slot.number}</Text>
						<Group className={cx(classes.slotItem, ownSlot)} noWrap p={0} spacing={3} align={'start'}>
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
