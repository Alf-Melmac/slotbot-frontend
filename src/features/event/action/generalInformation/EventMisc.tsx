import {EventAction, EventActionPageProps} from '../EventActionPage';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {EventActionTextarea} from '../EventActionTextarea';
import {Grid, Select} from '@mantine/core';
import {EventActionTextInput} from '../EventActionTextInput';
import {changeHandler} from '../../../../utils/formHelper';
import {EventActionAutocomplete} from '../EventActionAutocomplete';

export function EventMisc<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {form, editMode} = props;

	const missionTypeInputProps = form.getInputProps('missionType');
	return <>
		<EventActionTextarea {...props} inputProps={{
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
						onChange={changeHandler(missionTypeInputProps, editMode, () => console.log(form.values.missionType))}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionAutocomplete {...props} inputProps={{
					label: 'Missionslänge',
					placeholder: 'Freitext',
					maxLength: TEXT,
					data: ['2 Stunden', '3 Stunden', 'über 4 Stunden'],
				}} formPath={'missionLength'}/>
			</Grid.Col>
			<Grid.Col span={4}>
				<EventActionTextInput {...props} inputProps={{
					label: 'Bild-URL',
					maxLength: URL,
				}} formPath={'pictureUrl'}/>
			</Grid.Col>
		</Grid>
	</>;
}
