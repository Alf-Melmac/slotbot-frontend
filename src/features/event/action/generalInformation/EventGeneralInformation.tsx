import {EventActionPageTitle} from '../EventActionPageTitle';
import {RequiredInformation, RequiredInformationProps} from './RequiredInformation';
import {EventTypeMask} from './EventTypeMask';
import {EventMisc} from './EventMisc';
import {JSX} from 'react';

export function EventGeneralInformation(props: Readonly<RequiredInformationProps>): JSX.Element {
	return <>
		<EventActionPageTitle title={'generalInformation'}/>

		<RequiredInformation {...props}/>
		<EventTypeMask/>
		<EventMisc/>
	</>;
}
