import {JSX, useState} from 'react';
import {Modal, ModalProps} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export type OpenSharedModalType = (title: ModalProps['title'], content: ModalProps['children']) => void;
export type CloseSharedModalType = () => void;
export type SharedModalChild = {
	openModal: OpenSharedModalType;
	closeModal: CloseSharedModalType;
};

type SharedModalProps = Pick<ModalProps, 'size'> & {
	children: (openModal: OpenSharedModalType,
			   closeModal: CloseSharedModalType) => JSX.Element;
};

export function SharedModal({children, ...modalProps}: Readonly<SharedModalProps>) {
	const [modalTitle, setModalTitle] = useState<ModalProps['title']>();
	const [modalContent, setModalContent] = useState<ModalProps['children']>();
	const [opened, {open, close}] = useDisclosure(false);

	function openModal(title: ModalProps['title'], content: ModalProps['children']) {
		setModalTitle(title);
		setModalContent(content);
		open();
	}

	function closeModal() {
		close();
		setModalTitle(undefined);
		setModalContent(undefined);
	}

	return <>
		{children(openModal, closeModal)}
		<Modal {...modalProps} opened={opened} onClose={closeModal} title={modalTitle}>
			{modalContent}
		</Modal>
	</>;
}
