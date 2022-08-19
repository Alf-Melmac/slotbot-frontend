import {EventDetailsButton} from './EventDetailsButton';
import {faClone} from '@fortawesome/free-regular-svg-icons';
import {EventDetailsDto} from '../eventTypes';
import {EventWizardLocation} from '../wizard/EventWizard';

export function EventCopy(props: {eventId: EventDetailsDto['id']}): JSX.Element {
	return <EventDetailsButton icon={faClone} to={"/events/new"} state={{copy: props.eventId} as EventWizardLocation}/>;
}
