import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {EventActionTextarea} from '../EventActionTextarea';
import {Grid, Select} from '@mantine/core';
import {EventActionTextInput} from '../EventActionTextInput';
import {changeHandler} from '../../../../utils/formHelper';
import {EventActionAutocomplete} from '../EventActionAutocomplete';
import {useFormContext} from '../EventActionFormContext';
import {useEditMode} from '../EditModeContext';

export function EventMisc(): JSX.Element {
	const form = useFormContext();

	const missionTypeInputProps = form.getInputProps('missionType');
	return <>
		<EventActionTextarea inputProps={{
			label: 'Beschreibung',
			placeholder: 'Beschreibung',
			autosize: true,
			minRows: 3,
			maxLength: EMBEDDABLE_DESCRIPTION,
		}} formPath={'description'}/>

		<Grid>
			<Grid.Col span={4}>
				<Select label={'Missionstyp'} placeholder={'Auswählen...'}
						data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', 'Spezial', 'Anderes']}
						{...missionTypeInputProps}
					//TODO mutate
						onChange={changeHandler(missionTypeInputProps, useEditMode(), () => console.log(form.values.missionType))}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionAutocomplete inputProps={{
					label: 'Missionslänge',
					placeholder: 'Freitext',
					maxLength: TEXT,
					data: ['2 Stunden', '3 Stunden', 'über 4 Stunden'],
				}} formPath={'missionLength'}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionTextInput inputProps={{
					label: 'Bild-URL',
					maxLength: URL,
				}} formPath={'pictureUrl'}/>
			</Grid.Col>
		</Grid>
	</>;
}
