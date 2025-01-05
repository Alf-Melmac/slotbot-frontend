import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEventAction} from '../../../contexts/event/action/EventActionContext';
import {JSX, useState} from 'react';
import {useEventTextChange} from './useEventUpdate';
import {InlineEditableText} from '../../../components/Input/InlineEditable/InlineEditables';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';

interface TranslatableTextInputProps extends TextInputProps {
	label?: TextKey;
	placeholder?: TextKey;
}

type FormTextInputProps = {
	inputProps: TranslatableTextInputProps;
	formPath: string;
	/** Forces edit mode in form context **/
	overrideFormContextEditMode?: boolean;
};

export function EventActionTextInput(props: Readonly<FormTextInputProps>): JSX.Element {
	const {inputProps, formPath, overrideFormContextEditMode = false} = props;
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	const translatedInputProps = useTranslationIfPresent(inputProps, ['label', 'placeholder']);
	return <>
		{useEventAction().editMode ?
			<InlineEditableText {...translatedInputProps} position={'group'} {...formInputProps}
								onSubmit={() => mutate()} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<TextInputMaxLength {...translatedInputProps} {...formInputProps}/>
		}
	</>;
}
