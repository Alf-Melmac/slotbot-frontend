import {useEffect, useState} from 'react';
import {Anchor, Group, Stack, Text, useMantineTheme} from '@mantine/core';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {T} from '../T';
import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileCircleXmark, faFileImport} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {successNotification} from '../../utils/notificationHelper';
import {showNotification} from '@mantine/notifications';

export function UploadFile(): JSX.Element {
	const [formData, setFormData] = useState<FormData>();

	const [loading, setLoading] = useState(false);

	const postImageFile = () => slotbotServerClient.post('/files/uploadImage', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => res.data);
	const {mutate} = useMutation<string, AxiosError>(postImageFile, {
		onMutate: () => {
			setLoading(true);
		},
		onSuccess: fileUrl => {
			successNotification(fileUrl);
		},
		onError: error => {
			showNotification({
				title: error.message,
				message: undefined,
				color: 'red',
			});
		},
		onSettled: () => {
			setLoading(false);
		},
	});

	useEffect(() => {
		if (!formData) return;
		mutate();
	}, [formData]);

	function onDrop(files: File[]): void {
		const value = files.at(0);
		if (!value) return;
		const formData = new FormData();
		formData.append('file', value);
		setFormData(formData);
	}

	const theme = useMantineTheme();
	return (
		<Dropzone onDrop={onDrop} accept={[MIME_TYPES.png, MIME_TYPES.jpeg]} maxFiles={1}
				  maxSize={2097000} loading={loading} mt={'xl'}>
			<Group position={'center'} spacing={'xl'} style={{minHeight: 100, pointerEvents: 'none'}} noWrap>
				<Dropzone.Accept>
					<FontAwesomeIcon icon={faFileImport} size={'2x'}
									 color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<FontAwesomeIcon icon={faFileCircleXmark} size={'2x'}
									 color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<FontAwesomeIcon icon={faImage} size={'2x'}/>
				</Dropzone.Idle>

				<Stack spacing={7}>
					<Text size={'lg'} inline>
						<T k={'dropzone.placeholder.upload.image'}/>
					</Text>
					<Anchor inline>
						<T k={'dropzone.placeholder.select.image'}/>
					</Anchor>
				</Stack>
			</Group>
		</Dropzone>
	);
}
