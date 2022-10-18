import {GuildDto, SlotDto} from '../../eventTypes';
import {useState} from 'react';
import {ActionIcon, Menu, Modal, Skeleton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {SlotBlockedSetting} from './SlotBlockedSetting';
import {SlotListEntryReservationSetting} from './SlotListEntryReservationSetting';
import {UseQueryResult} from '@tanstack/react-query';
import {EventAction} from '../EventActionPage';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';

export type SlotListEntrySettingsProps = {
	entry: SlotListEntryModalHeaderModalHeaderProps['entry'];
	path: string;
	index: number;
	slot?: boolean;
	guildsQuery: UseQueryResult<GuildDto[], Error>
};

export function SlotListEntrySettings(props: SlotListEntrySettingsProps): JSX.Element {
	const {entry, path, index, slot = false, guildsQuery} = props;
	const [opened, setOpened] = useState(false);
	const form = useFormContext();

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)}
			   title={<SlotListEntryModalHeader entry={entry} isSlot={slot}/>}>
			{guildsQuery.isLoading ?
				<Skeleton width={'100%'} height={60}/>
				:
				<SlotListEntryReservationSetting data={guildsQuery.data} path={path} index={index} slot={slot}/>
			}
			{slot &&
                <SlotBlockedSetting path={path} index={index}/>
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

type SlotListEntryModalHeaderModalHeaderProps = {
	entry: EventAction['squadList'][number] | EventAction['squadList'][number]['slotList'][number];
	isSlot: boolean;
}

function SlotListEntryModalHeader(props: SlotListEntryModalHeaderModalHeaderProps): JSX.Element {
	const {entry, isSlot} = props;

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

	return <>{header}</>;
}
