import {Box, Group, TextInputProps} from '@mantine/core';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {TextInputMaxLength} from './TextInputMaxLength';
import {ImageUploadModal} from '../UploadImage/ImageUploadModal';

export function TextInputAndUploadMaxLength(props: TextInputProps): JSX.Element {
	const form = useFormContext();

	return <Group spacing={'xs'} grow noWrap>
		<Box maw={'unset !important'}>
			<TextInputMaxLength {...props}/>
		</Box>
		<ImageUploadModal onSuccess={fileUrl => form.setFieldValue('pictureUrl', fileUrl)}/>
	</Group>;
}
