import {Box, Checkbox, Group, NumberInput, TextInput, Title} from '@mantine/core';
import {EventWizardStepProps} from './EventWizard';
import {TEXT} from '../../../utils/maxLength';
import {randomId} from '@mantine/hooks';
import {AddButton} from '../../../components/Form/AddButton';
import {SlotDto, SquadDto} from '../eventTypes';
import {includes, sortBy} from 'lodash';
import {SquadListEntrySettings} from './SquadListEntrySettings';

export function EventWizardStepThree(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

	const squadList = form.values.squadList.map((squad, squadIndex) => (
		<Box key={squad.id} mt={'sm'} mb={'xs'}>
			<Group spacing={5}>
				<TextInput placeholder={'Squad Name'} maxLength={TEXT} required
						   styles={{root: {flexGrow: '1 !important'}}}
						   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
				<SquadListEntrySettings entry={form.values.squadList[squadIndex]} form={form}
										path={'squadList'} index={squadIndex}/>
			</Group>
			<Box ml={'md'}>
				{form.values.squadList[squadIndex].slotList?.map((slot, slotIndex) => {
					const slotList = `squadList.${squadIndex}.slotList`;
					return (
						<Group key={slot.id} mt={'xs'}>
							<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
										 {...form.getInputProps(`${slotList}.${slotIndex}.number`)}/>
							<TextInput styles={{root: {flexGrow: '1 !important'}}}
									   {...form.getInputProps(`${slotList}.${slotIndex}.name`)}/>
							<SquadListEntrySettings entry={form.values.squadList[squadIndex].slotList[slotIndex]} slot
													form={form} path={slotList} index={slotIndex}/>
						</Group>
					);
				})}
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
