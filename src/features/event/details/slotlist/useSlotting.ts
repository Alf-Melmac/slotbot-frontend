import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useEventDetailsSlotlist} from '../../../../contexts/event/details/slotlist/EventDetailsSlotlistContext';
import {EventDetailsDto} from '../../eventTypes';
import {errorNotification} from '../../../../utils/notificationHelper';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {AxiosError} from 'axios';
import {useEffect} from 'react';
import {EventSlotlistSlotProps} from './Slot';

export function useSlotting(id: EventSlotlistSlotProps['slot']['id']) {
	const queryClient = useQueryClient();
	const {setPendingSlotting, eventId} = useEventDetailsSlotlist();
	const mutationOptions = {
		onSuccess: (data: EventDetailsDto) => {
			queryClient.setQueryData(['eventDetails', eventId.toString()], data);
			setPendingSlotting(false);
		},
		onError: errorNotification,
	};
	const putSlotting = () => slotbotServerClient.put(`/events/slotting/${id}`).then((res) => res.data);
	const {
		mutate: mutateSlotting,
		isLoading: slottingLoading,
	} = useMutation<EventDetailsDto, AxiosError>(putSlotting, mutationOptions);
	const putUnslotting = () => slotbotServerClient.put(`/events/unslotting/${id}`).then((res) => res.data);
	const {
		mutate: mutateUnslotting,
		isLoading: unslottingLoading,
	} = useMutation<EventDetailsDto, AxiosError>(putUnslotting, mutationOptions);

	useEffect(() => {
		if (slottingLoading || unslottingLoading) {
			setPendingSlotting(true);
		}
	}, [slottingLoading, unslottingLoading]);

	return {
		mutateSlotting,
		mutateUnslotting,
	};
}
