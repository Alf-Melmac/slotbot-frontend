import {EventDetailsDto, EventEditDto} from './eventTypes';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import slotbotServerClient from '../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

type EventDetail = {
	event: EventDetailsDto | undefined;
	eventDate: dayjs.Dayjs;
	loading: boolean;
	error: Error | null;
}

export function fetchEventDetails(eventId: string): EventDetail {
	const getEventDetails = () => slotbotServerClient.get(`/events/${eventId}/details`).then((res) => res.data);
	const query = useQuery<EventDetailsDto, Error>(['eventDetails', eventId], getEventDetails);
	const event = query.data;

	dayjs.extend(localizedFormat);
	dayjs.extend(localeData);
	const eventDate = dayjs(event?.dateTimeZoned);

	return {event, eventDate, loading: query.isLoading, error: query.error};
}

type EventForEdit = {
	event: EventEditDto | undefined;
	loading: boolean;
	error: Error | null;
}

export function fetchEventForEdit(eventId: string): EventForEdit {
	const getEventForEdit = () => slotbotServerClient.get(`/events/${eventId}/edit`).then((res) => res.data);
	const query = useQuery<EventEditDto, Error>(['eventForEdit', eventId], getEventForEdit);
	const event = query.data;

	return {event, loading: query.isLoading, error: query.error};
}
