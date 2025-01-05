import {JSX, useState} from 'react';
import {Autocomplete, AutocompleteProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEventAction} from '../../../contexts/event/action/EventActionContext';
import {InlineEditableAutocomplete} from '../../../components/Input/InlineEditable/InlineEditables';
import {useEventTextChange} from './useEventUpdate';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';

interface TranslatableAutocompleteProps extends AutocompleteProps {
	label?: TextKey;
	placeholder?: TextKey;
}

type FormTextInputProps = {
	inputProps: TranslatableAutocompleteProps;
	formPath: string;
	/** Forces edit mode in form context **/
	overrideFormContextEditMode?: boolean;
};

export function EventActionAutocomplete(props: Readonly<FormTextInputProps>): JSX.Element {
	const {inputProps, formPath, overrideFormContextEditMode = false} = props;
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	const translatedInputProps = useTranslationIfPresent(inputProps, ['label', 'placeholder']);
	return <>
		{useEventAction().editMode ?
			<InlineEditableAutocomplete {...translatedInputProps} position={'group'} {...formInputProps}
										onSubmit={() => mutate()}
										onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<Autocomplete {...translatedInputProps} {...formInputProps}/>
		}
	</>;
}
