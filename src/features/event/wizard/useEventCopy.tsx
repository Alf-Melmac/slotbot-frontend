import {useLocation} from 'react-router';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {EventPostDto} from '../eventTypes';
import {AxiosError} from 'axios';
import {randomId} from '@mantine/hooks';
import {showNotification} from '@mantine/notifications';
import {EventWizardLocation} from './EventWizard';
import {useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../components/T';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../contexts/authentication/AuthProvider';
import {convertDtoToWizardFormEvent} from '../edit/utils';

export function useEventCopy(form: ReturnType<typeof useEventWizardForm>) {
	const state = useLocation().state as EventWizardLocation | null;
	const copyEvent = state?.copy;
	const [updated, setUpdated] = useState(false);
	const [shouldUpdate, setShouldUpdate] = useState(false);
	useEffect(() => {
		setShouldUpdate(!!copyEvent && !updated);
	}, [copyEvent, updated]);
	const getEventForCopy = () => slotbotServerClient.get(`/events/${copyEvent}/copy`).then((res) => res.data);
	const query = useQuery<EventPostDto, AxiosError>({
		queryKey: ['copyEvent', copyEvent],
		queryFn: getEventForCopy,
		enabled: shouldUpdate,
	});

	const {user} = useAuth();
	useEffect(() => {
		const data = query.data;
		if (data) {
			data.details.forEach(field => field.id = randomId());
			data.squadList.forEach(squad => {
				squad.id = randomId();
				squad.slotList.forEach(slot => slot.id = randomId());
			});
			if (user) {
				data.creator = user.name;
			}
			form.setValues(convertDtoToWizardFormEvent(data));
			setUpdated(true);
		}
	}, [query.data]);

	useEffect(() => {
		if (query.error) {
			showNotification({
				title: <T k={'error.notification.copying'}/>,
				message: query.error.message,
				color: 'red',
				autoClose: false,
			});
		}
	}, [query.error]);

	return {isLoading: shouldUpdate && query.isLoading};
}
