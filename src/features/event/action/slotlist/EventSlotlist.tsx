import {EventAction, EventActionWrapperProps} from '../EventActionPage';
import {Button, Checkbox, Group, Title, Tooltip} from '@mantine/core';
import {UploadSlotlist} from '../../wizard/thirdStep/UploadSlotlist';
import {RenumberSlots} from '../../wizard/thirdStep/RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';

type EventSlotlistProps<FormReturnType extends EventAction> =
	EventActionWrapperProps<FormReturnType>
	& Partial<Pick<EventEditDto, 'canUploadSlotlist'>>;

export function EventSlotlist<FormReturnType extends EventAction>(props: EventSlotlistProps<FormReturnType>): JSX.Element {
	const {form, editMode = false, canUploadSlotlist = true} = props;

	return <>
		<Group position={'apart'}>
			<Title order={2}>Teilnahmeplatzaufzählung</Title>
			<Group spacing={'xs'}>
				{canUploadSlotlist ?
					<UploadSlotlist form={form} editMode={editMode}/>
					:
					<Tooltip label={'Zum Hochladen einer Slotliste muss das Event leer sein'}>
						<Button variant={'default'} disabled>
							Slotliste hochladen
						</Button>
					</Tooltip>
				}

				<RenumberSlots form={form} editMode={editMode}/>
			</Group>
		</Group>

		<SquadList form={form} editMode={editMode}/>
		<Checkbox label={'Reserve nimmt teil'} mt={'md'}
				  indeterminate={form.values.reserveParticipating === undefined}
				  {...form.getInputProps('reserveParticipating', {type: 'checkbox'})}/>
	</>;
}
