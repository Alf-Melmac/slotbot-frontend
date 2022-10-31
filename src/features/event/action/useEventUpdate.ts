import slotbotServerClient, {voidFunction} from '../../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useEventPage} from '../../../contexts/event/EventPageContext';
import {EventEditDto} from '../eventTypes';
import {errorNotification, successNotification} from '../../../utils/notificationHelper';
import {useFormContext} from '../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../contexts/event/action/EditModeContext';
import {usePrevious} from '@mantine/hooks';
import {useEffect} from 'react';

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

export function useEventUpdate(data: unknown, onSuccess?: (saved: EventEditDto) => void) {
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

export function useEventSlotListUpdate(data: unknown, onSuccess?: (saved: EventEditDto) => void) {
	const eventId = useEventPage();
	const postEventUpdate = () => slotbotServerClient.put(`/events/${eventId}/slotlist`, data).then((res) => res.data);
	const {mutate} = useMutation<EventEditDto, AxiosError>(postEventUpdate, {
		onSuccess: (response) => {
			onSuccess?.(response);
			successNotification();
		},
		onError: errorNotification,
	});

	return {mutate};
}

export function useChangeWatcher(field: string) {
	const form = useFormContext();
	const editMode = useEditMode();

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
