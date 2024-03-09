import {EventDetailsButton} from './EventDetailsButton';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {EventDetailsDto} from '../eventTypes';
import {JSX} from 'react';

export function EventEditButton(props: Readonly<{ eventId: EventDetailsDto['id'] }>): JSX.Element {
	return <EventDetailsButton icon={faEdit} to={`/events/${props.eventId}/edit`} tooltip={'breadcrumb.edit'}/>;
}
