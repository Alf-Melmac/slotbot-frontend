import {Autocomplete, Grid, Select, TextInput} from '@mantine/core';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {EventTypeMask} from './EventTypeMask';
import {TextareaMaxLength} from '../../../../components/Form/MaxLength/TextareaMaxLength';
import {EventWizardStepProps} from '../EventWizard';
import {EventActionPageTitle} from '../../action/EventActionPage';
import {RequiredInformation} from '../../action/generalInformation/RequiredInformation';

export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return (
		<>
			<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>

			<RequiredInformation {...props}/>

			<EventTypeMask form={form}/>
			<TextareaMaxLength label={'Beschreibung'} placeholder={'Beschreibung'} autosize minRows={3}
							   maxLength={EMBEDDABLE_DESCRIPTION}
							   useFormReturn={form} inputProp={'description'}/>
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
