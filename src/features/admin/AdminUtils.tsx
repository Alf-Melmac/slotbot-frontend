import {Button, Group, Stack, TextInput} from '@mantine/core';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {JSX, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';

export default function AdminUtils(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.admin.utils');
	const [action, setAction] = useState('');
	const [body, setBody] = useState('');
	const postAction = () => slotbotServerClient.post(`/admin/utils/${action}`, body, {headers: {'Content-Type': 'text/plain'}}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: postAction,
		onSuccess: () => {
			successNotification(action);
		},
		onError: errorNotification,
		onSettled: () => {
			setAction('');
			setBody('');
		}
	});
	useEffect(() => {
		if (!action) return;
		mutate();
	}, [action]);

	return (
		<Stack>
			<Button size={'lg'} onClick={() => setAction('listFiles')}>
				Update file list
			</Button>
			<Button size={'lg'} color={'red'} onClick={() => setAction('deleteUnusedEventTypes')}>
				Remove unused event types
			</Button>
			<Button size={'lg'} onClick={() => setAction('rebuildEventNotifications')}>
				Rebuild event notifications
			</Button>
			<Button size={'lg'} onClick={() => setAction('rebuildCalendars')}>
				Rebuild global ICS calendars
			</Button>
			<Group align={'flex-end'} grow>
				<TextInput label={'Guild ID'} placeholder={'123456789012345678'} value={body}
						   onChange={(e) => setBody(e.currentTarget.value)}/>
				<Button size={'lg'} color={'red'} onClick={() => setAction('leaveGuild')}>
					Leave Guild
				</Button>
			</Group>
		</Stack>
	);
}
