import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useEventPage} from '../../../contexts/event/EventPageContext';
import {EventEditDto, EventUpdateDto} from '../eventTypes';
import {errorNotification, successNotification} from '../../../utils/notificationHelper';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEventAction} from '../../../contexts/event/action/EventActionContext';
import {usePrevious} from '@mantine/hooks';
import {useEffect} from 'react';
import {convertUtcDateTimeToLocal} from '../../../utils/dateHelper';

export function useEventTextChange(formPath: string, value: string, onSuccess?: (saved: string) => void) {
	const queryClient = useQueryClient();
	const eventId = useEventPage();
	const postTextChange = () => slotbotServerClient.put(`/events/${eventId}/edit/text`, {
		[formPath]: value,
	}).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>({
		mutationFn: postTextChange,
		onSuccess: (response) => {
			// @ts-ignore Posted it like that, so response is the same format
			onSuccess?.(response[formPath]);
			// @ts-ignore
			successNotification(response[formPath]);
			// noinspection JSIgnoredPromiseFromCall
			queryClient.invalidateQueries({queryKey: ['eventForEdit', eventId]});
		},
		onError: errorNotification,
	});

	return {mutate};
}

export function useEventUpdate(data: Partial<EventUpdateDto>, onSuccess?: (saved: EventEditDto) => void) {
	const queryClient = useQueryClient();
	const eventId = useEventPage();
	const postEventUpdate = () => slotbotServerClient.put(`/events/${eventId}`, data).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>({
		mutationFn: postEventUpdate,
		onSuccess: (response: EventEditDto) => {
			const result = {...response, dateTime: convertUtcDateTimeToLocal(response.dateTime)};
			queryClient.setQueryData(['eventForEdit', eventId], result);
			onSuccess?.(result);
			successNotification();
		},
		onError: errorNotification,
	});

	return {mutate};
}

export function useChangeWatcher(field: string) {
	const form = useFormContext();
	const {editMode} = useEventAction();

	// @ts-ignore
	const formValue = form.values[field];
	const {mutate} = useEventUpdate({[field]: formValue},
		// @ts-ignore
		result => form.setFieldValue(field, result[field]));
	const previous = usePrevious(formValue);
	useEffect(() => {
		if (!editMode || previous === undefined || previous === formValue || !form.isValid(field)) return;
		mutate();
	}, [formValue]);
}
