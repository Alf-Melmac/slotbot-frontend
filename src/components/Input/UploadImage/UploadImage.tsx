import {useEffect, useState} from 'react';
import {Anchor, createStyles, Group, Input, InputWrapperBaseProps, Stack, Text, useMantineTheme} from '@mantine/core';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {T} from '../../T';
import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileCircleXmark, faFileImport} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {FileRejection} from 'react-dropzone';
import {useLanguage} from '../../../contexts/language/Language';

const useStyles = createStyles((theme, hasError: boolean) => ({
	dropzone: {
		borderColor: hasError ?
			theme.colorScheme === 'dark' ?
				theme.fn.variant({color: 'red', variant: 'light'}).background
				:
				theme.colors.red[4]
			: undefined,
	},
}));

export type UploadImageProps = {
	onSuccess?: (fileUrl: string) => void;
}

export function UploadImage(props: UploadImageProps): JSX.Element {
	const [formData, setFormData] = useState<FormData>();
	const [error, setError] = useState<InputWrapperBaseProps['error']>();
	const [hasError, setHasError] = useState(false);
	useEffect(() => {
		setHasError(!!error);
	}, [error]);
	const [loading, setLoading] = useState(false);

	const {classes} = useStyles(hasError);
	const {t} = useLanguage();

	const postImageFile = () => slotbotServerClient.post('/files/uploadImage', formData, {
		headers: {'Content-Type': 'multipart/form-data'},
	}).then((res) => res.data);
	const {mutate} = useMutation<string, AxiosError>({
		mutationFn: postImageFile,
		onMutate: () => {
			setLoading(true);
		},
		onSuccess: fileUrl => {
			props.onSuccess?.(fileUrl);
		},
		onError: error => {
			setError(error.message);
		},
		onSettled: () => {
			setFormData(undefined);
			setLoading(false);
		},
	});

	useEffect(() => {
		if (!formData) return;
		mutate();
	}, [formData]);

	function onDrop(files: File[]): void {
		setError(undefined);
		const value = files.at(0);
		if (!value) return;
		const formData = new FormData();
		formData.append('file', value);
		setFormData(formData);
	}

	function onReject(fileRejections: FileRejection[]): void {
		const fileRejectionMessages = fileRejections.flatMap(rejection =>
			rejection.errors.map(rejectionError => {
				switch (rejectionError.code) {
					case 'file-invalid-type':
						return t('dropzone.error.fileInvalidType.image');
					case 'file-too-large':
						return t('dropzone.error.fileTooLarge');
					case 'too-many-files':
						return t('dropzone.error.tooManyFiles');
					default:
						return rejectionError.message;
				}
			}));
		setError(fileRejectionMessages
			.filter((message, index) => fileRejectionMessages.indexOf(message) === index)
			.reduce((prev, curr) => `${prev} ${curr}`));
	}

	const theme = useMantineTheme();
	return (
		<Input.Wrapper error={error}>
			<Dropzone onDrop={onDrop} onReject={onReject} accept={[MIME_TYPES.png, MIME_TYPES.jpeg, 'image/jpg']}
					  maxFiles={1} maxSize={2097000} loading={loading} className={classes.dropzone}>
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
		</Input.Wrapper>
	);
}
