import {EventDetailsDto} from '../eventTypes';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import slotbotServerClient from '../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';

type EventDetail = {
	event: EventDetailsDto | undefined;
	eventDate: dayjs.Dayjs;
	loading: boolean;
	error: Error | null;
}

export function fetchEventDetails(eventId: string): EventDetail {
	const getEvents = () => slotbotServerClient.get(`/events/${eventId}/details`).then((res) => res.data);
	const query = useQuery<EventDetailsDto, Error>(['event', eventId], getEvents);
	const event = query.data;

	dayjs.extend(localizedFormat);
	dayjs.extend(localeData);
	const eventDate = dayjs(event?.dateTimeZoned);

	return {event, eventDate, loading: query.isLoading, error: query.error};
}
