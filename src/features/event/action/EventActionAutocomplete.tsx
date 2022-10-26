import {useState} from 'react';
import {Autocomplete, AutocompleteProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {InlineEditableAutocomplete} from '../../../components/Input/InlineEditable/InlineEditables';
import {useEventTextChange} from './useEventUpdate';

type FormTextInputProps = {
	inputProps: AutocompleteProps;
	formPath: string;
};

export function EventActionAutocomplete(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath} = props;
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);
	return <>
		{useEditMode() ?
			<InlineEditableAutocomplete {...inputProps} position={'group'} {...formInputProps}
										onSubmit={mutate} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<Autocomplete {...inputProps} {...formInputProps}/>
		}
	</>;
}
