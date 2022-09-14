import {Grid} from '@mantine/core';
import {EventAction, EventActionPageProps} from '../EventActionPage';
import {EventTitle} from './EventTitle';
import {EventPrivacySettings} from './EventPrivacySettings';

export type RequiredInformationProps<FormReturnType = EventAction> =
	EventActionPageProps<FormReturnType> & { canRevokeShareable?: boolean; }

export function RequiredInformation<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
	return (
		<Grid>
			<Grid.Col md={9} span={12}>
				<EventTitle {...props}/>
			</Grid.Col>
			<Grid.Col md={3} span={12}>
				<EventPrivacySettings {...props}/>
			</Grid.Col>
		</Grid>
	);
}
