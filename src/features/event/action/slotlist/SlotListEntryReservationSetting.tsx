import {Alert, Select} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {GuildDto} from '../../../guilds/guildTypes';
import {getFormFieldValue} from '../../../../utils/formHelper';
import {find} from 'lodash-es';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {JSX} from 'react';

type SlotListEntryReservationSettingProps = {
	data?: GuildDto[];
	slot: boolean;
} & Pick<SlotListEntrySettingsProps, 'path' | 'index'>;

export function SlotListEntryReservationSetting(props: Readonly<SlotListEntryReservationSettingProps>): JSX.Element {
	const {t} = useLanguage();
	return (
		!props.data ?
			<>
				<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
					<T k={'slotlistEntry.settings.reservation.error'}/>
				</Alert>
				<Select label={<T k={'slotlistEntry.settings.reservation.label'}/>}
						description={<T k={'slotlistEntry.settings.reservation.description'}/>}
						placeholder={t('slotlistEntry.settings.reservation.placeholder')}
						data={[]} disabled/>
			</>
			:
			<SlotListEntryReservationSettingSelect {...props}/>
	);
}

function SlotListEntryReservationSettingSelect(props: Readonly<SlotListEntryReservationSettingProps>): JSX.Element {
	const {data = [], path, index, slot} = props; //Shouldn't be used with undefined data prop
	const form = useFormContext();
	const {t} = useLanguage();

	let placeholder = t('slotlistEntry.settings.reservation.placeholder');
	if (slot) {
		const squadReservedFor = find(
			data,
			['id', getFormFieldValue(form, `${path.slice(0, path.lastIndexOf('.'))}.reservedFor`)],
		);
		if (squadReservedFor) {
			placeholder = squadReservedFor.groupIdentifier;
		}
	}

	return <Select label={<T k={'slotlistEntry.settings.reservation.label'}/>}
				   description={<T k={'slotlistEntry.settings.reservation.description'}/>}
				   placeholder={placeholder} clearable searchable
				   data={data.map(guild => {
					   return {
						   value: guild.id,
						   label: guild.groupIdentifier,
					   };
				   })}
				   {...form.getInputProps(`${path}.${index}.reservedFor`)}/>;
}
