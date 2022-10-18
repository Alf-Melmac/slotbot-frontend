import {useState} from 'react';
import {TextareaProps} from '@mantine/core';
import {TextareaMaxLength} from '../../../components/Input/MaxLength/TextareaMaxLength';
import {InlineEditableTextarea} from '../../../components/Input/InlineEditable/InlineEditableTextarea';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';

type FormTextInputProps = {
	inputProps: TextareaProps;
	formPath: string;
};

export function EventActionTextarea(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;

	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return <>
		{useEditMode() ?
			<InlineEditableTextarea {...inputProps} position={'group'} {...formInputProps}
									onSubmit={() => {
										console.log(formInputProps.value); //TODO mutate
										setOldValue(formInputProps.value);
										/*@ts-ignore text input must accept strings*/
									}} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextareaMaxLength {...inputProps} {...formInputProps}/>
		}
	</>;
}
