import {Checkbox, Group, Title} from '@mantine/core';
import {UploadSlotlist} from './UploadSlotlist';
import {RenumberSlots} from './RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useChangeWatcher, useEventSlotListUpdate} from '../useEventUpdate';
import {FilteredEventAction, filterFrontendIds} from '../../../../utils/formHelper';
import {EventAction} from '../EventActionPage';

type EventSlotlistProps = Partial<Pick<EventEditDto, 'canUploadSlotlist'>>;

export function EventSlotlist(props: EventSlotlistProps): JSX.Element {
	const {canUploadSlotlist = true} = props;
	const form = useFormContext();
	const editMode = useEditMode();

	const squadListInvalid = (): boolean => {
		return form.values.squadList.some((squad, i) =>
			!form.isValid(`squadList.${i}.name`)
			|| squad.slotList.some((_, j) =>
				!form.isValid(`squadList.${i}.slotList.${j}.name`) || !form.isValid(`squadList.${i}.slotList.${j}.number`)),
		);
	};

	const squadList = filterFrontendIds<EventAction['squadList'][number]>(form.values.squadList);
	squadList.forEach(squad => {
		prepareReservedFor(squad);
		squad.slotList.forEach(prepareReservedFor);
	});

	const {mutate} = useEventSlotListUpdate({squadList: squadList},
		// @ts-ignore SquadList matches here
		result => form.setFieldValue('squadList', result.squadList));
	useChangeWatcher('reserveParticipating');
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
                    <PulsatingButton onClick={() => mutate()}
                                     disabled={!form.isDirty('squadList') || squadListInvalid()}>
                        Slotliste speichern
                    </PulsatingButton>
                </ScrollAffix>
            </Group>
		}

		<Checkbox label={'Reserve nimmt teil'} mt={'md'}
				  indeterminate={form.values.reserveParticipating === undefined}
				  {...reserveParticipatingInputProps}/>
	</>;
}

function prepareReservedFor(el: FilteredEventAction<EventAction['squadList'][number]> | EventAction['squadList'][number]['slotList'][number]) {
	if (!el.reservedFor) {
		delete el.reservedFor;
	} else {
		// @ts-ignore
		el.reservedFor = {id: el.reservedFor};
	}
}
