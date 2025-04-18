import {TEXT, URL} from '../../../../utils/maxLength';
import {Grid, Select} from '@mantine/core';
import {EventActionAutocomplete} from '../EventActionAutocomplete';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useChangeWatcher} from '../useEventUpdate';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {EventActionUpload} from '../EventActionUpload';
import {JSX} from 'react';
import {EventDescription} from './EventDescription';

export function EventMisc(): JSX.Element {
	const form = useFormContext();
	const {t} = useLanguage();

	useChangeWatcher('missionType');
	return <>
		<EventDescription/>

		<Grid>
			<Grid.Col span={{base: 6, xs: 4}}>
				<Select label={<T k={'event.missionType'}/>} placeholder={t('input.select.placeholder')}
						data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', t('event.missionType.special'), t('event.missionType.other')]}
						{...form.getInputProps('missionType')}/>
			</Grid.Col>
			<Grid.Col span={{base: 6, xs: 4}}>
				<EventActionAutocomplete inputProps={{
					label: 'event.missionLength',
					placeholder: 'input.unrestricted',
					maxLength: TEXT,
					clearable: true,
					data: [t('length.twoHours'), t('length.threeHours'), t('length.fourHours'), t('length.overFourHours')],
				}} formPath={'missionLength'}/>
			</Grid.Col>
			<Grid.Col span={{base: 12, xs: 4}}>
				<EventActionUpload inputProps={{
					label: 'event.pictureUrl',
					placeholder: 'https://',
					maxLength: URL,
				}} formPath={'pictureUrl'}/>
			</Grid.Col>
		</Grid>
	</>;
}
