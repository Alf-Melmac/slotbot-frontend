import {Group} from '@mantine/core';
import {AddButton} from '../../../../components/Button/AddButton';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {EventAction} from '../EventActionPage';
import {filterFrontendIds} from '../../../../utils/formHelper';
import {randomId} from '@mantine/hooks';
import {EventDetail} from './EventDetail';
import {T} from '../../../../components/T';

const MAX_DETAILS = 23;

export function EventDetails(): JSX.Element {
	const form = useFormContext();

	const details = form.values.details.map((item, index) => <EventDetail item={item} index={index} key={item.id}/>);

	const detailsInvalid = (): boolean => {
		return form.values.details.some((_, i) => {
			return !form.isValid(`details.${i}.title`) || !form.isValid(`details.${i}.text`);
		});
	};

	const {mutate} = useEventUpdate({details: filterFrontendIds<EventAction['details'][number]>(form.values.details)},
		// @ts-ignore Details matches here
		result => form.setFieldValue('details', result.details));
	return <>
		{details}

		<Group spacing={'xs'} mt={'xs'}>
			<AddButton label={'event.details.add'}
					   onClick={() => form.insertListItem('details', {title: '', text: '', id: randomId()})}
					   disabled={details.length >= MAX_DETAILS}/>
			<CounterBadge currentValue={details.length} maxValue={MAX_DETAILS} yellowPhase/>
		</Group>

		{useEditMode() &&
            <Group position={'right'}>
                <ScrollAffix show={form.isDirty('details')}>
                    <PulsatingButton onClick={() => mutate()} disabled={!form.isDirty('details') || detailsInvalid()}>
                        <T k={'action.saveFields'}/>
                    </PulsatingButton>
                </ScrollAffix>
            </Group>
		}
	</>;
}
