import {EventAction, EventActionPageTitle, EventActionWrapperProps} from '../EventActionPage';
import {EventDetails} from './EventDetails';

export function EventDetailsPage<FormReturnType extends EventAction>(props: EventActionWrapperProps<FormReturnType>): JSX.Element {
	const {form, editMode = false} = props;

	return <>
		<EventActionPageTitle>Details</EventActionPageTitle>

		<EventDetails form={form} editMode={editMode}/>
	</>;
}
