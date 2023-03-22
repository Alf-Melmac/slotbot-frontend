import {PropsWithChildren} from 'react';
import {BaseItem} from './SortableList';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faArrowsUpDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ActionIcon, Box, Group, GroupProps} from '@mantine/core';

/**
 * Props for {@link SortableItem}.
 */
export type SortableItemProps = BaseItem & {
	itemMt?: GroupProps['mt'];
};

/**
 * A sortable item inside a {@link SortableList}.
 * Renders a drag handle before the children.
 */
export function SortableItem(props: PropsWithChildren<SortableItemProps>) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({id: props.id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Group style={style} noWrap spacing={6} mt={props.itemMt}>
			<ActionIcon ref={setNodeRef} {...attributes} {...listeners}>
					<FontAwesomeIcon icon={faArrowsUpDown}/>
			</ActionIcon>
			<Box style={{flex: 1}}>
				{props.children}
			</Box>
		</Group>
	);
}
