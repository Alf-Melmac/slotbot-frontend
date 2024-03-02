import {Anchor, Button, Code, Group, Input, InputWrapperProps, Modal, ModalProps, Stack, Text} from '@mantine/core';
import {JSX, useEffect, useState} from 'react';
import {Dropzone} from '@mantine/dropzone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileArrowUp, faFileCircleQuestion, faFileImport} from '@fortawesome/free-solid-svg-icons';
import {FileRejection} from 'react-dropzone-esm';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {SquadDto} from '../../eventTypes';
import {AxiosError} from 'axios';
import {randomId} from '@mantine/hooks';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import classes from './UploadSlotlist.module.css';

export function UploadSlotlist(): JSX.Element {
	const [opened, setOpened] = useState(false);

	const closeModal = () => setOpened(false);
	return <>
		<Modal opened={opened} onClose={closeModal} size={'lg'} title={<T k={'slotlist.upload'}/>}>
			<T k={'slotlist.upload.description.partOne'}/> <Code>mission.sqm</Code> <T
			k={'slotlist.upload.description.partTwo'}/><br/><T k={'slotlist.upload.description.partThree'}/> <
			Code>%USERPROFILE%\Documents\Arma 3\</Code> <Code>missions</Code> <T k={'or'}/> <Code>mpMissions</Code>.
			<SqmDropzone closeModal={closeModal}/>
		</Modal>

		<Button variant={'default'} onClick={() => setOpened(true)}><T k={'slotlist.upload'}/></Button>
	</>;
}

type SqmDropzoneProps = {
	closeModal: ModalProps['onClose'];
}

function SqmDropzone(props: Readonly<SqmDropzoneProps>): JSX.Element {
	const [formData, setFormData] = useState<FormData>();
	const [error, setError] = useState<InputWrapperProps['error']>();
	const [loading, setLoading] = useState(false);

	const {t} = useLanguage();

	const form = useFormContext();
	const postSlotlist = () => slotbotServerClient.post('/files/uploadSqm', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => res.data);
	const {mutate} = useMutation<SquadDto[], AxiosError>({
		mutationFn: postSlotlist,
		onMutate: () => {
			setLoading(true);
		},
		onSuccess: squadList => {
			//Align with manual creation
			squadList.forEach(squad => {
				squad.id = randomId();
				if (squad.reservedFor === null) {
					squad.reservedFor = '';
				}
				squad.slotList.forEach(slot => {
					slot.id = randomId();
					if (slot.reservedFor === null) {
						slot.reservedFor = '';
					}
					if (slot.replacementText === null) {
						slot.replacementText = t('slot.blocked');
					}
				});
			});
			// @ts-ignore These can no longer be existing slots for editing. Therefore, the "new squad"-type can be forced
			form.setFieldValue('squadList', squadList);
			props.closeModal();
		},
		onError: axiosError => {
			setError(axiosError.message);
			setLoading(false);
		},
	});

	useEffect(() => {
		if (!formData) return;
		mutate();
	}, [formData]);

	function onDrop(files: File[]): void {
		if (generalFileValidation(files)) return;

		const value = files.at(0);
		if (!value) return;
		const formData = new FormData();
		formData.append('file', value);
		setFormData(formData);
	}

	function onReject(fileRejections: FileRejection[]): void {
		if (generalFileValidation(fileRejections.map(rejection => rejection.file))) {
			return;
		}
		const fileRejectionMessages = fileRejections.flatMap(rejection =>
			rejection.errors.map(rejectionError => rejectionError.message));
		setError(fileRejectionMessages.join(', '));
	}

	function generalFileValidation(files?: File[]): boolean {
		setError(undefined);
		if (!files) return true;
		if (files.length > 1) {
			setError(<T k={'slotlist.upload.error.multipleFiles'}/>);
			return true;
		}
		const file = files.at(0);
		if (!file) return true;
		if (!file.name.endsWith('.sqm')) {
			setError(<T k={'slotlist.upload.error.invalidFileType'}/>);
			return true;
		}
		return false;
	}

	return (
		<Input.Wrapper error={error}>
			<Dropzone onDrop={onDrop} onReject={onReject} accept={{'application/octet-stream': ['.sqm']}} maxFiles={1}
					  maxSize={2097000} loading={loading} mt={'xl'} className={classes.dropzone}>
				<Group justify={'center'} gap={'xl'} style={{minHeight: 100, pointerEvents: 'none'}} wrap={'nowrap'}>
					<Dropzone.Accept>
						<FontAwesomeIcon icon={faFileImport} size={'2x'}/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<FontAwesomeIcon icon={faFileCircleQuestion} size={'2x'}/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<FontAwesomeIcon icon={faFileArrowUp} size={'2x'}/>
					</Dropzone.Idle>

					<Stack gap={7}>
						<Text size={'lg'} inline>
							<T k={'dropzone.placeholder.upload'}/>
						</Text>
						<Anchor inline>
							<T k={'dropzone.placeholder.select'}/>
						</Anchor>
					</Stack>
				</Group>
			</Dropzone>
		</Input.Wrapper>
	);
}
