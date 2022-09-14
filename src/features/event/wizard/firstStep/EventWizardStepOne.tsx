import {EventTypeMask} from '../../action/generalInformation/EventTypeMask';
import {EventWizardStepProps} from '../EventWizard';
import {EventActionPageTitle} from '../../action/EventActionPage';
import {RequiredInformation} from '../../action/generalInformation/RequiredInformation';
import {EventMisc} from '../../action/generalInformation/EventMisc';

export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return <>
		<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>
		<RequiredInformation form={form}/>
		<EventTypeMask form={form}/>
		<EventMisc form={form}/>
	</>;
}
