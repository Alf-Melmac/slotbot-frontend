import {EventActionPageTitle} from '../EventActionPage';
import {EventDetails} from './EventDetails';

export function EventDetailsPage(): JSX.Element {
	return <>
		<EventActionPageTitle>Details</EventActionPageTitle>

		<EventDetails/>
	</>;
}
