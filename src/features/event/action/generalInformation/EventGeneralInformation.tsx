import {EventActionPageTitle} from '../EventActionPageTitle';
import {RequiredInformation, RequiredInformationProps} from './RequiredInformation';
import {EventTypeMask} from './EventTypeMask';
import {EventMisc} from './EventMisc';
import {JSX} from 'react';
import {Grid} from '@mantine/core';

type EventGeneralInformationProps = RequiredInformationProps;

export function EventGeneralInformation(props: Readonly<EventGeneralInformationProps>): JSX.Element {
	return <>
		<EventActionPageTitle title={'event.wizard.step.general.description'}/>

		<Grid rowGap={'sm'}>
			<RequiredInformation canRevokeShareable={props.canRevokeShareable}/>
			<EventTypeMask/>
			<EventMisc/>
		</Grid>
	</>;
}
