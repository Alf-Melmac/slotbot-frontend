import {createStyles, Grid, Group, Text} from '@mantine/core';
import {ReservedFor} from './ReservedFor';
import {EventSlotlistProps} from './EventSlotlist';
import {SlotText} from './SlotText';

const useStyles = createStyles((theme) => ({
	ownSlot: {
		backgroundColor: theme.fn.rgba(theme.colors.yellow[6], 0.1),
		position: 'relative',
		'&:before': {
			content: '""',
			position: 'absolute',
			display: 'block',
			top: 0,
			bottom: 0,
			left: 0,
			width: 2,
			backgroundColor: theme.colors.yellow[6],
		},
	},
	slotNumberWrapper: {
		flexBasis: '5%',
	},
	slotNumber: {
		float: 'right',
	},
}));

export type EventSlotlistSlotProps = {
	slot: EventSlotlistProps['squadList'][number]['slotList'][number],
};

/**
 * Displays a single slot inside the slotlist
 */
export function Slot(props: EventSlotlistSlotProps): JSX.Element {
	const {slot} = props;
	const {classes} = useStyles();

	return <Grid key={slot.id} m={0} className={slot.own ? classes.ownSlot : undefined}>
		<Grid.Col py={2} className={classes.slotNumberWrapper}>
			<Text className={classes.slotNumber}>{slot.number}</Text>
		</Grid.Col>
		<Grid.Col span={5} py={2}>
			<Group noWrap spacing={5}>
				<Text>{slot.name}</Text>
				<ReservedFor guild={slot.reservedFor}/>
			</Group>
		</Grid.Col>
		<Grid.Col span={6} py={2}>
			<SlotText slot={slot}/>
		</Grid.Col>
	</Grid>;
}
