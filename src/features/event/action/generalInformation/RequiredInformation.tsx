import {Grid, Stack} from '@mantine/core';
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
				<Stack align={'flex-start'} spacing={'xs'}>
					<EventPrivacySettings {...props}/>
				</Stack>
			</Grid.Col>
		</Grid>
	);
}
