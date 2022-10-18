import {Checkbox, Group, Title} from '@mantine/core';
import {UploadSlotlist} from './UploadSlotlist';
import {RenumberSlots} from './RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {changeHandler} from '../../../../utils/formHelper';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';

type EventSlotlistProps = Partial<Pick<EventEditDto, 'canUploadSlotlist'>>;

export function EventSlotlist(props: EventSlotlistProps): JSX.Element {
	const {canUploadSlotlist = true} = props;
	const form = useFormContext();
	const editMode = useEditMode();

	const reserveParticipatingInputProps = form.getInputProps('reserveParticipating', {type: 'checkbox'});
	return <>
		<Group position={'apart'}>
			<Title order={2}>Teilnahmeplatzaufzählung</Title>
			<Group spacing={'xs'}>
				{canUploadSlotlist ?
					<UploadSlotlist/>
					:
					<ButtonWithDisabledTooltip variant={'default'} disabled
											   tooltip={'Zum Hochladen einer Slotliste muss das Event leer sein'}>
						Slotliste hochladen
					</ButtonWithDisabledTooltip>
				}

				<RenumberSlots/>
			</Group>
		</Group>

		<SquadList/>
		{editMode &&
            <Group position={'right'}>
                <ScrollAffix show={form.isDirty('squadList')}>
                    <PulsatingButton onClick={() => {
						console.log(form.values.squadList);/*TODO mutate*/
					}} disabled={!form.isDirty('squadList')}>Slotliste speichern</PulsatingButton>
                </ScrollAffix>
            </Group>
		}

		<Checkbox label={'Reserve nimmt teil'} mt={'md'}
				  indeterminate={form.values.reserveParticipating === undefined}
				  {...reserveParticipatingInputProps}
			//TODO mutate
				  onChange={changeHandler(reserveParticipatingInputProps, editMode, () => console.log(form.values.reserveParticipating))}/>
	</>;
}
