import {JSX, useState} from 'react';
import {ActionIcon, Modal, Tooltip} from '@mantine/core';
import {UploadImage, UploadImageProps} from './UploadImage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {T} from '../../T';

export function ImageUploadModal(props: Readonly<UploadImageProps>): JSX.Element {
	const [opened, setOpened] = useState(false);
	const closeModal = () => setOpened(false);
	return <>
		<Modal opened={opened} onClose={closeModal} size={'lg'} title={<T k={'action.uploadImage'}/>}>
			<UploadImage onSuccess={fileUrl => {
				props.onSuccess?.(fileUrl);
				closeModal();
			}}/>
		</Modal>

		<Tooltip label={<T k={'action.uploadImage'}/>}>
			<ActionIcon onClick={() => setOpened(true)} style={{flexGrow: 0, alignSelf: 'end', marginBottom: 4}}>
				<FontAwesomeIcon icon={faUpload}/>
			</ActionIcon>
		</Tooltip>
	</>;
}
