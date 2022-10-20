import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {showNotification} from '@mantine/notifications';
import {useEventPage} from '../../../contexts/event/EventPageContext';

export function useEventTextChange(formPath: string, value: string, onSuccess?: (saved: string) => void) {
	const eventId = useEventPage();
	const postTextChange = () => slotbotServerClient.put(`/events/${eventId}/edit/text`, {
		[formPath]: value
	}).then(voidFunction);
	const {mutate} = useMutation<void, AxiosError>(postTextChange, {
		onSuccess: () => {
			onSuccess?.(value);
			showNotification({title: 'Gespeichert', message: value, color: 'green'});
		},
		onError: error => {
			showNotification({
				title: `Speichern fehlgeschlagen. ${error.code ? `(${error.code})` : ''}`,
				message: error.message,
				color: 'red',
			});
		},
	});

	return {mutate};
}
