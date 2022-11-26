import {ActionIcon, Checkbox, Group} from '@mantine/core';
import {EditModeProvider, useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {EventActionTextInput} from '../EventActionTextInput';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {EventAction} from '../EventActionPage';
import {useEventFieldDefaultsContext} from '../../../../contexts/event/EventFieldDefaultsContext';
import {EventActionAutocomplete} from '../EventActionAutocomplete';

type EventDetailProps = {
	item: EventAction['details'][number]
	index: number;
};

const staticInputProps = {
	placeholder: 'Information',
	maxLength: EMBEDDABLE_VALUE,
	required: true,
	sx: {flex: 1},
};

export function EventDetail(props: EventDetailProps): JSX.Element {
	const {item, index} = props;

	const form = useFormContext();
	const editMode = useEditMode();

	const fieldDefault = useEventFieldDefaultsContext(item.title);
	let text;
	switch (fieldDefault?.type) {
		case 'TEXT_WITH_SELECTION':
			text = <EventActionAutocomplete inputProps={{
				...staticInputProps,
				data: fieldDefault.selection,
			}} formPath={`details.${index}.text`} overrideFormContextEditMode={useEditMode()}/>;
			break;
		case 'BOOLEAN':
			text = <Checkbox sx={{flex: 1}} {...form.getInputProps(`details.${index}.text`)}/>;
			break;
		case 'TEXT':
		default:
			text = <EventActionTextInput inputProps={staticInputProps}
										 formPath={`details.${index}.text`}
										 overrideFormContextEditMode={useEditMode()}/>;
			break;
	}

	return (
		<Group mt={'xs'}>
			<EditModeProvider editMode={false}>
				<EventActionTextInput inputProps={{
					placeholder: 'Titel',
					maxLength: EMBEDDABLE_TITLE,
					required: true,
				}} formPath={`details.${index}.title`} overrideFormContextEditMode={editMode}/>

				{text}

				<ActionIcon onClick={() => form.removeListItem('details', index)}>
					<FontAwesomeIcon icon={faTrashCan}/>
				</ActionIcon>
			</EditModeProvider>
		</Group>
	);
}
