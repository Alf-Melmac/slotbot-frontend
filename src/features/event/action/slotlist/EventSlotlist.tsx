import {Checkbox, Group} from '@mantine/core';
import {UploadSlotlist} from './UploadSlotlist';
import {RenumberSlots} from './RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {EventActionFormType, useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {useChangeWatcher, useEventSlotListUpdate} from '../useEventUpdate';
import {FilteredEventAction, filterFrontendIds} from '../../../../utils/formHelper';
import {EventActionPageTitle} from '../EventActionPageTitle';
import {T} from '../../../../components/T';
import {convertDtoToFormEvent} from '../../edit/utils';

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

	const squadList = filterFrontendIds<EventActionFormType['squadList'][number]>(form.values.squadList);
	squadList.forEach(squad => {
		prepareReservedFor(squad);
		squad.slotList.forEach(slot => {
			prepareReservedFor(slot);
			// Translate slot blocked to expected slot user for update endpoint
			if (editMode) {
				// @ts-ignore
				slot.user = slot.blocked ? {id: 11111} : undefined;
			}
		});
	});

	const {mutate} = useEventSlotListUpdate({squadList: squadList},
		result => {
			// @ts-ignore SquadList matches here
			form.setFieldValue('squadList', result.squadList);
			// @ts-ignore
			form.resetDirty(convertDtoToFormEvent(result));
		});
	useChangeWatcher('reserveParticipating');
	const reserveParticipatingInputProps = form.getInputProps('reserveParticipating', {type: 'checkbox'});
	return <>
		<Group position={'apart'}>
			<EventActionPageTitle title={'slotlist.alt'}/>
			<Group spacing={'xs'}>
				{canUploadSlotlist ?
					<UploadSlotlist/>
					:
					<ButtonWithDisabledTooltip variant={'default'} disabled tooltip={'slotlist.upload.disabled'}>
						<T k={'slotlist.upload'}/>
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
                        <T k={'slotlist.save'}/>
                    </PulsatingButton>
                </ScrollAffix>
            </Group>
		}

		<Checkbox label={<T k={'event.reserveParticipating'}/>} mt={'md'}
				  indeterminate={form.values.reserveParticipating === undefined}
				  {...reserveParticipatingInputProps}/>
	</>;
}

function prepareReservedFor(el: FilteredEventAction<EventActionFormType['squadList'][number]> | EventActionFormType['squadList'][number]['slotList'][number]) {
	if (!el.reservedFor) {
		delete el.reservedFor;
	} else {
		// @ts-ignore
		el.reservedFor = {id: el.reservedFor};
	}
}
