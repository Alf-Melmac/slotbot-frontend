import {Grid} from '@mantine/core';
import {EventPrivacySettings} from './EventPrivacySettings';
import {TEXT} from '../../../../utils/maxLength';
import {EventDate} from './EventDate';
import {EventStartTime} from './EventStartTime';
import {EventActionTextInput} from '../EventActionTextInput';
import {EventEditDto} from '../../eventTypes';
import {JSX} from 'react';

export type RequiredInformationProps = Partial<Pick<EventEditDto, 'canRevokeShareable'>>;

export function RequiredInformation(props: Readonly<RequiredInformationProps>): JSX.Element {
	return <>
		<Grid>
			<Grid.Col span={{base: 12, md: 9}}>
				<EventActionTextInput inputProps={{
					label: 'event.name',
					placeholder: 'event.name.placeholder',
					maxLength: TEXT,
					required: true,
				}} formPath={'name'}/>
			</Grid.Col>
			<Grid.Col span={{base: 12, md: 3}}>
				<EventPrivacySettings {...props}/>
			</Grid.Col>
		</Grid>

		<Grid>
			<Grid.Col span={{base: 6, md: 4}}>
				<EventDate/>
			</Grid.Col>
			<Grid.Col span={{base: 6, md: 4}}>
				<EventStartTime/>
			</Grid.Col>
			<Grid.Col span={{base: 12, md: 4}}>
				<EventActionTextInput inputProps={{
					label: 'event.creator',
					maxLength: TEXT,
					required: true,
				}} formPath={'creator'}/>
			</Grid.Col>
		</Grid>
	</>;
}
