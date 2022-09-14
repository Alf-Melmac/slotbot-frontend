import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {fetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {Skeleton} from '@mantine/core';
import {EventEditDto} from '../eventTypes';
import {EventEdit} from './EventEdit';
import {parseDate, parseTime} from '../../../utils/dateHelper';

export type EventEditFormType = Omit<EventEditDto, 'canRevokeShareable'>;

export function EventEditPage(): JSX.Element {
	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const {event, loading, error} = fetchEventForEdit(eventId);
	if (loading) return <Skeleton height={500} width={500}/>; //TODO loading animation
	if (error || !event) return <GeneralError error={error}/>;

	if (typeof event.date === 'string') {
		event.date = parseDate(event.date);
	}
	if (typeof event.startTime === 'string') {
		event.startTime = parseTime(event.startTime);
	}
	return <EventEdit eventId={eventId} event={event}/>;
}
