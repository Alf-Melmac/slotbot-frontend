import {EventActionPageTitle} from '../EventActionPage';
import {RequiredInformation, RequiredInformationProps} from './RequiredInformation';
import {EventTypeMask} from './EventTypeMask';
import {EventMisc} from './EventMisc';

export function EventGeneralInformation(props: RequiredInformationProps): JSX.Element {
	return <>
		<EventActionPageTitle title={'generalInformation'}/>

		<RequiredInformation {...props}/>
		<EventTypeMask/>
		<EventMisc/>
	</>;
}
