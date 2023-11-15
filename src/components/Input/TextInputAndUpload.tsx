import {Box, Group, TextInput, TextInputProps} from '@mantine/core';
import {ImageUploadModal} from './UploadImage/ImageUploadModal';
import {useFormContext} from '../../contexts/event/action/EventActionFormContext';
import {JSX} from 'react';

export function TextInputAndUpload(props: Readonly<TextInputProps>): JSX.Element {
	const form = useFormContext();

	return <Group spacing={'xs'} grow noWrap>
		<Box maw={'unset !important'}>
			<TextInput {...props}/>
		</Box>
		<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
	</Group>;
}
