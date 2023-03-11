import {SlotDto} from '../../eventTypes';
import {Box, Group, NumberInput, TextInput} from '@mantine/core';
import {TEXT} from '../../../../utils/maxLength';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {SlotListEntrySettings} from './SlotListEntrySettings';
import {AddButton} from '../../../../components/Button/AddButton';
import {randomId} from '@mantine/hooks';
import {
	EventActionFormType,
	EventEditFormReturn,
	EventWizardFormReturn,
	useFormContext,
} from '../../../../contexts/event/action/EventActionFormContext';
import {useLanguage} from '../../../../contexts/language/Language';
import {useGetGuilds} from '../../../guilds/useGetGuilds';

export function SquadList(): JSX.Element {
	const guildsQuery = useGetGuilds();

	const form = useFormContext();
	const {t} = useLanguage();

	const squadList = form.values.squadList.map((squad, squadIndex) => (
		<Box key={squad.id} mt={'sm'} mb={'xs'}>
			<Group spacing={5}>
				<TextInput placeholder={t('squad.placeholder')} maxLength={TEXT} required styles={{root: flexGrow}}
						   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
				<SlotListEntrySettings entry={form.values.squadList[squadIndex]}
									   path={'squadList'} index={squadIndex} guildsQuery={guildsQuery}/>
			</Group>
			<Box ml={'lg'}>
				{form.values.squadList[squadIndex].slotList?.map((slot, slotIndex) => {
					const slotList = `squadList.${squadIndex}.slotList`;
					return (
						<Group key={slot.id} spacing={'xs'} mt={'xs'}>
							<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
										 {...form.getInputProps(`${slotList}.${slotIndex}.number`)}/>
							<TextInput placeholder={t('slot.placeholder')} styles={{root: flexGrow}}
									   {...form.getInputProps(`${slotList}.${slotIndex}.name`)}/>
							<SlotListEntrySettings entry={form.values.squadList[squadIndex].slotList[slotIndex]} slot
												   path={slotList} index={slotIndex} guildsQuery={guildsQuery}/>
						</Group>
					);
				})}
				<AddButton label={'slot.add'} mt={'xs'}
					/*@ts-ignore ????*/
						   onClick={() => form.insertListItem(`squadList.${squadIndex}.slotList`, buildNewSlot(form))}/>
			</Box>
		</Box>
	));

	return <>
		{squadList}
		<AddButton label={'squad.add'} mt={'xs'}
				   onClick={() => form.insertListItem('squadList', {
					   name: '',
					   /*@ts-ignore ????*/
					   slotList: [buildNewSlot(form)],
					   reservedFor: '',
					   id: randomId(),
				   })}/>
	</>;
}

function buildNewSlot(form: EventEditFormReturn | EventWizardFormReturn): SlotDto {
	return {
		number: findFirstUnusedSlotNumber(form.values.squadList),
		name: '',
		reservedFor: '',
		blocked: false,
		replacementText: 'Gesperrt',
		id: randomId(),
	};
}

function findFirstUnusedSlotNumber(squadList: EventActionFormType['squadList']): number {
	const slotNumbers = squadList.flatMap((squad => squad.slotList.map(slot => slot.number)))
		.sort((a, b) => a - b);
	let slotNumber = 1;
	while (slotNumbers.includes(slotNumber)) {
		slotNumber++;
	}
	return slotNumber;
}
