import slotbotServerClient from '../../../../hooks/slotbotServerClient';
import {useQuery} from '@tanstack/react-query';
import {GuildDto, SlotDto} from '../../eventTypes';
import {Box, Group, NumberInput, TextInput} from '@mantine/core';
import {TEXT} from '../../../../utils/maxLength';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {SlotListEntrySettings} from '../../wizard/thirdStep/SlotListEntrySettings';
import {AddButton} from '../../../../components/Button/AddButton';
import {randomId} from '@mantine/hooks';
import {EventAction, EventActionPageProps} from '../EventActionPage';

export function SquadList<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {form} = props;

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

	return <>
		{squadList}
		<AddButton label={'Squad hinzufügen'} mt={'xs'}
				   onClick={() => form.insertListItem('squadList', {
					   name: '',
					   slotList: [buildNewSlot(form)],
					   reservedFor: '',
					   id: randomId(),
				   })}/>
	</>;
}

function buildNewSlot<FormReturnType extends EventAction>(form: EventActionPageProps<FormReturnType>['form']): SlotDto {
	return {
		number: findFirstUnusedSlotNumber(form.values.squadList),
		name: '',
		reservedFor: '',
		blocked: false,
		replacementText: 'Gesperrt',
		id: randomId(),
	};
}

function findFirstUnusedSlotNumber(squadList: EventAction['squadList']): number {
	const slotNumbers = squadList.flatMap((squad => squad.slotList.map(slot => slot.number)))
		.sort((a, b) => a - b);
	let slotNumber = 1;
	while (slotNumbers.includes(slotNumber)) {
		slotNumber++;
	}
	return slotNumber;
}
