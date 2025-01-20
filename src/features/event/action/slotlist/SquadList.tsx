import {Box, Group, NumberInput, TextInput} from '@mantine/core';
import {TEXT} from '../../../../utils/maxLength';
import {SlotListEntrySettings} from './SlotListEntrySettings';
import {AddButton} from '../../../../components/Button/AddButton';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useLanguage} from '../../../../contexts/language/Language';
import {useGetGuilds} from '../../../guilds/useGetGuilds';
import {SortableList} from '../../../../components/Form/Sortable/SortableList';
import {buildNewSlot, buildNewSquad} from './utils';
import {JSX} from 'react';
import {useGetEventTypeRequirements} from './useGetEventTypeRequirements';

export function SquadList(): JSX.Element {
	const form = useFormContext();
	const {t} = useLanguage();

	const guildsQuery = useGetGuilds();
	const requirementsQuery = useGetEventTypeRequirements(form.values.eventType.id);

	return <>
		<SortableList<typeof form.values.squadList[number]>
			formPath={'squadList'} itemProps={{mt: 'sm', mb: 'xs', align: 'start'}} iconProps={{size: 'lg'}}
			renderItem={(squad, squadIndex) => (
				<Box key={squad.id}>
					<Group gap={5} align={'start'}>
						<TextInput placeholder={t('squad.placeholder')}
								   maxLength={TEXT} required
								   flex={1}
								   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
						<SlotListEntrySettings
							entry={form.values.squadList[squadIndex]}
							path={'squadList'} index={squadIndex}
							guildsQuery={guildsQuery} requirementsQuery={requirementsQuery}/>
					</Group>
					<Box ml={'lg'}>
						<SortableList<typeof form.values.squadList[number]['slotList'][number]>
							formPath={`squadList.${squadIndex}.slotList`} itemProps={{mt: 'sm'}}
							renderItem={(slot, slotIndex) => {
								const slotList = `squadList.${squadIndex}.slotList`;
								return (
									<Group key={slot.id} align={'start'} gap={'xs'}>
										<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
													 {...form.getInputProps(`${slotList}.${slotIndex}.number`)}/>
										<TextInput placeholder={t('slot.placeholder')}
												   flex={1}
												   {...form.getInputProps(`${slotList}.${slotIndex}.name`)}/>
										<SlotListEntrySettings
											entry={form.values.squadList[squadIndex].slotList[slotIndex]} slot
											path={slotList} index={slotIndex}
											guildsQuery={guildsQuery} requirementsQuery={requirementsQuery}/>
									</Group>
								);
							}}/>
						<AddButton label={'slot.add'} mt={'xs'}
								   onClick={() => form.insertListItem(`squadList.${squadIndex}.slotList`, buildNewSlot(form))}/>
					</Box>
				</Box>
			)}/>
		<AddButton label={'squad.add'} mt={'xs'} onClick={() => form.insertListItem('squadList', buildNewSquad(form))}/>
	</>;
}
