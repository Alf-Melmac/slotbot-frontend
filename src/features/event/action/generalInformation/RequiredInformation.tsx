import {Grid} from '@mantine/core';
import {EventPrivacySettings} from './EventPrivacySettings';
import {TEXT} from '../../../../utils/maxLength';
import {EventDate} from './EventDate';
import {EventStartTime} from './EventStartTime';
import {EventActionTextInput} from '../EventActionTextInput';
import {EventEditDto} from '../../eventTypes';

export type RequiredInformationProps = Partial<Pick<EventEditDto, 'canRevokeShareable'>>;

export function RequiredInformation(props: RequiredInformationProps): JSX.Element {
	return <>
		<Grid>
			<Grid.Col md={9} span={12}>
				<EventActionTextInput inputProps={{
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
				<EventDate/>
			</Grid.Col>
			<Grid.Col md={4} span={6}>
				<EventStartTime/>
			</Grid.Col>
			<Grid.Col md={4} span={12}>
				<EventActionTextInput inputProps={{
					label: 'Ersteller',
					maxLength: TEXT,
					required: true,
				}} formPath={'creator'}/>
			</Grid.Col>
		</Grid>
	</>;
}
