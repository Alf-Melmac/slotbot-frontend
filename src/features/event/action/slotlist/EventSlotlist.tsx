import {Checkbox, Group} from '@mantine/core';
import {UploadSlotlist} from './UploadSlotlist';
import {RenumberSlots} from './RenumberSlots';
import {SquadList} from './SquadList';
import {EventEditDto} from '../../eventTypes';
import {ButtonWithDisabledTooltip} from '../../../../components/Button/ButtonWithDisabledTooltip';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';
import {useChangeWatcher, useEventUpdate} from '../useEventUpdate';
import {EventActionPageTitle} from '../EventActionPageTitle';
import {T} from '../../../../components/T';
import {convertDtoToFormEvent} from '../../edit/utils';
import {JSX} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useEventPage} from '../../../../contexts/event/EventPageContext';
import {EventRequirements} from './EventRequirements';
import {FeatureFlag} from '../../../featureFlag/useGetFeatureFlags';
import {RequireFeatureFlag} from '../../../featureFlag/RequireFeatureFlag';
import {prepareForMutation} from './utils';
import {PartialPick} from '../../../../utils/typesHelper';

type EventSlotlistProps = PartialPick<EventEditDto, 'canUploadSlotlist'>;

export function EventSlotlist(props: Readonly<EventSlotlistProps>): JSX.Element {
	const {canUploadSlotlist = true} = props;
	const form = useFormContext();
	const {editMode} = useEventAction();

	function slotListDirty(): boolean {
		return form.isDirty('squadList') || form.isDirty('requirements');
	}

	function squadListInvalid(): boolean {
		return form.values.squadList.some((squad, i) =>
			!form.isValid(`squadList.${i}.name`)
			|| squad.slotList.some((_, j) =>
				!form.isValid(`squadList.${i}.slotList.${j}.name`) || !form.isValid(`squadList.${i}.slotList.${j}.number`)),
		);
	}

	const queryClient = useQueryClient();
	const eventId = useEventPage();
	// @ts-ignore Only during edit mode
	const squadList = prepareForMutation(form.values.squadList);
	const {mutate} = useEventUpdate({squadList, requirements: form.values.requirements.map(r => parseInt(r))},
		result => {
			queryClient.setQueryData(['eventForEdit', eventId], result);
			// @ts-ignore SquadList matches here
			form.setFieldValue('squadList', result.squadList);
			form.setFieldValue('requirements', result.requirements.map(r => `${r}`));
			// @ts-ignore
			form.resetDirty(convertDtoToFormEvent(result));
		});
	useChangeWatcher('reserveParticipating');
	const reserveParticipatingInputProps = form.getInputProps('reserveParticipating', {type: 'checkbox'});
	return <>
		<Group justify={'space-between'}>
			<EventActionPageTitle title={'slotlist.alt'}/>
			<Group gap={'xs'}>
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

		<RequireFeatureFlag feature={FeatureFlag.REQUIREMENTS}>
			<EventRequirements/>
		</RequireFeatureFlag>

		<SquadList/>
		{editMode &&
            <Group justify={'right'}>
                <ScrollAffix show={slotListDirty()}>
                    <PulsatingButton onClick={() => mutate()}
                                     disabled={!slotListDirty() || squadListInvalid()}>
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
