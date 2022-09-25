import {EventAction, EventActionWrapperProps} from '../EventActionPage';
import {Checkbox, Group, Title} from '@mantine/core';
import {UploadSlotlist} from '../../wizard/thirdStep/UploadSlotlist';
import {RenumberSlots} from '../../wizard/thirdStep/RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {changeHandler} from '../../../../utils/formHelper';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';

type EventSlotlistProps<FormReturnType extends EventAction> =
	EventActionWrapperProps<FormReturnType>
	& Partial<Pick<EventEditDto, 'canUploadSlotlist'>>;

export function EventSlotlist<FormReturnType extends EventAction>(props: EventSlotlistProps<FormReturnType>): JSX.Element {
	const {form, editMode = false, canUploadSlotlist = true} = props;

	const reserveParticipatingInputProps = form.getInputProps('reserveParticipating', {type: 'checkbox'});
	return <>
		<Group position={'apart'}>
			<Title order={2}>Teilnahmeplatzaufzählung</Title>
			<Group spacing={'xs'}>
				{canUploadSlotlist ?
					<UploadSlotlist form={form} editMode={editMode}/>
					:
					<ButtonWithDisabledTooltip variant={'default'} disabled
											   tooltip={'Zum Hochladen einer Slotliste muss das Event leer sein'}>
						Slotliste hochladen
					</ButtonWithDisabledTooltip>
				}

				<RenumberSlots form={form} editMode={editMode}/>
			</Group>
		</Group>

		<SquadList form={form} editMode={editMode}/>
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
