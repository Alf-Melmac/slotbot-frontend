import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {fetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {Skeleton} from '@mantine/core';
import {EventEditDto} from '../eventTypes';
import {EventEdit} from './EventEdit';
import {parseDate, parseTime} from '../../../utils/dateHelper';
import {useEffect, useState} from 'react';
import {useDocumentTitle} from '@mantine/hooks';

export type EventEditFormType = Omit<EventEditDto, 'canRevokeShareable'>;

export function EventEditPage(): JSX.Element {
	const [title, setTitle] = useState('Bearbeiten - Event');
	useDocumentTitle(title);

	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const {event, loading, error} = fetchEventForEdit(eventId);
	useEffect(() => {
		if (event) {
			setTitle(`Bearbeiten - ${event.name}`);
		}
	}, [event]);
	if (loading) return <Skeleton height={500} width={500}/>; //TODO loading animation
	if (error || !event) return <GeneralError error={error}/>;

	if (typeof event.date === 'string') {
		event.date = parseDate(event.date);
	}
	if (typeof event.startTime === 'string') {
		event.startTime = parseTime(event.startTime);
	}
	//Prepare event edit string fields for display
	if (event.description === null) {
		event.description = '';
	}
	if (event.missionType === null) {
		event.missionType = '';
	}
	if (event.missionLength === null) {
		event.missionLength = '';
	}
	if (event.pictureUrl === null) {
		event.pictureUrl = '';
	}
	if (event.reserveParticipating === null) {
		event.reserveParticipating = undefined;
	}

	return <EventEdit eventId={eventId} event={event}/>;
}
