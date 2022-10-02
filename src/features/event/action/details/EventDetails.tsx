import {EventAction, EventActionPageProps} from '../EventActionPage';
import {ActionIcon, Group} from '@mantine/core';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../components/Button/AddButton';
import {randomId} from '@mantine/hooks';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {EventActionTextInput} from '../EventActionTextInput';

const MAX_DETAILS = 23;

export function EventDetails<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {form, editMode} = props;

	const details = form.values.details.map((item, index) => (
		<Group key={item.id} mt={'xs'}>
			<EventActionTextInput {...props} inputProps={{
				placeholder: 'Titel',
				maxLength: EMBEDDABLE_TITLE,
				required: true,
			}} formPath={`details.${index}.title`}/>

			<EventActionTextInput {...props} inputProps={{
				placeholder: 'Information',
				maxLength: EMBEDDABLE_VALUE,
				required: true,
				sx: {flex: 1},
			}} formPath={`details.${index}.text`}/>

			<ActionIcon onClick={() => form.removeListItem('details', index)}>
				<FontAwesomeIcon icon={faTrashCan}/>
			</ActionIcon>
		</Group>
	));

	return <>
		{details}

		<Group spacing={'xs'} mt={'xs'}>
			<AddButton label={'Feld hinzufügen'}
					   onClick={() => form.insertListItem('details', {title: '', text: '', id: randomId()})}
					   disabled={details.length >= MAX_DETAILS}/>
			<CounterBadge currentValue={details.length} maxValue={MAX_DETAILS} yellowPhase/>
		</Group>

		{editMode &&
            <Group position={'right'}>
                <ScrollAffix show={form.isDirty('details')}>
                    <PulsatingButton onClick={() => {
						console.log(form.values.details);/*TODO mutate*/
					}} disabled={!form.isDirty('details')}>Felder speichern</PulsatingButton>
                </ScrollAffix>
            </Group>
		}
	</>;
}
