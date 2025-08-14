import {ActionIcon, Checkbox, Group} from '@mantine/core';
import {EventActionProvider, useEventAction} from '../../../../contexts/event/action/EventActionContext';
import {EventActionTextInput} from '../EventActionTextInput';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {EventActionFormType, useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventFieldDefaultsContext} from '../../../../contexts/event/EventFieldDefaultsContext';
import {EventActionAutocomplete} from '../EventActionAutocomplete';
import {JSX} from 'react';
import {EventDetailsInfo} from './EventDetailsInfo';

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
	const {editMode} = useEventAction();

	const fieldDefault = useEventFieldDefaultsContext(item.title);
	let text;
	if (fieldDefault?.type === 'TEXT_WITH_SELECTION') {
		text = <EventActionAutocomplete inputProps={{
			...staticInputProps,
			data: fieldDefault.selection,
		}} formPath={`details.${index}.text`} overrideFormContextEditMode={editMode}/>;
	} else if (fieldDefault?.type === 'BOOLEAN' || typeof item.text === 'boolean') { // If the text is a boolean it'll probably be checkbox
		const booleanInputProps = form.getInputProps(`details.${index}.text`, {type: 'checkbox'});
		text = <Checkbox flex={1} indeterminate={booleanInputProps.checked === ''} {...booleanInputProps}/>;
	} else { // Default and type TEXT
		text = <EventDetailsInfo inputProps={staticInputProps} formPath={`details.${index}.text`}/>;
	}

	return (
		<Group>
			<EventActionProvider editMode={false}>
				<EventActionTextInput inputProps={{
					placeholder: 'event.details.title',
					maxLength: EMBEDDABLE_TITLE,
					required: true,
				}} formPath={`details.${index}.title`} overrideFormContextEditMode={editMode}/>

				{text}

				<ActionIcon color={'gray'} variant={'subtle'} onClick={() => form.removeListItem('details', index)}>
					<FontAwesomeIcon icon={faTrashCan}/>
				</ActionIcon>
			</EventActionProvider>
		</Group>
	);
}
