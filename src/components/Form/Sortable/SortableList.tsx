import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {SortableItem, SortableItemProps} from './SortableItem';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useState} from 'react';
import {Box, Overlay, useMantineTheme} from '@mantine/core';

/**
 * dnd-kit item
 */
export type BaseItem = {
	id: UniqueIdentifier;
}

/**
 * Props for {@link SortableList}.
 */
type SortableListProps<T extends BaseItem> = {
	formPath: string;
	renderItem: (item: T, index: number) => JSX.Element;
} & Pick<SortableItemProps, 'itemProps' | 'iconProps'>;

export function SortableList<T extends BaseItem>(props: SortableListProps<T>): JSX.Element {
	const {formPath, renderItem, ...sortableItemProps} = props;
	const form = useFormContext();
	const formValues: T[] = form.getInputProps(formPath).value;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent): void {
		const {active, over} = event;

		if (over && active.id !== over.id) {
			const oldIndex = formValues.findIndex(({id}) => id === active.id);
			const newIndex = formValues.findIndex(({id}) => id === over.id);

			form.reorderListItem(formPath, {from: oldIndex, to: newIndex});
		}
	}

	const [sorting, setSorting] = useState(false);
	const theme = useMantineTheme();
	return <>
		{sorting && <Overlay color={theme.colors.dark[8]} fixed/>}
		<Box style={{
			borderRadius: theme.radius.sm,
			backgroundColor: sorting ? theme.colorScheme !== 'dark' ? theme.colors.gray[1] : theme.colors.dark[7] : undefined,
			position: 'relative',
			zIndex: sorting ? 300 : undefined,
		}}>
			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}
				collisionDetection={closestCenter}
			>
				<SortableContext items={formValues} strategy={verticalListSortingStrategy}>
					{formValues.map((item, index) => (
						<SortableItem key={item.id} id={item.id} sortable={formValues.length > 1}
									  setSorting={setSorting} {...sortableItemProps}>
							{renderItem(item, index)}
						</SortableItem>
					))}
				</SortableContext>
			</DndContext>
		</Box>
	</>;
}
