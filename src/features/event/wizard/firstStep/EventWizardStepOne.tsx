import {Autocomplete, Grid, Select, Stack, TextInput, Title} from '@mantine/core';
import {TextInputMaxLength} from '../../../../components/Form/MaxLength/TextInputMaxLength';
import {EMBEDDABLE_DESCRIPTION, TEXT, URL} from '../../../../utils/maxLength';
import {IconSwitch} from '../../../../components/Form/IconSwitch';
import {faCalendarDay, faClock, faEye, faEyeSlash, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DatePicker, TimeInput} from '@mantine/dates';
import {EventTypeMask} from './EventTypeMask';
import {TextareaMaxLength} from '../../../../components/Form/MaxLength/TextareaMaxLength';
import {EventWizardStepProps} from '../EventWizard';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';


function EventTitle(props: EventWizardStepProps): JSX.Element {
	return <TextInputMaxLength label={'Titel'} placeholder={'Event Name'} maxLength={TEXT} required
							   useFormReturn={props.form} inputProp={'name'}/>;
}

function EventShareableAndHidden(props: EventWizardStepProps): JSX.Element {
	return <>
		<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
					label={<ElementWithInfo text={'Teilen erlauben'}
											tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
					useFormReturn={props.form} inputProp={'shareable'}/>

		<IconSwitch onIcon={faEye} offIcon={faEyeSlash}
					label={<ElementWithInfo text={'Sichtbarkeit'}
											tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
					useFormReturn={props.form} inputProp={'hidden'}/>
	</>;
}

export function EventWizardStepOne(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	return (
		<>
			<Title order={2} mb={'xs'}>Allgemeine Informationen</Title>

			<Grid>
				<Grid.Col md={9} span={12}>
					<EventTitle {...props}/>
				</Grid.Col>
				<Grid.Col md={3} span={12}>
					<Stack align={'flex-start'} spacing={'xs'}>
						<EventShareableAndHidden {...props}/>
					</Stack>
				</Grid.Col>
			</Grid>
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
										useFormReturn={form} inputProp={'creator'}/>
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
