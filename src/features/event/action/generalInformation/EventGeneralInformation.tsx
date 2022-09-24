import {EventAction, EventActionPageTitle, EventActionWrapperProps} from '../EventActionPage';
import {RequiredInformation} from './RequiredInformation';
import {EventTypeMask} from './EventTypeMask';
import {EventMisc} from './EventMisc';

type EventGeneralInformationProps<FormReturnType extends EventAction> =
	EventActionWrapperProps<FormReturnType> & { canRevokeShareable?: boolean; }

export function EventGeneralInformation<FormReturnType extends EventAction>(props: EventGeneralInformationProps<FormReturnType>): JSX.Element {
	const {form, editMode = false, canRevokeShareable} = props;
	return <>
		<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>

		<RequiredInformation form={form} editMode={editMode} canRevokeShareable={canRevokeShareable}/>
		<EventTypeMask form={form} editMode={editMode}/>
		<EventMisc form={form} editMode={editMode}/>
	</>;
}
