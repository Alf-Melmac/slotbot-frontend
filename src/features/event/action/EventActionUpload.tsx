import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {Group, TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {JSX, useState} from 'react';
import {useEventTextChange} from './useEventUpdate';
import {InlineEditableTextAndUpload} from '../../../components/Input/InlineEditable/InlineEditables';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';
import {ImageUploadModal} from '../../../components/Input/UploadImage/ImageUploadModal';
import {useEventAction} from '../../../contexts/event/action/EventActionContext';

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

export function EventActionUpload(props: Readonly<FormTextInputProps>): JSX.Element {
	const {inputProps, formPath, overrideFormContextEditMode = false} = props;
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	const translatedInputProps = useTranslationIfPresent(inputProps, ['label']);
	return (
		useEventAction().editMode ?
			<InlineEditableTextAndUpload {...translatedInputProps} position={'group'} wrap={'nowrap'}
										 {...formInputProps}
										 onSubmit={() => mutate()}
										 onCancel={() => form.setFieldValue(formPath, oldValue)}/>
			:
			<Group gap={'xs'} preventGrowOverflow={false} grow wrap={'nowrap'}>
				<TextInputMaxLength {...translatedInputProps} {...formInputProps}/>
				<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
			</Group>
	);
}
