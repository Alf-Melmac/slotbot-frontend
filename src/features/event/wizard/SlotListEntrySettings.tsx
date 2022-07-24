import {GuildDto, SlotDto, SquadDto} from '../eventTypes';
import {useState} from 'react';
import {ActionIcon, Menu, Modal, Skeleton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {EventWizardStepProps} from './EventWizard';
import {UseQueryResult} from 'react-query';
import {SlotBlockedSetting} from './SlotBlockedSetting';
import {SlotListEntryReservationSetting} from './SlotListEntryReservationSetting';

export type SlotListEntrySettingsProps = {
	entry: SquadDto | SlotDto;
	form: EventWizardStepProps['form'];
	path: string;
	index: number;
	slot?: boolean;
	guildsQuery: UseQueryResult<GuildDto[], Error>
};

export function SlotListEntrySettings(props: SlotListEntrySettingsProps): JSX.Element {
	const {entry, form, path, index, slot = false, guildsQuery} = props;
	const [opened, setOpened] = useState(false);

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)} title={buildHeader(entry, slot)}>
			{guildsQuery.isLoading ?
				<Skeleton width={'100%'} height={60}/>
				:
				<SlotListEntryReservationSetting data={guildsQuery.data} form={form} path={path} index={index}/>
			}
			{slot &&
                <SlotBlockedSetting form={form} path={path} index={index}/>
			}
		</Modal>
		<Menu>
			<Menu.Target>
				<ActionIcon size={'lg'}>
					<FontAwesomeIcon icon={faEllipsisH} size={'lg'}/>
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item icon={<FontAwesomeIcon icon={faUserGear}/>}
						   onClick={() => setOpened(true)}>
					Regeln
				</Menu.Item>
				<Menu.Item icon={<FontAwesomeIcon icon={faTrashCan}/>}
						   onClick={() => form.removeListItem(path, index)}>Löschen</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	</>;
}

function buildHeader(entry: SquadDto | SlotDto, isSlot: boolean): string {
	let header = 'Regeln für';
	const slot: SlotDto | undefined = isSlot ? entry as SlotDto : undefined;
	if (isSlot && slot?.number && !isNaN(slot.number)) {
		header += ` (${slot.number})`;
	}
	if (entry.name) {
		header += ` ${entry.name}`;
	} else {
		header += slot ? ' Slot' : ' Squad';
	}

	return header;
}
