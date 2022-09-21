import {EventAction, EventActionPageProps} from '../EventActionPage';
import {ActionIcon, Button, Group, TextInput} from '@mantine/core';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../components/Form/AddButton';
import {randomId} from '@mantine/hooks';
import {CounterBadge} from '../../../../components/Form/CounterBadge';

const MAX_DETAILS = 23;

export function EventDetails<FormReturnType extends EventAction>(props: EventActionPageProps<FormReturnType>): JSX.Element {
	const {form, editMode = false} = props;

	const details = form.values.details.map((item, index) => (
		<Group key={item.id} mt="xs">
			<TextInput
				placeholder={'Titel'}
				maxLength={EMBEDDABLE_TITLE}
				required
				{...form.getInputProps(`details.${index}.title`)}
			/>

			<TextInput
				placeholder={'Information'}
				maxLength={EMBEDDABLE_VALUE}
				required
				sx={{flex: 1}}
				{...form.getInputProps(`details.${index}.text`)}
			/>

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
                <Button onClick={() => {/*TODO mutate*/}}>Felder speichern</Button>
			</Group>
		}
	</>;
}
