import {EventActionPageTitle} from '../EventActionPageTitle';
import {RequiredInformation, RequiredInformationProps} from './RequiredInformation';
import {EventTypeMask, EventTypeMaskProps} from './EventTypeMask';
import {EventMisc} from './EventMisc';
import {JSX} from 'react';

type EventGeneralInformationProps = RequiredInformationProps & EventTypeMaskProps;

export function EventGeneralInformation(props: Readonly<EventGeneralInformationProps>): JSX.Element {
	return <>
		<EventActionPageTitle title={'generalInformation'}/>

		<RequiredInformation canRevokeShareable={props.canRevokeShareable}/>
		<EventTypeMask ownerGuild={props.ownerGuild}/>
		<EventMisc/>
	</>;
}
