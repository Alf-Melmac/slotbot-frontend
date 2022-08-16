import {
	Anchor,
	Button,
	Code,
	createStyles,
	Group,
	Input,
	InputWrapperBaseProps,
	Modal,
	Stack,
	Text,
	useMantineTheme,
} from '@mantine/core';
import {useEffect, useState} from 'react';
import {Dropzone} from '@mantine/dropzone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileArrowUp, faFileCircleQuestion, faFileImport} from '@fortawesome/free-solid-svg-icons';
import {FileRejection} from 'react-dropzone';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {SquadDto} from '../eventTypes';
import {AxiosError} from 'axios';

type UploadSlotlistProps = {};

export function UploadSlotlist(props: UploadSlotlistProps): JSX.Element {
	const {} = props;
	const [opened, setOpened] = useState(false);

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)} size={'lg'} title={'Slotliste hochladen'}>
			Lade hier deine nicht binarisierte <Code>mission.sqm</Code> hoch, um daraus die Slotliste generieren zu
			lassen. Die Slotliste kannst du danach noch bearbeiten.<br/> Die Missionsdateien findest du nach dem
			Speichern unter <Code>%USERPROFILE%\Documents\Arma 3\</Code> <Code
		>missions</Code> oder <Code>mpMissions</Code>.
			<SqmDropzone/>
		</Modal>

		<Button variant={'light'} onClick={() => setOpened(true)}>Slotliste hochladen</Button>
	</>;
}

const useStyles = createStyles((theme, hasError: boolean) => ({
	dropzone: {
		borderColor: hasError ?
			theme.colorScheme === 'dark' ?
				theme.fn.variant({color: 'red', variant: 'light'}).background
				:
				theme.colors.red[4]
			: undefined,

		'&[data-reject]': { //Copied from data-accepted
			backgroundColor: theme.colorScheme === 'dark' ?
				theme.fn.variant({color: theme.primaryColor, variant: 'light'}).background
				:
				theme.colors[theme.primaryColor][0],
			borderColor: theme.colorScheme === 'dark' ?
				theme.fn.variant({color: theme.primaryColor, variant: 'light'}).border
				:
				theme.colors[theme.primaryColor][4],
		},
	},

	acceptIcon: {
		color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
	},
}));

function SqmDropzone(): JSX.Element {
	const [formData, setFormData] = useState<FormData>();
	const [error, setError] = useState<InputWrapperBaseProps['error']>();
	const [hasError, setHasError] = useState(true);
	useEffect(() => {
		setHasError(!!error);
	}, [error]);

	const theme = useMantineTheme();
	const {classes} = useStyles(hasError);

	const postSlotlist = () => slotbotServerClient.post('/files/uploadSqm', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => res.data);
	const {mutate} = useMutation<SquadDto[], AxiosError>(postSlotlist, {
		onSuccess: squadList => {
			console.log(squadList);
			//TODO set squadList
		},
		onError: axiosError => {
			setError(axiosError.message);
		}
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
		const fileRejectionMessages = fileRejections.flatMap(rejection => rejection.errors.map(rejectionError => rejectionError.message));
		setError(fileRejectionMessages.join(', '));
	}

	function generalFileValidation(files?: File[]): boolean {
		setError(undefined);
		if (!files) return true;
		if (files.length > 1) {
			setError('Nur eine Datei möglich.');
			return true;
		}
		const file = files.at(0);
		if (!file) return true;
		if (!file.name.endsWith('.sqm')) {
			setError('Nur .sqm Dateien erlaubt.');
			return true;
		}
		return false;
	}

	return (
		<Input.Wrapper error={error}>
			<Dropzone onDrop={onDrop} onReject={onReject} accept={{'application/octet-stream': ['.sqm']}} maxFiles={1}
					  maxSize={2097000} mt={'xl'} className={classes.dropzone}>
				<Group position={'center'} spacing={'xl'} style={{minHeight: 100, pointerEvents: 'none'}} noWrap>
					<Dropzone.Accept>
						<FontAwesomeIcon icon={faFileImport} size={'2x'}
										 color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<FontAwesomeIcon icon={faFileCircleQuestion} size={'2x'}
										 color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<FontAwesomeIcon icon={faFileArrowUp} size={'2x'}/>
					</Dropzone.Idle>

					<Stack spacing={7}>
						<Text size={'lg'} inline>
							Datei hineinziehen
						</Text>
						<Anchor inline>
							oder auswählen.
						</Anchor>
					</Stack>
				</Group>
			</Dropzone>
		</Input.Wrapper>

	);
}
