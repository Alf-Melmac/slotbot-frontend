import {EventAction, EventActionPageProps} from './EventActionPage';
import {useState} from 'react';
import {TextareaProps} from '@mantine/core';
import {TextareaMaxLength} from '../../../components/Form/MaxLength/TextareaMaxLength';
import {InlineEditableTextarea} from '../../../components/Form/inline/InlineEditableTextarea';

type FormTextInputProps<FormReturnType extends EventAction> = EventActionPageProps<FormReturnType> & {
	inputProps: TextareaProps;
	formPath: string;
};

export function EventActionTextarea<FormReturnType extends EventAction>(props: FormTextInputProps<FormReturnType>): JSX.Element {
	const {editMode, inputProps, form, formPath} = props;

	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return <>
		{editMode ?
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
