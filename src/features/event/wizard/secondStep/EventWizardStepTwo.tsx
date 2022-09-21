import {EventWizardStepProps} from '../EventWizard';
import {EventActionPageTitle} from '../../action/EventActionPage';
import {EventDetails} from '../../action/details/EventDetails';

export function EventWizardStepTwo(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return <>
		<EventActionPageTitle>Details</EventActionPageTitle>

		<EventDetails form={form}/>
	</>;
}
