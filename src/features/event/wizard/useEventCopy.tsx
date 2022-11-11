import {useLocation} from 'react-router-dom';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {EventPostDto} from '../eventTypes';
import {AxiosError} from 'axios';
import {randomId} from '@mantine/hooks';
import {omit} from 'lodash';
import {showNotification} from '@mantine/notifications';
import {EventWizardLocation} from './EventWizard';
import {useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';
import {replaceNullWithEmpty, replaceNullWithUndefined} from '../../../utils/typesHelper';

export function useEventCopy(form: ReturnType<typeof useEventWizardForm>) {
	const state = useLocation().state as EventWizardLocation | null;
	const copyEvent = state?.copy;
	const getEventForCopy = () => slotbotServerClient.get(`/events/${copyEvent}/copy`).then((res) => res.data);
	useQuery<EventPostDto, AxiosError>(['copyEvent', copyEvent], getEventForCopy, {
		enabled: !!copyEvent,
		onSuccess: (data) => {
			data.details.forEach(field => field.id = randomId());
			data.squadList.forEach(squad => {
				squad.id = randomId();
				squad.slotList.forEach(slot => slot.id = randomId());
			});
			replaceNullWithEmpty(data, ['description', 'missionLength', 'missionType', 'pictureUrl']);
			replaceNullWithUndefined(data, ['reserveParticipating']);
			form.setValues(omit(data, ['date', 'startTime']) as EventPostDto);
		},
		onError: (error) => {
			showNotification({
				title: 'Kopieren fehlgeschlagen.',
				message: error.message,
				color: 'red',
				autoClose: false,
			});
		},
	});

	return {copyEvent};
}
