import {Nav} from '../../components/nav/Nav';
import {Button, Container, Stack} from '@mantine/core';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useTranslatedDocumentTitle} from '../../hooks/useTranslatedDocumentTitle';

export function AdminUtils(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.admin.utils');
	const [action, setAction] = useState('');
	const postAction = () => slotbotServerClient.post(`/admin/utils/${action}`).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postAction, {
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
		<Nav>
			<Container>
				<Stack mt={'xl'}>
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
			</Container>
		</Nav>
	);
}
