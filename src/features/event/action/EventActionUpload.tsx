import {TextInputMaxLength} from '../../../components/Input/MaxLength/TextInputMaxLength';
import {Box, Group, TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {useState} from 'react';
import {useEventTextChange} from './useEventUpdate';
import {InlineEditableText} from '../../../components/Input/InlineEditable/InlineEditables';
import {TextKey} from '../../../contexts/language/Language';
import {useTranslationIfPresent} from '../../../utils/translationHelper';
import {ImageUploadModal} from '../../../components/Input/UploadImage/ImageUploadModal';

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

export function EventActionUpload(props: FormTextInputProps): JSX.Element {
	const {inputProps, formPath, overrideFormContextEditMode = false} = props;
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

	const [oldValue, setOldValue] = useState<string>(formInputProps.value || '');
	const {mutate} = useEventTextChange(formPath, formInputProps.value, setOldValue);

	const translatedInputProps = useTranslationIfPresent(inputProps, ['label', 'placeholder']);
	return <Group spacing={'xs'} grow noWrap>
		<Box maw={'unset !important'}>
			{useEditMode() ?
				<InlineEditableText {...translatedInputProps} position={'group'} {...formInputProps}
									onSubmit={() => mutate()} onCancel={() => form.setFieldValue(formPath, oldValue)}/>
				:
				<TextInputMaxLength {...translatedInputProps} {...formInputProps}/>
			}
		</Box>
		{useEditMode() ||
            <ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
		}
	</Group>;
}
