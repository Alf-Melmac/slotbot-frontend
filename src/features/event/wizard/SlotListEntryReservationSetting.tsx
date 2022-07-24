import {Alert, Select} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {EventWizardStepProps} from './EventWizard';
import {GuildDto} from '../eventTypes';

type SlotListEntryReservationSettingProps = {
	data?: GuildDto[];
	form: EventWizardStepProps['form'];
	path: SlotListEntrySettingsProps['path'];
	index: SlotListEntrySettingsProps['index'];
};

export function SlotListEntryReservationSetting(props: SlotListEntryReservationSettingProps): JSX.Element {
	const {data, form, path, index} = props;

	return (
		!data ?
			<>
				<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
					Die möglichen Reservierungen konnten nicht geladen werden. Bitte überprüfe deine
					Internetverbindung. Du kannst ohne Reservierungen fortfahren, aber vielleicht nicht
					speichern. Durch Navigation auf den vorherigen Schritt und zurück auf die Slotliste wird
					versucht erneut zu laden.
				</Alert>
				<Select label={'Reservierung'} placeholder={'Nicht reserviert'} data={[]} disabled/>
			</>
			:
			<Select label={'Reservierung'} placeholder={'Nicht reserviert'} clearable
					description={'Nur Mitglieder der ausgewählten Gruppe können sich hier eintragen.'}
					data={data.map(guild => {
						return {
							value: guild.id,
							label: guild.groupIdentifier,
						};
					})}
					{...form.getInputProps(`${path}.${index}.reservedFor`)}/>
	);
}
