import {Box, Checkbox, Group, NumberInput, TextInput, Title} from '@mantine/core';
import {EventWizardStepProps} from '../EventWizard';
import {TEXT} from '../../../../utils/maxLength';
import {randomId} from '@mantine/hooks';
import {AddButton} from '../../../../components/Form/AddButton';
import {GuildDto, SlotDto, SquadDto} from '../../eventTypes';
import {includes, sortBy} from 'lodash';
import {SlotListEntrySettings} from './SlotListEntrySettings';
import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {useQuery} from '@tanstack/react-query';
import {UploadSlotlist} from './UploadSlotlist';
import {RenumberSlots} from './RenumberSlots';

export function EventWizardStepThree(props: EventWizardStepProps): JSX.Element {
	const {form} = props ;

	const getGuilds = () => slotbotServerClient.get(`http://localhost:8090/guilds`).then((res) => res.data);
	const guildsQuery = useQuery<Array<GuildDto>, Error>(['guilds'], getGuilds);

	const squadList = form.values.squadList.map((squad, squadIndex) => (
		<Box key={squad.id} mt={'sm'} mb={'xs'}>
			<Group spacing={5}>
				<TextInput placeholder={'Squad Name'} maxLength={TEXT} required styles={{root: flexGrow}}
						   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
				<SlotListEntrySettings entry={form.values.squadList[squadIndex]} form={form}
									   path={'squadList'} index={squadIndex} guildsQuery={guildsQuery}/>
			</Group>
			<Box ml={'lg'}>
				{form.values.squadList[squadIndex].slotList?.map((slot, slotIndex) => {
					const slotList = `squadList.${squadIndex}.slotList`;
					return (
						<Group key={slot.id} spacing={'xs'} mt={'xs'}>
							<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
										 {...form.getInputProps(`${slotList}.${slotIndex}.number`)}/>
							<TextInput placeholder={'Slot Name'} styles={{root: flexGrow}}
									   {...form.getInputProps(`${slotList}.${slotIndex}.name`)}/>
							<SlotListEntrySettings entry={form.values.squadList[squadIndex].slotList[slotIndex]} slot
												   form={form} path={slotList} index={slotIndex}
												   guildsQuery={guildsQuery}/>
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
			<Group position={'apart'}>
				<Title order={2}>Teilnahmeplatzaufzählung</Title>
				<Group spacing={'xs'}>
					<UploadSlotlist {...props}/>
					<RenumberSlots {...props}/>
				</Group>
			</Group>

			{squadList}
			<AddButton label={'Squad hinzufügen'} mt={'xs'}
					   onClick={() => form.insertListItem('squadList', {
						   name: '',
						   slotList: [buildNewSlot(form)],
						   reservedFor: '',
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
		reservedFor: '',
		blocked: false,
		replacementText: 'Gesperrt',
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
