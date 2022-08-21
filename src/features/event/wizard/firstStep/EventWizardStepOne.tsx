import {Autocomplete, Grid, Select, TextInput} from '@mantine/core';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {faCalendarDay, faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DatePicker, TimeInput} from '@mantine/dates';
import {EventTypeMask} from './EventTypeMask';
import {TextareaMaxLength} from '../../../../components/Form/MaxLength/TextareaMaxLength';
import {EventWizardStepProps} from '../EventWizard';
import {EventActionPageTitle} from '../../action/EventActionPage';
import {RequiredInformation} from '../../action/generalInformation/RequiredInformation';
import {TextInputMaxLength} from '../../../../components/Form/MaxLength/TextInputMaxLength';

export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return (
		<>
			<EventActionPageTitle>Allgemeine Informationen</EventActionPageTitle>

			<RequiredInformation {...props}/>
			<Grid>
				<Grid.Col md={4} span={6}>
					<DatePicker allowFreeInput minDate={new Date()} clearable={false} required
								label={'Datum'} icon={<FontAwesomeIcon icon={faCalendarDay}/>}
								placeholder={'Event Datum'} {...form.getInputProps('date')}/>
				</Grid.Col>
				<Grid.Col md={4} span={6}>
					<TimeInput clearable={false} required label={'Startzeit'}
							   icon={<FontAwesomeIcon icon={faClock}/>} placeholder={'Event Datum'}
							   {...form.getInputProps('startTime')}/>
				</Grid.Col>
				<Grid.Col md={4} span={12}>
					<TextInputMaxLength label={'Ersteller'} maxLength={TEXT} required
										{...form.getInputProps('creator')}/>
				</Grid.Col>
			</Grid>
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
