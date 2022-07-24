import {EventWizardStepProps} from './EventWizard';
import {ActionIcon, Group, TextInput, Title} from '@mantine/core';
import {AddButton} from '../../../components/Form/AddButton';
import {CounterBadge} from '../../../components/Form/CounterBadge';
import {randomId} from '@mantine/hooks';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

export function EventWizardStepTwo(props: EventWizardStepProps): JSX.Element {
	const {form} = props;

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

	const maxDetails = 23;
	return (
		<>
			<Title order={2} mb={'xs'}>Details</Title>

			{details}

			<Group spacing={'xs'} mt={'xs'}>
				<AddButton label={'Feld hinzufügen'}
						   onClick={() => form.insertListItem('details', {title: '', text: '', id: randomId()})}
						   disabled={details.length >= maxDetails}/>
				<CounterBadge currentValue={details.length} maxValue={maxDetails} yellowPhase/>
			</Group>
		</>
	);
}
