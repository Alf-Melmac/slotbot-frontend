import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {useFetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventEdit} from './EventEdit';
import {JSX, useEffect, useState} from 'react';
import {EventEditLoading} from './EventEditLoading';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';
import {useLanguage} from '../../../contexts/language/Language';
import {convertDtoToFormEvent} from './utils';

export function EventEditPage(): JSX.Element {
	const {t} = useLanguage();
	const [title, setTitle] = useState(t('event'));
	useTranslatedDocumentTitle('documentTitle.event.edit', [title]);

	const {eventId} = useParams<EventPageParams>();
	if (!eventId) throw Error(t('eventPage.error.missingEventId'));

	const {event, isLoading, error} = useFetchEventForEdit(eventId);
	useEffect(() => {
		if (event) {
			setTitle(event.name);
		}
	}, [event?.name]);
	if (isLoading) return <EventEditLoading/>;
	if (error || !event) return <GeneralError error={error}/>;

	return <EventEdit eventId={eventId}
					  event={convertDtoToFormEvent(event)}
					  permissions={{
						  canUploadSlotlist: event.canUploadSlotlist,
						  canRevokeShareable: event.canRevokeShareable,
					  }}/>;
}
