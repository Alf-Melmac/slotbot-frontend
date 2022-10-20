import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {useState} from 'react';
import {useEventTextChange} from './useEventTextChange';
import {InlineEditableText} from '../../../components/Input/InlineEditable/InlineEditables';

export type FormTextInputProps = {
	inputProps: TextInputProps;
	formPath: string;
};

export function EventActionTextInput(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	return <>
		{useEditMode() ?
			<InlineEditableText {...inputProps} position={'group'} {...formInputProps}
								onSubmit={mutate} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextInputMaxLength {...inputProps} {...formInputProps}/>
		}
	</>;
}
