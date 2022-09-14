import {Autocomplete, Grid, Select, TextInput} from '@mantine/core';
import {TEXT, URL} from '../../../../utils/maxLength';
import {EventTypeMask} from '../../action/generalInformation/EventTypeMask';
import {EventWizardStepProps} from '../EventWizard';
import {EventActionPageTitle} from '../../action/EventActionPage';
import {RequiredInformation} from '../../action/generalInformation/RequiredInformation';
import {EventDescription} from '../../action/generalInformation/EventDescription';

export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return (
		<>
			<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>
			<RequiredInformation form={form}/>
			<EventTypeMask form={form}/>
			<EventDescription form={form}/>

			<Grid>
				<Grid.Col span={4}>
					<Select label={'Missionstyp'} placeholder={'Auswählen...'}
							data={['COOP', 'COOP+', 'Zeus', 'TvT', 'Training', 'Spezial', 'Anderes']}
							{...form.getInputProps('missionType')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<Autocomplete label={'Missionslänge'} placeholder={'Freitext'} maxLength={TEXT}
								  data={['2 Stunden', '3 Stunden', 'über 4 Stunden']}
								  {...form.getInputProps('missionLength')}/>
				</Grid.Col>
				<Grid.Col span={4}>
					<TextInput label={'Bild-URL'} maxLength={URL} {...form.getInputProps('pictureUrl')}/>
				</Grid.Col>
			</Grid>
		</>
	);
}
