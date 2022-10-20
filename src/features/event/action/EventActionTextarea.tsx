import {useState} from 'react';
import {TextareaProps} from '@mantine/core';
import {TextareaMaxLength} from '../../../components/Input/MaxLength/TextareaMaxLength';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {InlineEditableTextarea} from '../../../components/Input/InlineEditable/InlineEditables';
import {useEventTextChange} from './useEventTextChange';

type FormTextInputProps = {
	inputProps: TextareaProps;
	formPath: string;
};

export function EventActionTextarea(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	return <>
		{useEditMode() ?
			<InlineEditableTextarea {...inputProps} position={'group'} {...formInputProps}
									onSubmit={mutate} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextareaMaxLength {...inputProps} {...formInputProps}/>
		}
	</>;
}
