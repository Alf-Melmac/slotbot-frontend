import {useParams} from 'react-router-dom';
import {EventPageParams} from '../EventRoutes';
import {useFetchEventForEdit} from '../EventFetcher';
import {GeneralError} from '../../../components/error/GeneralError';
import {EventEdit} from './EventEdit';
import {JSX, useEffect} from 'react';
import {EventEditLoading} from './EventEditLoading';
import {useDynamicDocumentTitleForItem} from '../../../hooks/useDocumentTitle';
import {useLanguage} from '../../../contexts/language/Language';
import {convertDtoToFormEvent} from './utils';

export default function EventEditPage(): JSX.Element {
	const setTitle = useDynamicDocumentTitleForItem('documentTitle.edit.item', 'event');

	const {t} = useLanguage();
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
