import {Alert, Select, Skeleton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {SlotListEntrySettingsProps} from './SlotListEntrySettings';
import {getFormFieldValue} from '../../../../utils/formHelper';
import {find} from 'lodash-es';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {JSX} from 'react';
import {RequiredPick} from '../../../../utils/typesHelper';

type SlotListEntryReservationSettingProps = RequiredPick<SlotListEntrySettingsProps, 'guildsQuery' | 'path' | 'index' | 'slot'>;

export function SlotListEntryReservationSetting(props: Readonly<SlotListEntryReservationSettingProps>): JSX.Element {
	const {guildsQuery} = props;
	const {t} = useLanguage();

	if (guildsQuery.isLoading) {
		return <Skeleton width={'100%'} height={60}/>;
	}

	return (
		guildsQuery.data ?
			<SlotListEntryReservationSettingSelect {...props}/>
			:
			<>
				<Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
					<T k={'slotlistEntry.settings.reservation.error'}/>
				</Alert>
				<Select label={<T k={'slotlistEntry.settings.reservation.label'}/>}
						description={<T k={'slotlistEntry.settings.reservation.description'}/>}
						placeholder={t('slotlistEntry.settings.reservation.placeholder')}
						data={[]} disabled/>
			</>
	);
}

function SlotListEntryReservationSettingSelect(props: Readonly<SlotListEntryReservationSettingProps>): JSX.Element {
	const {guildsQuery: {data = []}, path, index, slot} = props; //Shouldn't be used with undefined data prop
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
