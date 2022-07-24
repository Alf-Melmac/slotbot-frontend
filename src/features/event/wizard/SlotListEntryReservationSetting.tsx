import {Alert, Select} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {EventWizardStepProps} from './EventWizard';
import {GuildDto} from '../eventTypes';
import {getFormFieldValue} from '../../../utils/formHelper';
import {find} from 'lodash';

type SlotListEntryReservationSettingProps = {
	data?: GuildDto[];
	form: EventWizardStepProps['form'];
	path: SlotListEntrySettingsProps['path'];
	index: SlotListEntrySettingsProps['index'];
	slot: boolean;
};

export function SlotListEntryReservationSetting(props: SlotListEntryReservationSettingProps): JSX.Element {
	return (
		!props.data ?
			<>
				<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
					Die möglichen Reservierungen konnten nicht geladen werden. Bitte überprüfe deine Internetverbindung.
					Du kannst ohne Reservierungen fortfahren, aber vielleicht nicht speichern. Durch Navigation auf den
					vorherigen Schritt und wieder auf die Slotliste zurück wird versucht erneut zu laden.
				</Alert>
				<Select label={'Reservierung'} placeholder={'Nicht reserviert'} data={[]} disabled/>
			</>
			:
			<SlotListEntryReservationSettingSelect {...props}/>
	);
}

function SlotListEntryReservationSettingSelect(props: SlotListEntryReservationSettingProps): JSX.Element {
	const {data = [], form, path, index, slot} = props; //Shouldn't be used with undefined data prop

	let placeholder = 'Nicht reserviert';
	if (slot) {
		const squadReservedFor = find(
			data,
			['id', getFormFieldValue(form, `${path.slice(0, path.lastIndexOf('.'))}.reservedFor`)],
		);
		if (squadReservedFor) {
			placeholder = squadReservedFor.groupIdentifier;
		}
	}

	return <Select label={'Reservierung'} placeholder={placeholder} clearable searchable
				   description={'Nur Mitglieder der ausgewählten Gruppe können sich hier eintragen.'}
				   data={data.map(guild => {
					   return {
						   value: guild.id,
						   label: guild.groupIdentifier,
					   };
				   })}
				   {...form.getInputProps(`${path}.${index}.reservedFor`)}/>;
}
