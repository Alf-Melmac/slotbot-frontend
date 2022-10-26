import {ActionIcon, Group} from '@mantine/core';
import {EMBEDDABLE_TITLE, EMBEDDABLE_VALUE} from '../../../../utils/maxLength';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddButton} from '../../../../components/Button/AddButton';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {EventActionTextInput} from '../EventActionTextInput';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {EditModeProvider, useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useEventUpdate} from '../useEventUpdate';
import {EventAction} from '../EventActionPage';
import {filterFrontendIds} from '../../../../utils/formHelper';
import {randomId} from '@mantine/hooks';

const MAX_DETAILS = 23;

export function EventDetails(): JSX.Element {
	const form = useFormContext();

	const detailsInvalid = (): boolean => {
		return form.values.details.some((_, i) => {
			return !form.isValid(`details.${i}.title`) || !form.isValid(`details.${i}.text`);
		});
	};

	const editMode = useEditMode();
	const details = form.values.details.map((item, index) => {
		return (
			<Group key={item.id} mt={'xs'}>
				<EditModeProvider editMode={false}>
					<EventActionTextInput inputProps={{
						placeholder: 'Titel',
						maxLength: EMBEDDABLE_TITLE,
						required: true,
					}} formPath={`details.${index}.title`} overrideFormContextEditMode={editMode}/>

					<EventActionTextInput inputProps={{
						placeholder: 'Information',
						maxLength: EMBEDDABLE_VALUE,
						required: true,
						sx: {flex: 1},
					}} formPath={`details.${index}.text`} overrideFormContextEditMode={editMode}/>

					<ActionIcon onClick={() => form.removeListItem('details', index)}>
						<FontAwesomeIcon icon={faTrashCan}/>
					</ActionIcon>
				</EditModeProvider>
			</Group>
		);
	});

	const {mutate} = useEventUpdate('eventType',
		{details: filterFrontendIds<EventAction['details'][number]>(form.values.details)},
		// @ts-ignore Details matches here
		result => form.setFieldValue('details', result.details));
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
                    <PulsatingButton onClick={() => mutate()} disabled={!form.isDirty('details') || detailsInvalid()}>
                        Felder speichern
                    </PulsatingButton>
                </ScrollAffix>
            </Group>
		}
	</>;
}
