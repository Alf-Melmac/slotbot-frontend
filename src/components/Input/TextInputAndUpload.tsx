import {Group, TextInput, TextInputProps} from '@mantine/core';
import {ImageUploadModal} from './UploadImage/ImageUploadModal';
import {useFormContext} from '../../contexts/event/action/EventActionFormContext';
import {JSX} from 'react';

export function TextInputAndUpload(props: Readonly<TextInputProps>): JSX.Element {
	const form = useFormContext();

	return <Group gap={'xs'} grow wrap={'nowrap'} preventGrowOverflow={false}>
		<TextInput {...props}/>
		<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
	</Group>;
}
