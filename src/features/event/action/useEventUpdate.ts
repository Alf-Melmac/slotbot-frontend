import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useEventPage} from '../../../contexts/event/EventPageContext';
import {EventEditDto} from '../eventTypes';
import {errorNotification, successNotification} from '../../../utils/notificationHelper';

export function useEventTextChange(formPath: string, value: string, onSuccess?: (saved: string) => void) {
	const eventId = useEventPage();
	const postTextChange = () => slotbotServerClient.put(`/events/${eventId}/edit/text`, {
		[formPath]: value,
	}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postTextChange, {
		onSuccess: () => {
			onSuccess?.(value);
			successNotification(value);
		},
		onError: errorNotification,
	});

	return {mutate};
}

export function useEventUpdate(formPath: string, data: unknown, onSuccess?: (saved: EventEditDto) => void) {
	const eventId = useEventPage();
	const postEventUpdate = () => slotbotServerClient.put(`/events/${eventId}`, data).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>(postEventUpdate, {
		onSuccess: (response) => {
			onSuccess?.(response);
			successNotification();
		},
		onError: errorNotification,
	});

	return {mutate};
}
