import {ActionIcon, Checkbox, Group} from '@mantine/core';
import {EditModeProvider, useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {EventActionTextInput} from '../EventActionTextInput';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {EventActionFormType, useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventFieldDefaultsContext} from '../../../../contexts/event/EventFieldDefaultsContext';
import {EventActionAutocomplete} from '../EventActionAutocomplete';
import {JSX} from 'react';

type EventDetailProps = {
	item: EventActionFormType['details'][number];
	index: number;
};

export function EventDetail(props: Readonly<EventDetailProps>): JSX.Element {
	const {item, index} = props;
	const staticInputProps = {
		placeholder: 'information',
		maxLength: EMBEDDABLE_VALUE,
		required: true,
		flex: 1,
	};

	const form = useFormContext();
	const editMode = useEditMode();

	const fieldDefault = useEventFieldDefaultsContext(item.title);
	let text;
	switch (fieldDefault?.type) {
		case 'TEXT_WITH_SELECTION':
			text = <EventActionAutocomplete inputProps={{
				...staticInputProps,
				data: fieldDefault.selection,
			}} formPath={`details.${index}.text`} overrideFormContextEditMode={editMode}/>;
			break;
		case 'BOOLEAN':
			text = <Checkbox flex={1} {...form.getInputProps(`details.${index}.text`)}/>;
			break;
		case 'TEXT':
		default:
			text = <EventActionTextInput inputProps={staticInputProps}
										 formPath={`details.${index}.text`}
										 overrideFormContextEditMode={editMode}/>;
			break;
	}

	return (
		<Group>
			<EditModeProvider editMode={false}>
				<EventActionTextInput inputProps={{
					placeholder: 'event.details.title',
					maxLength: EMBEDDABLE_TITLE,
					required: true,
				}} formPath={`details.${index}.title`} overrideFormContextEditMode={editMode}/>

				{text}

				<ActionIcon color={'gray'} variant={'subtle'} onClick={() => form.removeListItem('details', index)}>
					<FontAwesomeIcon icon={faTrashCan}/>
				</ActionIcon>
			</EditModeProvider>
		</Group>
	);
}
