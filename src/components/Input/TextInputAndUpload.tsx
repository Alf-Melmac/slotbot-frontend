import {Box, Group, TextInput, TextInputProps} from '@mantine/core';
import {ImageUploadModal} from './UploadImage/ImageUploadModal';
import {useFormContext} from '../../contexts/event/action/EventActionFormContext';

export function TextInputAndUpload(props: TextInputProps): JSX.Element {
	const form = useFormContext();

	return <Group spacing={'xs'} grow noWrap>
		<Box maw={'unset !important'}>
			<TextInput {...props}/>
		</Box>
		<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
	</Group>;
}
