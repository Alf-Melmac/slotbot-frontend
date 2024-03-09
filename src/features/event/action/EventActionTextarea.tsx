import {JSX, useState} from 'react';
import {TextareaProps} from '@mantine/core';
import {TextareaMaxLength} from '../../../components/Input/MaxLength/TextareaMaxLength';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {InlineEditableTextarea} from '../../../components/Input/InlineEditable/InlineEditables';
import {useEventTextChange} from './useEventUpdate';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';

type TranslatableTextareaProps = Omit<TextareaProps, 'wrap'> & { // remove wrap definition of html textarea to support inline editing
	label?: TextKey;
	placeholder?: TextKey;
}

type FormTextInputProps = {
	inputProps: TranslatableTextareaProps;
	formPath: string;
};

export function EventActionTextarea(props: Readonly<FormTextInputProps>): JSX.Element {
	const {inputProps, formPath} = props;
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	const translatedInputProps = useTranslationIfPresent(inputProps, ['label', 'placeholder']);
	return <>
		{useEditMode() ?
			<InlineEditableTextarea {...translatedInputProps} position={'group'} {...formInputProps}
									onSubmit={() => mutate()} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextareaMaxLength {...translatedInputProps} {...formInputProps}/>
		}
	</>;
}
