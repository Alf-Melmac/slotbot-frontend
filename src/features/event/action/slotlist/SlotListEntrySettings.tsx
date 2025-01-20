import {JSX, useState} from 'react';
import {ActionIcon, Menu, Modal, Stack} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClone, faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {SlotBlockedSetting} from './SlotBlockedSetting';
import {SlotListEntryReservationSetting} from './SlotListEntryReservationSetting';
import {EventActionFormType, useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {T} from '../../../../components/T';
import {useLanguage} from '../../../../contexts/language/Language';
import {getFormFieldValue} from '../../../../utils/formHelper';
import {duplicateSlot, duplicateSquad} from './utils';
import {useGetGuilds} from '../../../guilds/useGetGuilds';
import {useGetEventTypeRequirements} from './useGetEventTypeRequirements';
import {SlotListEntryRequirementSetting} from './SlotListEntryRequirementSetting';
import {FeatureFlag} from '../../../featureFlag/useGetFeatureFlags';
import {RequireFeatureFlag} from '../../../featureFlag/RequireFeatureFlag';

export type SlotListEntrySettingsProps = {
	entry: SlotListEntryModalHeaderModalHeaderProps['entry'];
	path: string;
	index: number;
	slot?: boolean;
	guildsQuery: ReturnType<typeof useGetGuilds>;
	requirementsQuery: ReturnType<typeof useGetEventTypeRequirements>;
};

export function SlotListEntrySettings(props: Readonly<SlotListEntrySettingsProps>): JSX.Element {
	const {entry, path, index, slot = false, guildsQuery, requirementsQuery} = props;
	const [opened, setOpened] = useState(false);
	const form = useFormContext();

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)}
			   title={<SlotListEntryModalHeader entry={entry} isSlot={slot}/>}>
			<Stack gap={'sm'}>
				<SlotListEntryReservationSetting guildsQuery={guildsQuery} path={path} index={index} slot={slot}/>
				<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
					<SlotListEntryRequirementSetting requirementsQuery={requirementsQuery} path={path} index={index}
													 slot={slot}/>
				</RequireFeatureFlag>
				{slot &&
                    <SlotBlockedSetting path={path} index={index}/>
				}
			</Stack>
		</Modal>
		<Menu>
			<Menu.Target>
				<ActionIcon color={'gray'} variant={'subtle'} size={'lg'}>
					<FontAwesomeIcon icon={faEllipsisH} size={'lg'}/>
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item leftSection={<FontAwesomeIcon icon={faUserGear}/>}
						   onClick={() => setOpened(true)}>
					<T k={'slotlistEntry.settings'}/>
				</Menu.Item>
				<Menu.Item leftSection={<FontAwesomeIcon icon={faClone}/>}
						   onClick={() => {
							   const entry = getFormFieldValue(form, `${path}.${index}`);
							   form.insertListItem(path, slot ? duplicateSlot(form, entry) : duplicateSquad(form, entry), index + 1);
						   }}>
					<T k={'action.duplicate'}/>
				</Menu.Item>
				<Menu.Item leftSection={<FontAwesomeIcon icon={faTrashCan}/>}
						   onClick={() => form.removeListItem(path, index)}>
					<T k={'action.delete'}/>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	</>;
}

type SlotListEntryModalHeaderModalHeaderProps = {
	entry: EventActionFormType['squadList'][number] | EventActionFormType['squadList'][number]['slotList'][number];
	isSlot: boolean;
}

function SlotListEntryModalHeader(props: Readonly<SlotListEntryModalHeaderModalHeaderProps>): JSX.Element {
	const {entry, isSlot} = props;
	const {t} = useLanguage();

	let header = t('slotlistEntry.settings.header');
	const slot = isSlot ? entry as EventActionFormType['squadList'][number]['slotList'][number] : undefined;
	if (isSlot && slot?.number && !Number.isNaN(slot.number)) {
		header += ` (${slot.number})`;
	}
	if (entry.name) {
		header += ` ${entry.name}`;
	} else {
		header += slot ? ` ${t('slot')}` : ` ${t('squad')}`;
	}

	return <>{header}</>;
}
