import {GuildDto, SlotDto, SquadDto} from '../eventTypes';
import {useState} from 'react';
import {ActionIcon, Alert, Menu, Modal, Select, Skeleton} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation, faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {EventWizardStepProps} from './EventWizard';
import {UseQueryResult} from 'react-query';

type SquadListEntrySettingsProps = {
	entry: SquadDto | SlotDto;
	form: EventWizardStepProps['form'];
	path: string;
	index: number;
	slot?: boolean;
	guildsQuery: UseQueryResult<GuildDto[], Error>
};

export function SquadListEntrySettings(props: SquadListEntrySettingsProps): JSX.Element {
	const {entry, form, path, index, slot = false, guildsQuery} = props;
	const [opened, setOpened] = useState(false);

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)} title={getHeader(entry, slot)}>
			{guildsQuery.isLoading ?
				<Skeleton width={'100%'} height={60}/>
				:
				!guildsQuery.data ?
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
							data={guildsQuery.data.map(guild => {
								return {
									value: guild.id,
									label: guild.groupIdentifier,
								};
							})}
							{...form.getInputProps(`${path}.${index}.reservedFor`)}/>
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
