import {Nav} from '../../components/nav/Nav';
import {Button, Container, Stack} from '@mantine/core';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useDocumentTitle} from '@mantine/hooks';
import {errorNotification, successNotification} from '../../utils/notificationHelper';

export function AdminUtils(): JSX.Element {
	useDocumentTitle('Admin - Utils');
	const [action, setAction] = useState('');
	const postAction = () => slotbotServerClient.post(`/admin/utils/${action}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postAction, {
		onSuccess: () => successNotification(action),
		onError: errorNotification,
	});
	useEffect(() => {
		if (!action) return;
		mutate();
	}, [action]);

	return (
		<Nav>
			<Container>
				<Stack mt={'xl'}>
					<Button size={'lg'} onClick={() => setAction('listFiles')}>Update file list</Button>
					<Button size={'lg'} color={'red'} onClick={() => setAction('deleteUnusedEventTypes')}>Remove unused event types</Button>
					<Button size={'lg'} onClick={() => setAction('rebuildEventNotifications')}>Rebuild event notifications</Button>
					<Button size={'lg'} onClick={() => setAction('rebuildCalendars')}>Rebuild global ICS calendars</Button>
				</Stack>
			</Container>
		</Nav>
	);
}
