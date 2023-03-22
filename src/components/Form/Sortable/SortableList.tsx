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
} & Pick<SortableItemProps, 'itemMt'>;

export function SortableList<T extends BaseItem>(props: SortableListProps<T>): JSX.Element {
	const {formPath, renderItem, ...itemProps} = props;
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

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
		>
			<SortableContext items={formValues} strategy={verticalListSortingStrategy}>
				{formValues.map((item, index) => (
					<SortableItem key={item.id} id={item.id} {...itemProps}>{renderItem(item, index)}</SortableItem>
				))}
			</SortableContext>
		</DndContext>
	);
}
