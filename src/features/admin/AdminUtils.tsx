import {Button, Stack} from '@mantine/core';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {JSX, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useTranslatedDocumentTitle} from '../../hooks/useDocumentTitle';

export default function AdminUtils(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.admin.utils');
	const [action, setAction] = useState('');
	const postAction = () => slotbotServerClient.post(`/admin/utils/${action}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>({
		mutationFn: postAction,
		onSuccess: () => {
			successNotification(action);
			setAction('');
		},
		onError: errorNotification,
	});
	useEffect(() => {
		if (!action) return;
		mutate();
	}, [action]);

	return (
		<Stack>
			<Button size={'lg'} onClick={() => setAction('listFiles')}>
				<T k={'admin.utils.listFiles'}/>
			</Button>
			<Button size={'lg'} color={'red'} onClick={() => setAction('deleteUnusedEventTypes')}>
				<T k={'admin.utils.deleteUnusedEventTypes'}/>
			</Button>
			<Button size={'lg'} onClick={() => setAction('rebuildEventNotifications')}>
				<T k={'admin.utils.rebuildEventNotifications'}/>
			</Button>
			<Button size={'lg'} onClick={() => setAction('rebuildCalendars')}>
				<T k={'admin.utils.rebuildCalendars'}/>
			</Button>
		</Stack>
	);
}
