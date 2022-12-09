import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {EventActionTextarea} from '../EventActionTextarea';
import {Grid, Select} from '@mantine/core';
import {EventActionTextInput} from '../EventActionTextInput';
import {EventActionAutocomplete} from '../EventActionAutocomplete';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useChangeWatcher} from '../useEventUpdate';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';

export function EventMisc(): JSX.Element {
	const form = useFormContext();
	const {t} = useLanguage();

	useChangeWatcher('missionType');
	return <>
		<EventActionTextarea inputProps={{
			label: 'description',
			placeholder: 'description',
			autosize: true,
			minRows: 3,
			maxLength: EMBEDDABLE_DESCRIPTION,
		}} formPath={'description'}/>

		<Grid>
			<Grid.Col span={4}>
				<Select label={<T k={'event.missionType'}/>} placeholder={t('input.select.placeholder')}
						data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', t('event.missionType.special'), t('event.missionType.other')]}
						{...form.getInputProps('missionType')}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionAutocomplete inputProps={{
					label: 'event.missionLength',
					placeholder: 'input.unrestricted',
					maxLength: TEXT,
					data: [t('length.twoHours'), t('length.threeHours'), t('length.overFourHours')],
				}} formPath={'missionLength'}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionTextInput inputProps={{
					label: 'event.pictureUrl',
					maxLength: URL,
				}} formPath={'pictureUrl'}/>
			</Grid.Col>
		</Grid>
	</>;
}
