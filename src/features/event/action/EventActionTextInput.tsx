import {EventAction, EventActionPageProps} from './EventActionPage';
import {InlineEditableText} from '../../../components/Form/inline/InlineEditableText';
import {TextInputMaxLength} from '../../../components/Form/MaxLength/TextInputMaxLength';
import {useState} from 'react';
import {TextInputProps} from '@mantine/core';

type FormTextInputProps<FormReturnType> = EventActionPageProps<FormReturnType> & {
	inputProps: TextInputProps;
	formPath: string;
};

export function EventActionTextInput<FormReturnType extends EventAction>(props: FormTextInputProps<FormReturnType>): JSX.Element {
	const {editMode = false, inputProps, form, formPath} = props;

	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return <>
		{editMode ?
			<InlineEditableText {...inputProps} position={'group'} {...formInputProps}
								onSubmit={() => {
									console.log(formInputProps.value); //TODO mutate
									setOldValue(formInputProps.value);
									/*@ts-ignore text input must accept strings*/
								}} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextInputMaxLength {...inputProps} {...formInputProps}/>
		}
	</>;
}
