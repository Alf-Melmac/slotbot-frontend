import {Group, TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {TextInputMaxLength} from './TextInputMaxLength';
import {ImageUploadModal} from '../UploadImage/ImageUploadModal';
import {JSX} from 'react';

export function TextInputAndUploadMaxLength(props: Readonly<TextInputProps>): JSX.Element {
	const form = useFormContext();

	return <Group gap={'xs'} grow wrap={'nowrap'} preventGrowOverflow={false}>
		<TextInputMaxLength {...props}/>
		<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
	</Group>;
}
