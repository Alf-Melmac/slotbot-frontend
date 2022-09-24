import {EventAction, EventActionPageProps} from './EventActionPage';
import {useState} from 'react';
import {Autocomplete, AutocompleteProps} from '@mantine/core';
import {InlineEditableAutocomplete} from '../../../components/Form/inline/InlineEditableAutocomplete';

type FormTextInputProps<FormReturnType> = EventActionPageProps<FormReturnType> & {
	inputProps: AutocompleteProps;
	formPath: string;
};

export function EventActionAutocomplete<FormReturnType extends EventAction>(props: FormTextInputProps<FormReturnType>): JSX.Element {
	const {editMode = false, inputProps, form, formPath} = props;

	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return <>
		{editMode ?
			<InlineEditableAutocomplete {...inputProps} position={'group'} {...formInputProps}
										onSubmit={() => {
											console.log(formInputProps.value); //TODO mutate
											setOldValue(formInputProps.value);
											/*@ts-ignore text input must accept strings*/
										}} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<Autocomplete {...inputProps} {...formInputProps}/>
		}
	</>;
}
