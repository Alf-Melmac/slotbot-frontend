import {useState} from 'react';
import {Autocomplete, AutocompleteProps} from '@mantine/core';
import {InlineEditableAutocomplete} from '../../../components/Input/InlineEditable/InlineEditableAutocomplete';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';

type FormTextInputProps = {
	inputProps: AutocompleteProps;
	formPath: string;
};

export function EventActionAutocomplete(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;

	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	return <>
		{useEditMode() ?
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
