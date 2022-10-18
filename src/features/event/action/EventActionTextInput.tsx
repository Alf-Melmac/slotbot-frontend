import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {TextInputProps} from '@mantine/core';
import {EventActionTextInputEditMode} from './EventActionTextInputEditMode';
import {useFormContext} from './EventActionFormContext';
import {useEditMode} from './EditModeContext';

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
