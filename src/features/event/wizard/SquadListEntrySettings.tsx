import {SlotDto, SquadDto} from '../eventTypes';
import {useState} from 'react';
import {ActionIcon, Menu, Modal, Text} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {EventWizardStepProps} from './EventWizard';

type SquadListEntrySettingsProps = {
	entry: SquadDto | SlotDto;
	form: EventWizardStepProps['form'];
	path: string;
	index: number;
	slot?: boolean;
};

export function SquadListEntrySettings(props: SquadListEntrySettingsProps): JSX.Element {
	const {entry, form, path, index, slot = false} = props;
	const [opened, setOpened] = useState(false);

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)} title={getHeader(entry, slot)}>
			<Text>Reservierung</Text>
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

function getHeader(entry: SquadDto | SlotDto, isSlot: boolean): string {
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
