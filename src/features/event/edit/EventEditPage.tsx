import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {fetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventEdit} from './EventEdit';
import {useEffect, useState} from 'react';
import {replaceNullWithEmpty, replaceNullWithUndefined} from '../../../utils/typesHelper';
import {EventEditLoading} from './EventEditLoading';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';
import {useLanguage} from '../../../contexts/language/Language';

export function EventEditPage(): JSX.Element {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t('event'));
	useTranslatedDocumentTitle('documentTitle.event.edit', [title]);

	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error(t('eventPage.error.missingEventId'));

	const {event, isLoading, error} = fetchEventForEdit(eventId);
	useEffect(() => {
		if (event) {
			setTitle(event.name);
		}
	}, [event]);
	if (isLoading) return <EventEditLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	replaceNullWithEmpty(event, ['description', 'missionLength', 'missionType', 'pictureUrl']);
	replaceNullWithUndefined(event, ['reserveParticipating']);

	return <EventEdit eventId={eventId} event={event}/>;
}
