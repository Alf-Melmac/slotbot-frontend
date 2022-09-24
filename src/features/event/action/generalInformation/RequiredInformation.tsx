import {Grid} from '@mantine/core';
import {EventAction, EventActionPageProps} from '../EventActionPage';
import {EventPrivacySettings} from './EventPrivacySettings';
import {TEXT} from '../../../../utils/maxLength';
import {EventDate} from './EventDate';
import {EventStartTime} from './EventStartTime';
import {EventActionTextInput} from '../EventActionTextInput';

export type RequiredInformationProps<FormReturnType extends EventAction> = EventActionPageProps<FormReturnType> & {
	canRevokeShareable?: boolean;
};

export function RequiredInformation<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
	return <>
		<Grid>
			<Grid.Col md={9} span={12}>
				<EventActionTextInput {...props} inputProps={{
					label: 'Titel',
					placeholder: 'Event Name',
					maxLength: TEXT,
					required: true,
				}} formPath={'name'}/>
			</Grid.Col>
			<Grid.Col md={3} span={12}>
				<EventPrivacySettings {...props}/>
			</Grid.Col>
		</Grid>

		<Grid>
			<Grid.Col md={4} span={6}>
				<EventDate {...props}/>
			</Grid.Col>
			<Grid.Col md={4} span={6}>
				<EventStartTime {...props}/>
			</Grid.Col>
			<Grid.Col md={4} span={12}>
				<EventActionTextInput {...props} inputProps={{
					label: 'Ersteller',
					maxLength: TEXT,
					required: true,
				}} formPath={'creator'}/>
			</Grid.Col>
		</Grid>
	</>;
}
