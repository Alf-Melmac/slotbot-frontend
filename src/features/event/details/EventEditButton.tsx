import {EventDetailsButton} from './EventDetailsButton';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {EventDetailsDto} from '../eventTypes';

export function EventEditButton(props: {eventId: EventDetailsDto['id']}): JSX.Element {
	return <EventDetailsButton icon={faEdit} to={`/events/${props.eventId}/edit`}/>;
}
