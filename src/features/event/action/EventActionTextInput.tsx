import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {TextInputProps} from '@mantine/core';
import {EventActionTextInputEditMode} from './EventActionTextInputEditMode';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';

export type FormTextInputProps = {
	inputProps: TextInputProps;
	formPath: string;
};

export function EventActionTextInput(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;

	return <>
		{useEditMode() ?
			<EventActionTextInputEditMode {...props}/>
			:
			<TextInputMaxLength {...inputProps} {...useFormContext().getInputProps(formPath)}/>
		}
	</>;
}
