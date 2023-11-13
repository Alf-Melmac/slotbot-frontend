import {EventDetailsDto, EventEditDto} from './eventTypes';
import {Dayjs} from 'dayjs';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {convertUtcDateTimeToLocal, convertUtcToLocal} from '../../utils/dateHelper';

export type EventDetail = {
	/**
	 * Event details without the date and time
	 */
	event: Omit<EventDetailsDto, 'dateTime'>;
	/**
	 * Event date and time in the local timezone
	 */
	eventDate: Dayjs;
}

type EventDetailResult = (
		{
			/**
			 * Not yet loaded
			 */
			event?: never;
			/**
			 * Not yet loaded event
			 */
			eventDate?: never;
		}
		| EventDetail
		)
	& Pick<UseQueryResult<EventDetailsDto, Error>, 'isLoading' | 'error'>;

export function useFetchEventDetails(eventId: string): EventDetailResult {
	const getEventDetails = () => slotbotServerClient.get(`/events/${eventId}/details`).then((res) => res.data);
	const query = useQuery<EventDetailsDto, Error>({
		queryKey: ['eventDetails', eventId],
		queryFn: getEventDetails,
	});
	const queryStatus = {isLoading: query.isLoading, error: query.error};
	if (!query.data) {
		return queryStatus;
	}

	const {dateTime, ...event} = query.data;
	return {event, eventDate: convertUtcToLocal(dateTime), ...queryStatus};
}

type EventForEdit = {
	event: EventEditDto | undefined;
} & Pick<UseQueryResult<EventEditDto, Error>, 'isLoading' | 'error'>;

export function useFetchEventForEdit(eventId: string): EventForEdit {
	const getEventForEdit = () => slotbotServerClient.get(`/events/${eventId}/edit`).then((res) => res.data);
	const query = useQuery<EventEditDto, Error>({
		queryKey: ['eventForEdit', eventId],
		queryFn: getEventForEdit,
	});
	let event = query.data;

	if (event) {
		event = {...event, dateTime: convertUtcDateTimeToLocal(event.dateTime)};
	}

	return {event, isLoading: query.isLoading, error: query.error};
}
