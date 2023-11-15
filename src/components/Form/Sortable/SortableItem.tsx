import {Dispatch, JSX, PropsWithChildren, SetStateAction, useEffect} from 'react';
import {BaseItem} from './SortableList';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faArrowsUpDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ActionIcon, ActionIconProps, Box, Group, GroupProps} from '@mantine/core';

/**
 * Props for {@link SortableItem}.
 */
export type SortableItemProps = BaseItem & {
	/**
	 * Specifies if the item is sortable. If false, the drag handle is not rendered.
	 */
	sortable: boolean;
	/**
	 * Callback to set the sorting state.
	 */
	setSorting: Dispatch<SetStateAction<boolean>>;
	/**
	 * Props for the {@link Group} that wraps the item.
	 */
	itemProps?: Pick<GroupProps, 'mt' | 'mb' | 'align'>;
	/**
	 * Props for the {@link ActionIcon} that is used as the drag handle.
	 */
	iconProps?: Pick<ActionIconProps, 'size'>;
};

/**
 * A sortable item inside a {@link SortableList}.
 * Renders a drag handle before the children.
 */
export function SortableItem(props: Readonly<PropsWithChildren<SortableItemProps>>): JSX.Element {
	const {id, children, sortable, setSorting, itemProps, iconProps} = props;

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({id: id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	useEffect(() => {
		setSorting(!!style.transform);
	}, [style.transform, setSorting]);
	return (
		<Group style={style} noWrap spacing={6} {...itemProps}>
			{sortable &&
                <ActionIcon ref={setNodeRef} {...attributes} {...listeners} {...iconProps}>
                    <FontAwesomeIcon icon={faArrowsUpDown}/>
                </ActionIcon>
			}
			<Box style={{flex: 1}}>
				{children}
			</Box>
		</Group>
	);
}
