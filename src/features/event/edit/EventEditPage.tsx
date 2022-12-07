import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {fetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventEditDto} from '../eventTypes';
import {EventEdit} from './EventEdit';
import {parseDate, parseTime} from '../../../utils/dateHelper';
import {useEffect, useState} from 'react';
import {replaceNullWithEmpty, replaceNullWithUndefined} from '../../../utils/typesHelper';
import {EventEditLoading} from './EventEditLoading';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';
import {useLanguage} from '../../../contexts/language/Language';

export type EventEditFormType = Omit<EventEditDto, 'canRevokeShareable'>;

export function EventEditPage(): JSX.Element {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t('event'));
	useTranslatedDocumentTitle('documentTitle.event.edit', [title]);

	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error('Invalid state: Event id required');

	const {event, loading, error} = fetchEventForEdit(eventId);
	useEffect(() => {
		if (event) {
			setTitle(event.name);
		}
	}, [event]);
	if (loading) return <EventEditLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	if (typeof event.date === 'string') {
		event.date = parseDate(event.date);
	}
	if (typeof event.startTime === 'string') {
		event.startTime = parseTime(event.startTime);
	}

	replaceNullWithEmpty(event, ['description', 'missionLength', 'missionType', 'pictureUrl']);
	replaceNullWithUndefined(event, ['reserveParticipating']);

	return <EventEdit eventId={eventId} event={event}/>;
}
