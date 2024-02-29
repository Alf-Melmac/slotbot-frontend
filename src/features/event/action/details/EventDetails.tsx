import {Group} from '@mantine/core';
import {AddButton} from '../../../../components/Button/AddButton';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {EventActionFormType, useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {filterFrontendIds} from '../../../../utils/formHelper';
import {randomId} from '@mantine/hooks';
import {EventDetail} from './EventDetail';
import {T} from '../../../../components/T';
import {SortableList} from '../../../../components/Form/Sortable/SortableList';
import {convertDtoToFormEvent} from '../../edit/utils';
import {JSX} from 'react';

const MAX_DETAILS = 23;

export function EventDetails(): JSX.Element {
	const form = useFormContext();

	const detailsCount = form.values.details.length;

	const detailsInvalid = (): boolean => {
		return form.values.details.some((_, i) => {
			return !form.isValid(`details.${i}.title`) || !form.isValid(`details.${i}.text`);
		});
	};

	const {mutate} = useEventUpdate({details: filterFrontendIds<EventActionFormType['details'][number]>(form.values.details)},
		result => {
			// @ts-ignore Details matches here
			form.setFieldValue('details', result.details);
			// @ts-ignore
			form.resetDirty(convertDtoToFormEvent(result));
		});
	return <>
		<SortableList<typeof form.values.details[number]> formPath={'details'} itemProps={{mt: 'sm'}}
														  renderItem={(item, index) =>
															  <EventDetail item={item} index={index} key={item.id}/>}/>

		<Group gap={'xs'} mt={'xs'}>
			<AddButton label={'event.details.add'}
					   onClick={() => form.insertListItem('details', {title: '', text: '', id: randomId()})}
					   disabled={detailsCount >= MAX_DETAILS}/>
			<CounterBadge currentValue={detailsCount} maxValue={MAX_DETAILS} yellowPhase/>
		</Group>

		{useEditMode() &&
            <Group justify={'right'}>
                <ScrollAffix show={form.isDirty('details')}>
                    <PulsatingButton onClick={() => mutate()} disabled={!form.isDirty('details') || detailsInvalid()}>
                        <T k={'action.saveFields'}/>
                    </PulsatingButton>
                </ScrollAffix>
            </Group>
		}
	</>;
}
