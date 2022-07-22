import {
	ActionIcon,
	Box,
	Checkbox,
	createStyles,
	Group,
	Menu,
	Modal,
	NumberInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import {EventWizardStepProps} from './EventWizard';
import {TEXT} from '../../../utils/maxLength';
import {randomId} from '@mantine/hooks';
import {AddButton} from '../../../components/Form/AddButton';
import {SlotDto, SquadDto} from '../eventTypes';
import {includes, sortBy} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faTrashCan, faUserGear} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';

const useStyles = createStyles((theme) => ({
	rootGrow: {
		flex: '1 1 0 !important',
	},
}));

export function EventWizardStepThree(props: EventWizardStepProps): JSX.Element {
	const {form} = props;
	const {classes} = useStyles();

	const squadList = form.values.squadList.map((squad, squadIndex) => (
		<Box key={squad.id} mt={'sm'} mb={'xs'}>
			<Group spacing={5}>
				<TextInput placeholder={'Squad Name'} maxLength={TEXT} required
						   styles={{root: {flexGrow: '1 !important'}}}
					// className={{root: classes.rootGrow}}
						   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
				<SquadListEntrySettings/>
			</Group>
			<Box ml={'md'}>
				{form.values.squadList[squadIndex].slotList?.map((slot, slotIndex) => (
					<Group key={slot.id} mt={'xs'}>
						<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
									 {...form.getInputProps(`squadList.${squadIndex}.slotList.${slotIndex}.number`)}/>
						<TextInput styles={{root: {flexGrow: '1 !important'}}}
								   {...form.getInputProps(`squadList.${squadIndex}.slotList.${slotIndex}.name`)}/>
						<SquadListEntrySettings/>
					</Group>
				))}
				<AddButton label={'Slot hinzufügen'} mt={'xs'}
						   onClick={() => form.insertListItem(`squadList.${squadIndex}.slotList`, buildNewSlot(form))}/>
			</Box>
		</Box>
	));

	return (
		<>
			<Title order={2} mb={'xs'}>Teilnahmeplatzaufzählung</Title>

			{squadList}
			<AddButton label={'Squad hinzufügen'} mt={'xs'}
					   onClick={() => form.insertListItem('squadList', {
						   name: '',
						   slotList: [buildNewSlot(form)],
						   id: randomId(),
					   })}/>

			<Checkbox label={'Reserve nimmt teil'} mt={'md'}
					  indeterminate={form.values.reserveParticipating === undefined}
					  {...form.getInputProps('reserveParticipating', {type: 'checkbox'})}/>
		</>
	);
}

function SquadListEntrySettings(): JSX.Element {
	const [opened, setOpened] = useState(false);

	return <>
		<Modal opened={opened} onClose={() => setOpened(false)} title={'Regeln für Squad'}>
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
				<Menu.Item icon={<FontAwesomeIcon icon={faTrashCan}/>}>Löschen</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	</>;
}

function buildNewSlot(form: EventWizardStepProps['form']): SlotDto {
	return {
		number: findFirstUnusedSlotNumber(form.values.squadList),
		name: '',
		id: randomId(),
	};
}

function findFirstUnusedSlotNumber(squadList: SquadDto[]): number {
	const slotNumbers = sortBy(squadList.flatMap((squad => squad.slotList.map(slot => slot.number))));
	let slotNumber = 1;
	while (includes(slotNumbers, slotNumber)) {
		slotNumber++;
	}
	return slotNumber;
}
